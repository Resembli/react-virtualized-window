---
"@resembli/react-virtualized-window": minor
---

Removed rtl support

RTL support with `sticky` positioning is not widely supported, in particular it breaks in IOS touch devices.
The decision was made to drop RTL support in the virtualized window due to the complexity supporting brings vs
the actual use cases. If we need to support virtualized rtl views, this can be done through a separate purpose
built package.
