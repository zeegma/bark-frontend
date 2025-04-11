<script lang="ts">
  import Navbar from "./Navbar.svelte";
</script>

<div class="flex min-h-screen">
  <Navbar />
  <main class="flex-1 overflow-auto p-4">
    <slot />
  </main>
</div>
