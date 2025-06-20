<script lang="ts">
  import { push } from "svelte-spa-router";
</script>

<div
  class="h-screen w-full flex items-center justify-center bg-gray-100 text-center"
>
  <div class="p-8 bg-white rounded shadow-md">
    <h2 class="text-3xl font-bold text-red-600">Unauthorized Access</h2>
    <p class="mt-4 text-lg text-gray-600">
      You do not have permission to access this page. Please log in first.
    </p>
    <button
      class="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      on:click={() => push("/")}
    >
      Go to Login Page
    </button>
  </div>
</div>
