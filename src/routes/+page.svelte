<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { onMount } from "svelte";

  let margin = 0;

  const BASE_URL = import.meta.env.BASE_URL

const RESPONSES: { [index: string]: object } = {
  "/login": {
    token: "mocked-token",
    store: { token: "mocked-token" },
  },
  "/register": {
    message: "Waiting for confirmation",
    store: {
      token: "mocked-confirmation-token",
      user: {
        email: "newuser@example.com",
        confirmation: false,
      },
      confirmation: {
        next: Date.now() + 60000,
        attempts: 1,
      },
    },
  },
  "/request_confirmation": {
    message: "Waiting for confirmation",
    store: {
      token: "mocked-confirmation-token",
      user: {
        email: "user@example.com",
        confirmation: false,
      },
      confirmation: {
        next: Date.now() + 60000,
        attempts: 1,
      },
    },
  },
  "/confirm_registration": {
    email: "confirmeduser@example.com",
    name: "Confirmed User",
  },
  "/confirm_reset": {
    message: "Recovery confirmed successfully",
  },
};

  onMount(() => {
    margin = window.screen.height - window.innerHeight
  })

  onMount(() => {
  if (import.meta.env.MODE === 'development') {
      // Save the original fetch function
      const originalFetch = window.fetch;
    
      // Mock fetch function
      window.fetch = async (url, options) => {
        console.log(`Intercepted fetch call to: ${url}`);

        if (!url || typeof url !== 'string') {
          return originalFetch(url, options);
        }

        const parsedUrl = new URL(url)

        url = parsedUrl.pathname

        if (parsedUrl.hostname !== BASE_URL) {
          return originalFetch(url, options);
        }
    
        // Custom mock data depending on the URL
        if (Object.keys(RESPONSES).includes(url) && typeof RESPONSES[url] === 'object') {
          return Promise.resolve(new Response(JSON.stringify(RESPONSES[url]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }));
        }
    
        // Fall back to the original fetch for other requests
        return originalFetch(url, options);
      };
    }
  })
</script>

<div class="cover-page flex-grow flex flex-col">
  <div class="cover flex justify-center flex-grow items-center">
    <div class="image-container">
      <img class="wordmark" alt="Logo Expose" src="/wordmark.jpg" />
    </div>
  </div>
  <div class="button-group flex flex-col gap-2" style="padding-bottom: {margin}px;">
    <Button href="/login">Masuk</Button>
    <Button href="/signup" variant="outline">Buat akun baru</Button>
  </div>
</div>

<style>

  .image-container {
    width: 300px; /* Desired width */
    height: 70px; /* Desired height */
    overflow: hidden;
    position: relative;
  }

  img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
