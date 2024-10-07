<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Back from "$lib/icons/back.svelte";
    import { onMount } from "svelte";
    import { auth } from "$lib/utils";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import { api, type User } from "$lib/api";
    import { goto } from "$app/navigation";
    import Loading from "$lib/icons/loading.svelte";
    import { slide } from "svelte/transition";

    let session: {user?: User; token?: string} = {}
    let loading = false;
    let masked = ""
    let error = ""
    let status = ""
    let confirm_loading = false;
    let send_loading = false;
    // let support = typeof(EventSource) !== undefined // default 
    let support = undefined // unsupported feature for now
    let nextAttempt = 0;

    function masking(str: string) {
      return str[0] + "*".repeat(str.length - 2) + str[1]
    }

    onMount(async () => {
        // session = (await auth()) || {}
        try {
          // Check if the email already confirmed locally
          if (session?.user?.confirmation) {
            await goto("/app/home")
          }

          console.log("Refreshing session")
  
          // Check if the email already confirmed remotely
          // If email has been confirmed redirect to home page
          // const result = await api.refreshSession();
          // if(result === null) await api.cancelRegistration();
          const result = {token: "707cfb4a-17b3-48c9-a8e6-fe1ed6ffa00f", confirmation: {next: Date.now() + 1000 * 10, attempts: 1}, user: {confirmation: false, email: "fathnakbar@gmail.com"}, message: "Register successful"}

          
          if (result?.user?.confirmation) {
            await goto("/app/home")
          }
          
          // If email is not confirmed
          if (result?.user?.email) {
              const [emailid, domain] = result.user.email.split("@")
              masked = masking(emailid) + "@" + domain
          }
  
          // TODO: improve confirmation check by using event source url
          // const eventSource = new EventSource('YOUR_SERVER_URL');
  
          // Set next attempt in response
          setInterval(() => {
            nextAttempt = Math.ceil(((result?.confirmation?.next) - Date.now()) / 1000)
          },1000)
  
        } catch (error: any) {
          if (error.status === 400) await api.logout()
        }
    })

    async function checkConfirmation(){
      error = ""
      status = ""
      confirm_loading = true;
      try {
        // Check if the email already confirmed remotely
        // If email has been confirmed redirect to home page
        const result = await api.refreshSession();
  
        if (result?.user?.confirmation) {
          await goto("/app/home")
        } else {
          error = "Email masih belum dikonfirmasi!"
        }
      } catch (error: any) {
        if (error.status === 400) await api.logout()
      }

      confirm_loading = false;
    }

    async function cancelRegistration() {
      error = ""
      await api.cancelRegistration();
    }

    async function resend_confirmation() {
      if (nextAttempt >= 0) {
        return
      }
      error = ""
      status = ""
      send_loading = true;

      try {
        
        const result = await api.requestEmailConfirmation();
        status = result.message

      } catch (err: any) {
        if (err.status === 400) await api.logout();
        error = err.message
      }

      send_loading = false;
    }
  </script>
  
  <div class="w-full flex flex-col gap-6">
      <div>
        <!-- <Button on:click={() => console.log("Back: ",history.back())} variant="outline" class="mb-4">
          <Back />
        </Button> -->
      </div>
    {#if !loading}
      <div class="flex flex-col gap-2 mb-6">
        <h2 class="text-lg font-bold">Konfirmasi Alamat Email Diperlukan</h2>
        <p class="text-base">Kami telah mengirimkan link ke alamat email {masked}. Cek kotak masuk atau kotak spam</p>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="p-4 bg-green-100 rounded text-green-500 {status ? '' : 'hidden'}" transition:slide>{status}</div>
        <div class="p-4 bg-red-100 rounded text-red-500 {error ? '' : 'hidden'}" transition:slide>{error}</div>
        {#if !support}
          <Button class="gap-2" variant="default" on:click={() => checkConfirmation()}>
            <Loading class="{confirm_loading ? '' : 'hidden'} w-4 h-4" />
            Cek konfirmasi</Button>
        {/if}
        <Button on:click={() => resend_confirmation()} class="gap-2" variant="outline" disabled={nextAttempt >= 0}>
          <Loading class="{send_loading ? '' : 'hidden'} w-4 h-4" />
          Kirim lagi {nextAttempt >= 0 ? `dalam ${(nextAttempt / 60) < 10 ? '0' : ''}${Math.floor(nextAttempt / 60)}:${nextAttempt < 10 ? '0' : ''}${nextAttempt}` : ''}</Button>
          <Button variant="link" on:click={() => cancelRegistration()}>
            Ubah alamat email?</Button>
      </div>
    {:else}
        <div class="flex flex-col gap-2 mb-6">
            <Skeleton class="w-full p-4"/>
            <Skeleton class="w-[70%] p-4"/>
        </div>
        <div class="w-full flex flex-col gap-2">
          <Skeleton class="w-full p-4"/>
          <Skeleton class="w-full p-4"/>
        </div>
    {/if}
  </div>
  
  