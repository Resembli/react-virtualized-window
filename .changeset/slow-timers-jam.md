---
"@resembli/react-virtualized-window": patch
---

Made some performance improvements. Memoed useScrollAdjustedDim, and a animation frame debounce.

Our translation `div` now using positioning rather than mix translations and positions. Overall the performance
is actually a little better.
