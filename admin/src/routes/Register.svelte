<script>
  import { Input, Label, Button, Checkbox, A } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";

  let showPassword = false;
  let showConfirm = false;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <form class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
    <div>
      <Label for="name" class="mb-2 block">Full Name</Label>
      <Input type="text" id="name" placeholder="John Doe" required />
    </div>

    <div>
      <Label for="email" class="mb-2 block">Email address</Label>
      <Input
        type="email"
        id="email"
        placeholder="john.doe@company.com"
        required
      />
    </div>

    <!-- Password Field -->
    <div class="relative">
      <Label for="password" class="mb-2 block">Password</Label>
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="•••••••••"
        required
        class="pr-12"
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
      <Label for="confirm_password" class="mb-2 block">Confirm password</Label>
      <Input
        id="confirm_password"
        type={showConfirm ? "text" : "password"}
        placeholder="•••••••••"
        required
        class="pr-12"
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
      <Checkbox required class="gap-1 rtl:space-x-reverse">
        I agree with the
        <A
          href="/"
          class="text-primary-700 dark:text-primary-600 hover:underline"
        >
          terms and conditions
        </A>.
      </Checkbox>
    </div>

    <Button type="submit" class="w-full">Submit</Button>
  </form>
</div>
