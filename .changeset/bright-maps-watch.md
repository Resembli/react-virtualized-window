---
"@resembli/react-virtualized-window": patch
---

Add smart sticky disable and overscan when device with is smaller than 800px

Before this change the sticky `div` that prevents content from going out of view was
enabled by default. In order for the scroll to appear smooth the device needs to be
relatively powerful, but mobile phones are on the weaker end and struggle to maintain
a consistent 60fps. By disabling the stick `div` we can ensure that the animations
remain smooth.

**This is a change only to the default behavior, users can override these**
