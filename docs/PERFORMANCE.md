# Performance Report

## Baseline (legacy monolithic component)

Anti-patterns present before refactoring:

- `getStats()` called ~8x per change-detection cycle, each running a 10,000-iteration loop
- `getProgressPercentage()` re-invokes `getStats()`
- Default change detection (no `OnPush`)
- `*ngFor` + `*ngIf` filtering, `trackByFn` returned the whole object
- Manual RxJS subscription, no response caching
- `bypassSecurityTrustHtml` + `[innerHTML]` on user input (XSS)
- `any` types and in-place array mutation

### Profiler capture (before)

Method: Chrome DevTools > Performance, record ~10s of mouse movement over the app,
plus Angular DevTools > Profiler.

| Metric | Before | After |
| --- | --- | --- |
| Change detection cycles (10s mouse movement) | _TODO_ | _TODO_ |
| Time in `getStats` / template evaluation | _TODO_ | _TODO_ |

Screenshots: `docs/profiling/before-*.png`, `docs/profiling/after-*.png`
