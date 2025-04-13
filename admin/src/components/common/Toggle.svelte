<script lang="ts">
  import { BarsOutline, GridOutline } from "flowbite-svelte-icons";
  import { viewStore, type ViewType } from "../../stores/viewStore";

  // Subscribe to the viewStore
  let view: ViewType;

  viewStore.subscribe((value) => {
    view = value;
  });

  function handleToggle(selectedView: ViewType): void {
    viewStore.set(selectedView);
    console.log(`Switched to ${selectedView} view`);
  }
</script>

<div class="flex rounded-xl overflow-hidden border border-gray-300 w-24 h-11">
  <!-- List view toggle -->
  <button
    class="flex items-center justify-center w-1/2 py-2 transition-colors {view ===
    'list'
      ? 'bg-red-100'
      : 'bg-white hover:bg-gray-100'}"
    on:click={() => handleToggle("list")}
    aria-label="List view"
  >
    <BarsOutline size="lg" color={view === "list" ? "#800000" : "#4B5563"} />
  </button>

  <!-- Grid view toggle -->
  <button
    class="flex items-center justify-center w-1/2 py-2 transition-colors {view ===
    'grid'
      ? 'bg-red-100'
      : 'bg-white hover:bg-gray-100'}"
    on:click={() => handleToggle("grid")}
    aria-label="Grid view"
  >
    <GridOutline size="lg" color={view === "grid" ? "#800000" : "#4B5563"} />
  </button>
</div>
