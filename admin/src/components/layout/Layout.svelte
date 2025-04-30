<script lang="ts">
  import Navbar from "./Navbar.svelte";
  import Searchbar from "../common/Searchbar.svelte";
  import GlobalToast from "../common/GlobalToast.svelte";
  import { location } from "svelte-spa-router";

  export let title: string = "";
  export let padding: string = "p-7";

  $: showSearchBar = $location === "/items" || $location === "/claimants";
</script>

<div class="flex min-h-screen bg-[#800000]">
  <Navbar />
  <main class="flex-1 overflow-auto p-7">
    <div class="bg-white rounded-3xl {padding} h-full">
      {#if showSearchBar}
        <div class="flex mb-5 justify-between">
          <div class="w-2/4 p-2">
            <h1 class={`text-5xl font-semibold`}>{title}</h1>
          </div>
          <div class="w-3/4 flex justify-end px-2">
            <Searchbar />
          </div>
        </div>
      {/if}
      <GlobalToast />
      <slot />
    </div>
  </main>
</div>
