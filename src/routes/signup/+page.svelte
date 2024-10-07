<script lang="ts">
  import { goto } from "$app/navigation";
  import { api } from "$lib/api";
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import Exportir from "$lib/icons/exportir.svelte";
  import GoogleIcon from "$lib/icons/google.svelte";
  import Investor from "$lib/icons/investor.svelte";
  import Loading from "$lib/icons/loading.svelte";
  import { auth, calculate_margin_searchbar, copyIfExists } from "$lib/utils";
  import { onMount } from "svelte";
  import { slide, fade } from "svelte/transition";

  let margin = 0;
  let role = 0;
  let roles = ["COMPANY", "INVESTOR"];
  let loading: boolean = false;
  let error: {
    message: string;
    email: string;
    password: string;
    confirmation: string;
  } = {
    message: "",
    email: "",
    password: "",
    confirmation: "",
  };
  onMount(async () => await auth())
  onMount(() => {
    margin = calculate_margin_searchbar();
  });

  function setRole(index: number) {
    role = index;
  }

  function clearErros(key: "message" | "email" | "password" | "confirmation") {
    error[key] = "";
  }

  type FormFields = {
  email: string;
  password: string;
  confirmation: string;
  role: string
}

  // Validate email and password
  function validate({
    email,
    password,
    confirmation,
  }: {
    email: string;
    password: string;
    confirmation: string;
  }): void {
    const errors: { email?: string; password?: string; confirmation?: string } =
      {};

    // Validate email
    if (!email) {
      errors.email = "Email tidak boleh kosong";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Email tidak valid";
      }
    }

    // Validate password
    if (!password) {
      errors.password = "Password tidak boleh kosong.";
    } else if (password.length < 8) {
      errors.password = "Password harus berisi 8 karakter atau lebih";
    } else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\-!@#$%^&*]{8,}/g)) {
      errors.password = "Password harus mengandung setidaknya satu huruf kecil, satu huruf besar, dan satu angka";
    }
    

    // Validate password
    if (!confirmation) {
      errors.confirmation = "Confirmation password required";
    } else if (password != confirmation) {
      errors.confirmation = "Password yang anda masukan ulang salah";
    }

    // If there are validation errors, throw them
    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  }

  async function submit(event: Event) {
    try {
      loading = true;
      clearErros("message")
      let a = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(a.keys().map((i) => [i, a.get(i)])) as FormFields;

      validate(data)

      const result = await api.register(data as FormFields & {confirmation: undefined})

      if (result.ok) await goto("/signup/confirm_required")

    } catch (err: any) {
      error = copyIfExists(error, err) as any
    }
    loading = false;
  }
</script>

<svelte:head>
  <title>Login | Expose</title>
</svelte:head>

<div
  id="signup-page"
  class="w-full flex-grow flex flex-col justify-between items-center"
>
  <div class="img-container w-24 pt-16" in:slide>
    <img
      src="/logo.png"
      alt="Strong Expose Logo"
      class="w-full"
      height="auto"
    />
  </div>
  <div class="input-group w-full flex flex-col gap-4" in:fade>
    <span class="text-slate-600 font-medium">Daftar sebagai</span>
    <div class="flex gap-4">
      <button
        class="p-4 px-6 rounded flex flex-col gap-2 {role == 0
          ? 'bg-sky-100 ring ring-blue-300'
          : 'bg-neutral-100'}"
        on:click={() => setRole(0)}><Exportir class="w-5 h-5" />Exportir</button
      >
      <button
        class="p-4 px-6 rounded bg-neutral-100 flex flex-col gap-2 {role == 1
          ? 'bg-sky-100 ring ring-blue-300'
          : 'bg-neutral-100'}"
        on:click={() => setRole(1)}><Investor class="w-5 h-5" />Investor</button
      >
    </div>
    <form
      on:submit|preventDefault={submit}
      action="/form"
      method="get"
      target="_blank"
      class="w-full flex flex-col gap-4"
      in:fade
    >
      <div class="p-4 rouded bg-red-100 text-red-500 {!error.message ? 'hidden' : ''}">{error.message}</div>
      <input type="text" name="role" class="hidden" bind:value={roles[role]} />
      <label for="email" class="px-2 text-red-500 {error.email ? '' : 'hidden'}">{error.email}</label>
      <Input
        on:input={() => clearErros("email")}
        name="email"
        autocomplete="true"
        type="email"
        class="box-border"
        placeholder="Alamat email cth: example@anywork.dev"
        required
      ></Input>
      <label for="password" class="px-2 text-red-500 {error.password ? '' : 'hidden'}">{error.password}</label>
      <Input
        on:input={() => clearErros("password")}
        id="password"
        name="password"
        type="password"
        class="box-border"
        placeholder="Password"
        required
      ></Input>
      <label for="confirmation" class="px-2 text-red-500 {error.confirmation ? '' : 'hidden'}">{error.confirmation}</label>
      <Input
        id="confirmation"
        on:input={() => clearErros("confirmation")}
        name="confirmation"
        type="password"
        class="box-border"
        placeholder="Konfrimasi password"
        required
      ></Input>
      <Button type="submit" class="w-full flex justify-center gap-2">
        <Loading class="{loading ? '' : 'hidden'} w-4 h-4" />
        Daftar akun</Button
      >
    </form>
    <Button class="w-full flex justify-center gap-4" variant="outline"
      ><GoogleIcon />Daftar dengan Google</Button
    >
  </div>
  <div class="w-full" style="padding-bottom: {margin}px;">
    <Button href="/login" variant="link" class="w-full">Sudah ada akun</Button>
  </div>
</div>

<style>
</style>
