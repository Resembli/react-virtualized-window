---
title: Overview of Resembli UI
---

**Resembli UI** is the home of the open source libraries developed and maintained by the Resembli organization. Below is a road map of the current projects under
development as part of the Resembli UI project. Each project also has a corresponding status:

- **Production Ready**: this project has reached v1.0.0 or greater, is well maintained and ready for production use.
- **Beta**: this project is nearing the production ready status but may have some bugs. Ready for production use by early adopters.
- **In progress**: this project is currently under development and should not be used in production. It may or may not be published on npm.
- **Early design phase**: project requirements and scope are still being considered. Code may not even be present in the repo.

:::caution

Once a project is production ready, we follow [semver versioning](https://semver.org/). Projects that have a **Beta** status may be published
to npm but breaking changes will still be published as patch revisions.

Any package with a version `1.0.0` or greater can be considered production ready.
:::

### High level road map

| Module Name                                                                | Description                                                                                               | Status             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------ |
| [@resembli/react-virtualized-window](./react-virtualized-window/index.mdx) | React virtualization library for rendering massive lists or tables                                        | Beta               |
| @resembli/ui                                                               | A set of React components to quickly build nice looking UIs that conform to a user provided design system | Early design phase |
| @resembli/utils                                                            | A set of front-end utilities functions not tied to any specific framework or platform                     | In progress        |
| @resembli/hooks                                                            | Useful React hooks for different use cases                                                                | Early design phase |
