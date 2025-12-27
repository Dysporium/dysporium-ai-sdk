# @dysporium-sdk/utils

## 3.0.0

### Major Changes

- add new utility functionalities

### Minor Changes

- Add new `@dysporium-sdk/utils` package with request deduplication and token counting utilities.

  **New Features:**
  - **Request Deduplication**: `DeduplicationManager` class to prevent duplicate API calls for identical requests
  - **Token Counting**: `countTokens()`, `estimateTokens()`, and provider-specific estimators (OpenAI, Anthropic, Qwen)
  - Re-exports existing utilities: cost tracking, response caching, and hooks/middleware

### Patch Changes

- Updated dependencies
  - @dysporium-sdk/provider@3.0.0
