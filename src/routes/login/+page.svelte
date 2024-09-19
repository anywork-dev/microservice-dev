<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import GoogleIcon from "$lib/icons/google.svelte";
  import { onMount } from "svelte";
  import Loading from "$lib/icons/loading.svelte";
  import { slide } from "svelte/transition";
  import { api } from "$lib/api";
  import { copyIfExists } from "$lib/utils";
  import { goto } from "$app/navigation";

  let margin = 0;
  onMount(() => {
    margin = window.screen.height - window.innerHeight;
  });

  let loading = false;
  let error: { message: string; email: string; password: string } = {
    message: "",
    email: "",
    password: "",
  };

  function clearErros(key: "message" | "email" | "password") {
	error[key] = ""
  }

  // Validate email and password
  function validate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): void {
    const errors: { email?: string; password?: string } = {};

    // Validate email
    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
      }
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    // If there are validation errors, throw them
    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  }

  async function submit(event: Event) {
	error = {message: "", password: "", email: ""}
    try {
      loading = true;
      let a = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(a.keys().map((i) => [i, a.get(i)])) as {
        email: string;
        password: string;
      };

      validate(data);

      const result = await api.login(data);
	  
    } catch (e: any) {
      error = copyIfExists(error, e) as any
    }

    loading = false;
  }
</script>

<svelte:head>
  <title>Login | Expose</title>
</svelte:head>

<div
  id="login-page"
  class="w-full flex-grow flex flex-col justify-between items-center p-8"
  in:slide
>
  <div class="img-container w-24 h-24 pt-16">
    <img
      src="/logo.png"
      alt="Strong Expose Logo"
      class="w-full"
      height="auto"
    />
  </div>
  <div class="input-group w-full flex flex-col gap-4">
    <div
      class="mb-4 p-2 rounded-md text-base bg-red-100 text-red-500 w-full {error
        .message
        ? ''
        : 'hidden'}"
    >
      {error.message}
    </div>
    <form on:submit|preventDefault={submit} class="w-full flex flex-col gap-4">
		<label for="email" class="text-red-500 {error.email ? '' : 'hidden'}">{error.email}</label>
      <Input on:input={() => clearErros("email")} id="email" name="email" class="{error.email ? 'text-red-500' : ''}" type="email" autocomplete="true" placeholder="Email"
      ></Input>
	  <label for="password" class="text-red-500 {error.password ? '' : 'hidden'}">{error.password}</label>
      <Input on:input={() => clearErros("password")} id="password" class="{error.password? 'text-red-500' : ''}" name="password" type="password" placeholder="Password"></Input>
      <Button variant="link" href="/recovery">Lupa passwod?</Button>
      <Button class="w-full flex justify-center gap-2" type="submit">
        <Loading class="{loading ? '' : 'hidden'} w-4 h-4" />
        Masuk</Button
      >
    </form>
    <Button class="w-full flex justify-center gap-4" variant="outline"
      ><GoogleIcon />Masuk dengan Google</Button
    >
  </div>
  <div class="button-group w-full" style="padding-bottom: {margin}px;">
    <Button variant="link" class="w-full" href="/signup">Buat akun baru</Button>
  </div>
</div>

<style>
</style>
