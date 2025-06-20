<script lang="ts">
  import { onMount } from "svelte";
  import { Spinner } from "flowbite-svelte";
  // import { accessToken } from "../stores/authStore";
  import Unauthorized from "./Unauthorized.svelte";

  export let component: any;

  let isAuthenticated = false;
  let authInitialized = false;

  onMount(async () => {
    const token = sessionStorage.getItem("accessToken");
    isAuthenticated = !!token;
    authInitialized = true;
  });
</script>

{#if !authInitialized}
  <div class="flex items-center justify-center min-h-screen">
    <Spinner color="red" />
  </div>
{:else if !isAuthenticated}
  <Unauthorized />
{:else}
  <svelte:component this={component} />
{/if}
