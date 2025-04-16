<script lang="ts">
  import { Input, Label, Button } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { link } from "svelte-spa-router";
  import sampleImage from "../assets/sampleImage.jpg";
  import maskImage from "../assets/maskImage.png";

  let showPassword = false;
  let email = "";
  let password = "";
  let errorMessage = "";
  let isLoading = false;

  const handleLogin = async (event: Event) => {
    event.preventDefault();
    errorMessage = "";

    isLoading = true;

    try {
      const response = await fetch("", {
        // API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed.");
      }

      alert("Login successful!");
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "Something went wrong.";
      }
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="min-h-screen flex bg-gray-100 relative">
  <!-- Background image -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({sampleImage});"
  >
    <!-- Add overlay -->
  </div>

  <!-- Mask overlay -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({maskImage});"
  ></div>

  <!-- Login Form Container -->
  <div class="flex w-full min-h-screen relative z-50">
    <div class="md:block w-3/5"></div>

    <div
      class="w-full md:w-2/5 flex flex-col items-center justify-center bg-red-900 text-white font-poppins p-4 relative"
    >
      <header class="text-4xl font-bold mb-4">PUP-Bark</header>

      <form
        class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
        on:submit={handleLogin}
      >
        <h2 class="text-2xl font-bold text-gray-800 text-center">Login</h2>

        <div>
          <Label for="email" class="mb-2 block text-gray-700"
            >Email address</Label
          >
          <Input
            type="email"
            id="email"
            bind:value={email}
            placeholder="Enter your email"
            required
            class="border-gray-300 focus:ring-primary-500"
          />
        </div>

        <div class="relative">
          <Label for="password" class="mb-2 block text-gray-700">Password</Label
          >
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            bind:value={password}
            placeholder="Enter your password"
            required
            class="pr-12 border-gray-300 focus:ring-primary-500"
          />
          <button
            type="button"
            on:click={() => (showPassword = !showPassword)}
            class="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {#if showPassword}
              <EyeSlashOutline class="w-5 h-5" />
            {:else}
              <EyeOutline class="w-5 h-5" />
            {/if}
          </button>
        </div>

        {#if errorMessage}
          <p class="text-red-600 text-sm">{errorMessage}</p>
        {/if}

        <Button
          type="submit"
          class="w-full bg-red-900 text-white hover:bg-red-950"
          disabled={isLoading}
        >
          {#if isLoading}
            Logging in...
          {:else}
            Log In
          {/if}
        </Button>

        <p class="text-sm text-center text-gray-600">
          Don’t have an account?
          <a
            href="/register"
            use:link
            class="text-primary-900 hover:underline ml-1"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  </div>
</div>
