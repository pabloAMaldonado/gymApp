import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // This enables global vi, expect, etc.
    environment: 'jsdom',  // For React testing
  },
});