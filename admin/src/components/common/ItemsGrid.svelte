<script lang="ts">
  import { onMount } from "svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Checkbox, Spinner } from "flowbite-svelte";
  import {
    filterStore,
    type FilterOptions,
    categoryMap,
    statusMap,
  } from "../../stores/filterStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import type { Item } from "../../lib/types";
  import { fetchItems, updateItem, deleteItem } from "../../lib/api/items";
  import { refreshTrigger } from "../../stores/itemStore";

  let allItems: Item[] = [];
  let items: Item[] = [];
  let currentFilters: FilterOptions;
  let isAllSelected: boolean;
  let selectedIds: Set<string>;
  let loading = false;
  let error: string | null = null;

  filterStore.subscribe((f) => {
    currentFilters = f;
    applyFiltering();
  });

  function applyFiltering() {
    let filtered = [...allItems];

    if (currentFilters.status !== "All") {
      const statusKey = currentFilters.status
        .toUpperCase()
        .replace(/\s+/g, "_");
      const statusCode = statusMap[statusKey];

      if (statusCode) {
        filtered = filtered.filter((item) => item.status === statusCode);
      } else {
        console.warn(`Unknown status filter: ${currentFilters.status}`);
        filtered = [];
        items = filtered;
        return;
      }
    }

    if (currentFilters.category !== "All") {
      const categoryKey = currentFilters.category
        .toUpperCase()
        .replace(/\s*&\s*/g, "_&_") // Replace "& " with "_&_"
        .replace(/\s+/g, "_");
      const categoryCode = categoryMap[categoryKey];

      if (categoryCode) {
        filtered = filtered.filter((item) => item.category === categoryCode);
      } else {
        console.warn(`Unknown category filter: ${currentFilters.category}`);
        filtered = [];
      }
    }

    filtered.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    items = filtered;
  }

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
  });

  refreshTrigger.subscribe(async () => {
    if (loading) return;

    try {
      loading = true;
      const fetched = await fetchItems();
      allItems = fetched;
      applyFiltering();
    } catch (e) {
      console.error("Error refreshing items:", e);
    } finally {
      loading = false;
    }
  });

  function handleSelectAll() {
    selectionActions.toggleSelectAll(items.map((item) => item.id));
  }

  async function handleDelete(id: string) {
    loading = true;
    console.log("Deleting this item in the grid:", id);

    try {
      const fetched = await fetchItems();
      console.log("Fetched items:", fetched);
      allItems = fetched;
      applyFiltering();
    } catch (e) {
      console.error("Error deleting:", e);
    } finally {
      loading = false;
    }
  }

  async function handleSave(updatedItem: Item) {
    loading = true;
    console.log("Updating item from ItemsGrid:", updatedItem);

    try {
      const res = await updateItem(updatedItem); // sends update to server
      console.log("Server response from updateItem:", res);

      if (res.ok) {
        console.log("Update successful, fetching fresh items...");
        const fetched = await fetchItems(); // fetch fresh from server
        console.log("Fetched fresh items:", fetched);
        allItems = fetched;
        applyFiltering();
        console.log("Filtering applied after save.");
      } else {
        console.error("Failed to update/save item");
      }
    } catch (error) {
      console.error("Error updating items:", error);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    try {
      const fetched = await fetchItems();
      allItems = fetched;
      applyFiltering();
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to fetch items";
      console.error(error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center h-40">
    <Spinner color="red" size={20} />
  </div>
{:else if error}
  <div
    class="flex justify-center items-center h-full flex-col p-8 text-[#800000]"
  >
    <p>Error loading data: {error}</p>
    <button
      class="mt-4 px-4 py-2 bg-[#800000] text-white rounded"
      on:click={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
{:else}
  <div class="mr-2">
    <!-- Select all -->
    <div class="sticky top-0 z-10 bg-white pb-3 pl-1 pt-1 flex items-center">
      <Checkbox
        checked={isAllSelected}
        on:change={handleSelectAll}
        color="red"
        class="cursor-pointer"
      />
      <span class="ml-2 text-sm text-gray-700">Select All</span>
    </div>

    <!-- Main content grid -->
    <div class="grid grid-cols-3 gap-4 w-full">
      {#each items as item (item.id)}
        <ItemCard {item} onDelete={handleDelete} onSave={handleSave} />
      {/each}
    </div>
  </div>
{/if}
