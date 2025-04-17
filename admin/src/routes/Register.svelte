<script lang="ts">
  import { Input, Label, Button, Checkbox, A } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import sampleImage from "../assets/sampleImage.jpg";
  import maskImage from "../assets/maskImage.png";
  import { registerAdmin } from "../lib/api/admin";

  let showPassword = false;
  let showConfirm = false;

  let name = "";
  let email = "";
  let number = "";
  let password = "";
  let confirmPassword = "";
  let agreed = false;

  let errorMessage = "";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    errorMessage = "";

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      return;
    }

    if (!agreed) {
      errorMessage = "You must agree to the terms.";
      return;
    }

    try {
      await registerAdmin({ name, email, number, password });
      alert("Registered");
      name = email = number = password = confirmPassword = "";
      agreed = false;
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "Something went wrong.";
      }
    }
  };
</script>

<div class="min-h-screen flex bg-gray-100 relative">
  <!-- Background image -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="
      background-image: url({sampleImage});
    "
  >
    <!-- Add overlay -->
  </div>

  <!-- Mask Image -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="
    background-image: url({maskImage});
  "
  ></div>

  <!-- Registration Form Container -->
  <div class="flex w-full min-h-screen relative z-50">
    <div class="md:block w-3/5"></div>

    <div
      class="w-full md:w-2/5 flex flex-col items-center justify-center bg-red-900 text-white font-poppins p-4 relative"
    >
      <header class="text-4xl font-bold mb-4">PUP-Bark</header>
      <!-- Registration Form -->
      <form
        class="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4"
        on:submit={handleSubmit}
      >
        <!-- Form content remains the same -->
        <div class="text-xl font-semibold text-gray-800">Register Account</div>
        <div>
          <Label for="name" class="mb-2 block text-gray-700">Full Name</Label>
          <Input
            type="text"
            id="name"
            bind:value={name}
            placeholder="Enter your Full Name"
            required
            class="border-gray-300 focus:ring-primary-500"
          />
        </div>

        <div>
          <Label for="email" class="mb-2 block text-gray-700"
            >Email address</Label
          >
          <Input
            type="email"
            id="email"
            bind:value={email}
            placeholder="Enter your Email Address"
            required
            class="border-gray-300 focus:ring-primary-500"
          />
        </div>

        <div>
          <Label for="number" class="mb-2 block text-gray-700"
            >Phone Number</Label
          >
          <Input
            type="tel"
            id="number"
            bind:value={number}
            placeholder="Enter your Phone Number"
            required
            class="border-gray-300 focus:ring-primary-500"
          />
        </div>

        <!-- Password Field -->
        <div class="relative">
          <Label for="password" class="mb-2 block text-gray-700">Password</Label
          >
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            bind:value={password}
            placeholder="Enter password"
            required
            class="pr-12 border-gray-300 focus:ring-primary-500"
          />
          <button
            type="button"
            on:click={() => (showPassword = !showPassword)}
            class="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {#if showPassword}
              <EyeSlashOutline class="w-5 h-5" />
            {:else}
              <EyeOutline class="w-5 h-5" />
            {/if}
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <Label for="confirm_password" class="mb-2 block text-gray-700"
            >Confirm password</Label
          >
          <Input
            id="confirm_password"
            type={showConfirm ? "text" : "password"}
            bind:value={confirmPassword}
            placeholder="Confirm your password"
            required
            class="pr-12 border-gray-300 focus:ring-primary-500"
          />
          <button
            type="button"
            on:click={() => (showConfirm = !showConfirm)}
            class="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {#if showConfirm}
              <EyeSlashOutline class="w-5 h-5" />
            {:else}
              <EyeOutline class="w-5 h-5" />
            {/if}
          </button>
        </div>

        <div>
          <Checkbox
            bind:checked={agreed}
            required
            class="gap-1 rtl:space-x-reverse"
          >
            I agree with the
            <A href="/" class="text-primary-900  hover:underline">
              terms and conditions
            </A>
          </Checkbox>
        </div>

        {#if errorMessage}
          <p class="text-red-600 text-sm">{errorMessage}</p>
        {/if}

        <Button
          type="submit"
          class="w-full bg-red-900 text-white hover:bg-red-700"
        >
          Submit
        </Button>
      </form>
    </div>
  </div>
</div>
