# @resembli/react-virtualized-window

## 1.0.0

### Major Changes

- [#209](https://github.com/Resembli/react-virtualized-window/pull/209) [`3fdfcf3`](https://github.com/Resembli/react-virtualized-window/commit/3fdfcf313b238f2c2d49161c8664b463b2240bea) Thanks [@leebeydoun](https://github.com/leebeydoun)! - First stable release

## 0.8.6

### Patch Changes

- [`71a7aba`](https://github.com/Resembli/react-virtualized-window/commit/71a7abaa45aab6f8c9938619699c57a135779a41) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Update package.json for the virtual window package.

## 0.8.5

### Patch Changes

- [#202](https://github.com/Resembli/ui/pull/202) [`ce9800b`](https://github.com/Resembli/ui/commit/ce9800b1f8d605d512abe0d13f61501bb3990c18) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Removed other supporting packages.

## 0.8.4

### Patch Changes

- [#189](https://github.com/Resembli/ui/pull/189) [`bdd8af2`](https://github.com/Resembli/ui/commit/bdd8af251be81ea545a6f1ea14b70e346e1a10ef) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Transpile target is now es2022.

## 0.8.3

### Patch Changes

- [#174](https://github.com/Resembli/ui/pull/174) [`270f05c`](https://github.com/Resembli/ui/commit/270f05c00049e6facab5e53f9ca9f7be32531b0a) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Add conditional checks so we don't render pinned column and row divs when they are empty.

## 0.8.2

### Patch Changes

- [#171](https://github.com/Resembli/ui/pull/171) [`18efba3`](https://github.com/Resembli/ui/commit/18efba344d61ed4372426d92da2a7d5456a2e3e1) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Added support for pinned rows top and bottom

* [#173](https://github.com/Resembli/ui/pull/173) [`4bd960f`](https://github.com/Resembli/ui/commit/4bd960fa23236d31844e7cc621c5112ee8fdcd61) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Added full support for pinned left and pinned right columns and pinned top and bottom rows

## 0.8.1

### Patch Changes

- [#168](https://github.com/Resembli/ui/pull/168) [`ad418a3`](https://github.com/Resembli/ui/commit/ad418a32ac6c662b3f4d19ec618c708edc7a4575) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Update package.json to have sideEffects false and removed getScrollbar memo.

## 0.8.0

### Minor Changes

- [#166](https://github.com/Resembli/ui/pull/166) [`42635d0`](https://github.com/Resembli/ui/commit/42635d036f5a8f9f233b0c63ab8012987ebf86f1) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Make react-virtualized-window an esm module

## 0.7.1

### Patch Changes

- [#163](https://github.com/Resembli/ui/pull/163) [`635fea5`](https://github.com/Resembli/ui/commit/635fea5deb540fa37c42dde32da103fbd6aa1e51) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Fixed gap margins when using pinned columns left or right.

* [#165](https://github.com/Resembli/ui/pull/165) [`4e014f6`](https://github.com/Resembli/ui/commit/4e014f6ce9ac15b64884e6161719f1ec2b917658) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Remove support for the gap prop. Can be achieved by applying padding.

## 0.7.0

### Minor Changes

- [#161](https://github.com/Resembli/ui/pull/161) [`12bd4fd`](https://github.com/Resembli/ui/commit/12bd4fda167e3f2117f0cb0644ddeda4b2a4646b) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Removed rtl support

  RTL support with `sticky` positioning is not widely supported, in particular it breaks in IOS touch devices.
  The decision was made to drop RTL support in the virtualized window due to the complexity supporting brings vs
  the actual use cases. If we need to support virtualized rtl views, this can be done through a separate purpose
  built package.

## 0.6.0

### Minor Changes

- [#158](https://github.com/Resembli/ui/pull/158) [`4584d06`](https://github.com/Resembli/ui/commit/4584d06308e803c82424f8ed0138aeefcfceb8da) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Added support for pinned left columns

### Patch Changes

- [#152](https://github.com/Resembli/ui/pull/152) [`6e61a00`](https://github.com/Resembli/ui/commit/6e61a00d5e68cb59bc740240b1d89b7866af5323) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Add smart sticky disable and overscan when device with is smaller than 800px

  Before this change the sticky `div` that prevents content from going out of view was
  enabled by default. In order for the scroll to appear smooth the device needs to be
  relatively powerful, but mobile phones are on the weaker end and struggle to maintain
  a consistent 60fps. By disabling the stick `div` we can ensure that the animations
  remain smooth.

  **This is a change only to the default behavior, users can override these**

* [#160](https://github.com/Resembli/ui/pull/160) [`5978ba8`](https://github.com/Resembli/ui/commit/5978ba84614c0e7a7975407463e0645eaf679f69) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Added support for pinned right columns and RTL warnings for IOS devices

- [#145](https://github.com/Resembli/ui/pull/145) [`33c325a`](https://github.com/Resembli/ui/commit/33c325a6e3790b520a64544fa1085c9035e571ce) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Made some performance improvements. Memoed useScrollAdjustedDim, and a animation frame debounce.

  Our translation `div` now using positioning rather than mix translations and positions. Overall the performance
  is actually a little better.

* [#155](https://github.com/Resembli/ui/pull/155) [`75b9a9b`](https://github.com/Resembli/ui/commit/75b9a9b7863f29df4264e3b48f0cb0891759d2a5) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Change gap margins to no longer be applied to the first and last element.

## 0.5.0

### Minor Changes

- [#135](https://github.com/Resembli/ui/pull/135) [`c84c807`](https://github.com/Resembli/ui/commit/c84c80768de9da077a371d553a2e15156fa84006) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Added getKey property to allow custom keys be set on individual window items. Default is the cell index.

* [#135](https://github.com/Resembli/ui/pull/135) [`c84c807`](https://github.com/Resembli/ui/commit/c84c80768de9da077a371d553a2e15156fa84006) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Removed the separate ListHorizontalComponent in favor of a List component with a layout property

### Patch Changes

- [#139](https://github.com/Resembli/ui/pull/139) [`e878741`](https://github.com/Resembli/ui/commit/e878741bd3c2e47bc68dad4031e7853685f2eb05) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Fixed type error exception when an empty array is passed as data to the window components."

## 0.4.0

### Minor Changes

- [#132](https://github.com/Resembli/ui/pull/132) [`b0ec4e6`](https://github.com/Resembli/ui/commit/b0ec4e69c5f328223fe4d7f120dcb7a211c5a528) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Switched to using a render prop instead of a render function.

  Using a render prop allows items the grid will render to use hooks.

## 0.3.0

### Minor Changes

- [#129](https://github.com/Resembli/ui/pull/129) [`b2ebb3c`](https://github.com/Resembli/ui/commit/b2ebb3cf1c6b297fc628157fabb1c16107a29929) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Updated build process to use browserlists.

## 0.2.0

### Minor Changes

- [#126](https://github.com/Resembli/ui/pull/126) [`d033303`](https://github.com/Resembli/ui/commit/d0333031800f24050dee83a9c1eefb0651e037c8) Thanks [@leebeydoun](https://github.com/leebeydoun)! - Switched to using the classic React runtime

## 0.1.0

### Minor Changes

- fa05000: [WINDOW]: add new type exports for ItemGap and NumberOrPercent.
