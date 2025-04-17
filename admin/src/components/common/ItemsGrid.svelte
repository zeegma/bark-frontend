<script lang="ts">
  import { onMount } from "svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Checkbox } from "flowbite-svelte";
  import { filterStore, type FilterOptions } from "../../stores/filterStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import type { Item } from "../../lib/types";
  import { fetchItems, updateItem, deleteItem } from "../../lib/api/items";

  let allItems: Item[] = [];
  let items: Item[] = [];
  let currentFilters: FilterOptions;
  let isAllSelected: boolean;
  let selectedIds: Set<string>;

  filterStore.subscribe((f) => {
    currentFilters = f;
    applyFiltering();
  });

  function applyFiltering() {
    let filtered = [...allItems];

    if (currentFilters.status !== "All") {
      filtered = filtered.filter(
        (item) => item.status === currentFilters.status,
      );
    }

    if (currentFilters.category !== "All") {
      filtered = filtered.filter(
        (item) => item.category === currentFilters.category,
      );
    }

    // Sort filtered items by ID in descending order (Latest added item first)
    filtered.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    items = filtered;
  }

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
  });

  function handleSelectAll() {
    selectionActions.toggleSelectAll(items.map((item) => item.id));
  }

  async function handleDelete(id: string) {
    // DeleteItem.svelte to be updated to use onDelete={handleDelete}
    const res = await deleteItem(id);
    if (res.ok) {
      allItems = allItems.filter((i) => i.id !== id);
      applyFiltering();
    } else {
      console.error("Failed to delete item");
    }
  }

  async function handleSave(updatedItem: Item) {
    const res = await updateItem(updatedItem);
    if (res.ok) {
      const index = allItems.findIndex((i) => i.id === updatedItem.id);
      if (index !== -1) {
        allItems[index] = updatedItem;
      } else {
        allItems.push(updatedItem);
      }
      applyFiltering();
    } else {
      console.error("Failed to update/save item");
    }
  }

  onMount(async () => {
    allItems = await fetchItems();
    applyFiltering();
  });
</script>

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
      <ItemCard
        {item}
        on:update={(e) => handleSave(e.detail)}
        on:delete={(e) => handleDelete(e.detail)}
      />
    {/each}
  </div>
</div>
