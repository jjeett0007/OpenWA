import { KeyRateLimiter } from './mcp-rate-limit';

describe('KeyRateLimiter', () => {
  it('allows up to max per window, then throws 429', () => {
    let now = 1_000;
    const rl = new KeyRateLimiter(2, 1000, () => now);
    rl.check('k');
    rl.check('k');
    expect(() => rl.check('k')).toThrow(/rate limit/i);
    now = 2_500; // window passed
    expect(() => rl.check('k')).not.toThrow();
  });
  it('buckets per key', () => {
    const rl = new KeyRateLimiter(1, 1000, () => 0);
    rl.check('a');
    expect(() => rl.check('b')).not.toThrow();
  });
});
