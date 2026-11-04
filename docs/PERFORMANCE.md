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

## What changed

| Problem | Fix |
| --- | --- |
| Template method calls (`getStats()` x8 + busy loop) ran every CD cycle | `computed()` signals in `TodoService`; evaluated only when `todos` changes |
| Default change detection | `ChangeDetectionStrategy.OnPush` on every component |
| `*ngFor` + `*ngIf`, `trackByFn` returned the object | `@for (... track todo.id)` over pre-filtered `activeTodos` / `completedTodos` computeds |
| Mutable state (`push`, in-place edits) | `signal()` with immutable `update()` (spread / map / filter) |
| Manual subscribe / unsubscribe | `async` pipe; no lifecycle hooks |
| Uncached simulated API | `defer` + `shareReplay({ bufferSize: 1 })`; verified by `welcome.service.spec.ts` |
| XSS: `bypassSecurityTrustHtml` + `[innerHTML]` on user input | Task text rendered with interpolation (escaped); header sanitized via `DomSanitizer.sanitize(SecurityContext.HTML, ...)`; bypass removed |
| Monolithic component, `any` types | `TodoService`, `WelcomeService`, typed `Todo` model, and `TodoInput` / `TodoStats` / `TodoList` / `TodoItem` components |

### XSS note

The vulnerability was `bypassSecurityTrustHtml`, which switches Angular's sanitizer off, combined with
`[innerHTML]` on untrusted strings. The old `<script>` string check in `addTask` was not a defence
(`<img onerror=...>` bypasses it). The fix is to never bypass the sanitizer and to render user text via
interpolation.

## Remaining manual step

Capture the "after" profile (same 10s mouse-movement recording) and fill in the table above.
