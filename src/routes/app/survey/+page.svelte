<script>
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import Exportir from "$lib/icons/exportir.svelte";
  import GoogleIcon from "$lib/icons/google.svelte";
  import Investor from "$lib/icons/investor.svelte";
  import { auth } from "$lib/utils";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let margin = 0;
  onMount(() => {
    margin = window.screen.height - window.innerHeight;
  });

  onMount(() => auth());
</script>

<svelte:head>
  <title>Login | Expose</title>
</svelte:head>

<div
  id="survey-page"
  class="box-border w-full flex-grow flex flex-col justify-between items-center p-8"
  in:slide
>
  <div></div>
</div>

<style>
</style>
