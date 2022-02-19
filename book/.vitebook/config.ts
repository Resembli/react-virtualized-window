import preact from "@preact/preset-vite"
import { clientPlugin, defineConfig } from "@vitebook/client/node"
import { preactMarkdownPlugin } from "@vitebook/markdown-preact/node"
import { preactPlugin } from "@vitebook/preact/node"
import { DefaultThemeConfig, defaultThemePlugin } from "@vitebook/theme-default/node"

export default defineConfig<DefaultThemeConfig>({
  include: ["src/**/*.md", "src/**/*.story.{jsx,tsx}"],
  plugins: [
    preactMarkdownPlugin(),
    preactPlugin({ appFile: "App.tsx" }),
    clientPlugin(),
    defaultThemePlugin(),
    preact({ include: /\.([j|t]sx?|md)$/ }),
  ],
  site: {
    title: "Book",
    description: "Resembli UI book",
    theme: {},
  },
})
