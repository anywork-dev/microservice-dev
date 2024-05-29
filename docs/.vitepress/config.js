import { defineConfig } from 'vitepress'

// Dashboard Service: Handle user authentication, authorization, and overall user interface.
// Client Service: Manage the client database and related operations.
// Order Service: Handle all order-related operations.
// Process Monitoring Service: Track and report the status of various processes.
// Akta Service: Manage records of notarial acts.
// Sisminbakum Service: Integrate with the legal administration system.
// Billing Service: Manage invoicing and payments.
// e-Filing Service: Handle electronic filing of documents.
// Financial Service: Oversee financial transactions and records.
// Tax Service: Manage tax-related information and filings.

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
        text: 'Services',
        items: [
          { text: 'Auth', link: '/services/auth.service' },
          { text: 'Client', link: '/services/auth.service' },
          { text: 'Order', link: '/services/auth.service' },
          { text: 'Process', link: '/services/auth.service' },
          { text: 'Akta', link: '/services/auth.service' },
          { text: 'Sisminbakum', link: '/services/auth.service' },
          { text: 'Billing', link: '/services/auth.service' },
          { text: 'eFilling', link: '/services/auth.service' },
          { text: 'Financial', link: '/services/auth.service' },
          { text: 'Tax', link: '/services/auth.service' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anywork-dev' }
    ]
  }
})