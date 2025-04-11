<script lang="ts">
  import Navbar from "./Navbar.svelte";
  import Searchbar from "../common/Searchbar.svelte";
  import { location } from "svelte-spa-router";

  $: showSearchBar = $location === "/items" || $location === "/claimants";

</script>

<div class="flex min-h-screen bg-[#800000]">
  <Navbar />
  {#if showSearchBar}
  <Searchbar />
  {/if}
  <main class="flex-1 overflow-auto p-4">
    <slot />
  <main class="flex-1 overflow-auto p-7">
    <div class="bg-white rounded-4xl p-6 h-full">
      <slot />
    </div>
  </main>
</div>
