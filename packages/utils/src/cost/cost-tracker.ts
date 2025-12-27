// ===== Cost Tracking =====

import type { Usage } from '@dysporium-sdk/provider';
import { calculateCost } from './cost-calculator';
import type { CostBreakdown } from './cost-calculator';

// ===== Types =====

export interface CostTrackerEntry {
  timestamp: number;
  provider: string;
  model: string;
  usage: Usage;
  cost: CostBreakdown;
  requestId?: string;
}

export interface CostSummary {
  totalCost: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalRequests: number;
  byProvider: Record<string, { cost: number; requests: number }>;
  byModel: Record<string, { cost: number; requests: number }>;
  period: { start: number; end: number };
}

// ===== Cost Tracker Class =====

export class CostTracker {
  private entries: CostTrackerEntry[] = [];
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  track(
    usage: Usage,
    model: string,
    provider: string,
    requestId?: string
  ): CostBreakdown {
    const cost = calculateCost(usage, model, provider);

    this.entries.push({
      timestamp: Date.now(),
      provider,
      model,
      usage,
      cost,
      requestId,
    });

    return cost;
  }

  getSummary(since?: number): CostSummary {
    const startTime = since ?? this.startTime;
    const relevantEntries = this.entries.filter(e => e.timestamp >= startTime);

    const byProvider: Record<string, { cost: number; requests: number }> = {};
    const byModel: Record<string, { cost: number; requests: number }> = {};

    let totalCost = 0;
    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    for (const entry of relevantEntries) {
      totalCost += entry.cost.totalCost;
      totalInputTokens += entry.usage.inputTokens;
      totalOutputTokens += entry.usage.outputTokens;

      // By provider
      let providerStats = byProvider[entry.provider];
      if (!providerStats) {
        providerStats = { cost: 0, requests: 0 };
        byProvider[entry.provider] = providerStats;
      }
      providerStats.cost += entry.cost.totalCost;
      providerStats.requests++;

      // By model
      const modelKey = `${entry.provider}/${entry.model}`;
      let modelStats = byModel[modelKey];
      if (!modelStats) {
        modelStats = { cost: 0, requests: 0 };
        byModel[modelKey] = modelStats;
      }
      modelStats.cost += entry.cost.totalCost;
      modelStats.requests++;
    }

    return {
      totalCost,
      totalInputTokens,
      totalOutputTokens,
      totalRequests: relevantEntries.length,
      byProvider,
      byModel,
      period: {
        start: startTime,
        end: Date.now(),
      },
    };
  }

  getEntries(since?: number): CostTrackerEntry[] {
    if (since) {
      return this.entries.filter(e => e.timestamp >= since);
    }
    return [...this.entries];
  }

  reset(): void {
    this.entries = [];
    this.startTime = Date.now();
  }

  getCostForPeriod(minutes: number): number {
    const since = Date.now() - minutes * 60 * 1000;
    return this.getSummary(since).totalCost;
  }

  isBudgetExceeded(budget: number, since?: number): boolean {
    return this.getSummary(since).totalCost > budget;
  }
}

