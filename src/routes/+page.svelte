<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { onMount } from "svelte";
  let margin = 0;

  const BASE_URL = import.meta.env.BASE_URL



  onMount(() => {
    margin = window.screen.height - window.innerHeight
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
