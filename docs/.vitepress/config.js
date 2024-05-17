import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Anywork Collab",
  description: "Software Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      { text: 'On Boarding', link: '/onboarding' },
      {
        text: 'Specs',
        items: [
          { text: 'Routes', link: '/specs/routes' },
          { text: 'Functions', link: '/specs/functions' },
        ]
      },
      {
        text: 'Services',
        items: [
          { text: 'Authentication', link: '/services/auth.service' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anywork-dev' }
    ]
  }
})
