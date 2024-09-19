<script lang="ts">
  import "../app.css";

  import { goto } from "$app/navigation";
  import { api } from "$lib/api";

  export const ssr = false;

</script>
<svelte:head>
	<title>Expose</title>
	<meta name="description" content="Exporteer Operating System Enterprise" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="app">
  <slot></slot>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
