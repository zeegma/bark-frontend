<script lang="ts">
  import Navbar from "./Navbar.svelte";
</script>

<div class="flex min-h-screen bg-[#800000]">
  <Navbar />
  <main class="flex-1 overflow-auto p-7">
    <div class="bg-white rounded-4xl p-6 h-full">
      <slot />
    </div>
  </main>
</div>
