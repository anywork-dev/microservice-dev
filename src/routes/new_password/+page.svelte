<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Back from "$lib/icons/back.svelte";
  
      let email = '';
  
      const sendRecovery = () => {
  
      }
  </script>
  
  <div class="w-full p-8 flex flex-col gap-6">
      <div><Button on:click={() => history.back()} variant="outline" class="mb-4"><Back /></Button></div>
      <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold">Buat kata sandi baru</h2>
      </div>
      <form on:submit|preventDefault={sendRecovery} class="w-full flex flex-col gap-4">
          <Input name="password" placeholder="Password baru" type="password" bind:value={email}/>
          <Input name="confirm" placeholder="Ketik ulang password" type="password" bind:value={email}/>
          <Button type="submit">Lanjut</Button>
      </form>
  </div>
  