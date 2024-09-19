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

    onMount(() => auth())
    
  </script>
  
  <svelte:head>
    <title>Login | Expose</title>
  </svelte:head>
  
  <div
    id="signup-page"
    class="box-border w-full flex-grow flex flex-col justify-between items-center p-8"
    in:slide
  >
    <div class="img-container w-24 pt-16">
      <img
        src="/logo.png"
        alt="Strong Expose Logo"
        class="w-full"
        height="auto"
      />
    </div>
    <div class="hidden input-group w-full flex flex-col gap-4">
      <span class="text-slate-600 font-medium">Daftar sebagai</span>
      <div class="flex gap-4">
      <div class="p-4 rounded bg-neutral-100 flex flex-col gap-2"><Exportir class="w-5 h-5" />Exportir</div>
      <div class="p-4 rounded bg-neutral-100 flex flex-col gap-2"><Investor class="w-5 h-5"/>Investor</div>
      </div>
      <form action="" class="w-full flex flex-col gap-4">
        <Input class="box-border" placeholder="Alamat email cth: example@anywork.dev"></Input>
        <Input class="box-border" placeholder="Password"></Input>
        <Input class="box-border" placeholder="Konfrimasi password"></Input>
        <Button type="submit" class="w-full">Daftar akun</Button>
      </form>
      <Button class="w-full flex justify-center gap-4" variant="outline"
        ><GoogleIcon />Daftar dengan Google</Button
      >
    </div>
    <div class="hidden w-full" style="padding-bottom: {margin}px;">
      <Button href="/login" variant="link" class="w-full"
        >Sudah ada akun</Button
      >
    </div>
  </div>
  
  <style>
  </style>
  