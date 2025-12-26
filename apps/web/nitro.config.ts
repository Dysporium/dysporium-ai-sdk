import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'static',
  /**
   * Use TanStack Start's default server entry so Nitro builds a fetch handler
   * instead of falling back to an HTML template.
   */
  entry: './src/server.ts',
})

