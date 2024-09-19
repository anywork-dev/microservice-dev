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
        <h2 class="text-2xl font-semibold">Pemulihan kata sandi</h2>
        <p class="text-base">Masukan alamat email akun anda untuk mendapatkan link pemulihan kata sandi</p>
    </div>
    <form on:submit|preventDefault={sendRecovery} class="w-full flex flex-col gap-4">
        <Input name="email" placeholder="Alamat email" type="email" bind:value={email}/>
        <Button type="submit">Kirim Link</Button>
    </form>
</div>
