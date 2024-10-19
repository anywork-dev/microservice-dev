import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hutanika Project",
  description: "Software documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Specs',
        items: [
          { text: 'User Activity', link: '/specs/user-activity' },
          { text: 'Functional Specifications', link: '/specs/functional-spec' },
          { text: 'System Architecture', link: '/specs/system-architecture' },
          { text: 'Class Diagram', link: '/specs/class-diagram' },
          { text: 'ERD', link: '/specs/erd' },
        ],
        link: "/intro"
      },
      {
        text: 'References',
        items: [
          { text: 'Flowchart', link: '/references/flowchart' },
          { text: 'Markdown', link: '/references/example' },
        ],
        link: "/intro"
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anywork-dev/hutanika' }
    ]
  }
})
