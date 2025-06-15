<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { Spinner } from "flowbite-svelte";
  import { accessToken } from "../stores/authStore";
  import Unauthorized from "./Unauthorized.svelte";

  export let component: any;

  let authInitialized = false;
  let isAuthenticated = false;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  onMount(async () => {
    await delay(150);

    const token = get(accessToken);
    isAuthenticated = !!token;
    authInitialized = true;
  });
</script>

{#if !authInitialized}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <Spinner color="red" />
    </div>
  </div>
{:else if !isAuthenticated}
  <Unauthorized />
{:else}
  <svelte:component this={component} />
{/if}
