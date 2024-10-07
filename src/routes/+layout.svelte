<script lang="ts">
  import { slide } from "svelte/transition";
  import "../app.css";
</script>

<svelte:head>
  <title>Hutanika</title>
  <meta name="description" content="Ordering system for Hutanika" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="app flex flex-col w-full p-8">
    <slot></slot>
</div>

<style>
  .app {
    min-height: 100vh;
  }
</style>
