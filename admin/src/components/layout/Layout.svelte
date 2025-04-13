<script lang="ts">
  import Navbar from "./Navbar.svelte";
  import Searchbar from "../common/Searchbar.svelte";
  import { location } from "svelte-spa-router";

  export let title: string = "";

  $: showSearchBar = $location === "/items" || $location === "/claimants";
</script>

<div class="flex min-h-screen bg-[#800000]">
  <Navbar />
  <main class="flex-1 overflow-auto p-7">
    <div class="bg-white rounded-3xl p-7 h-full">
      {#if showSearchBar}
        <div class="flex mb-5 justify-between">
          <div class="p-2">
            <h1 class={`text-5xl font-semibold`}>{title}</h1>
          </div>
          <div class="w-2/3 flex justify-end">
            <Searchbar />
          </div>
        </div>
      {/if}
      <slot />
    </div>
  </main>
</div>
