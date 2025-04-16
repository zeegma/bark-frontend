<script lang="ts">
  import { onMount } from "svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Checkbox } from "flowbite-svelte";
  import { filterStore, type FilterOptions } from "../../stores/filterStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import { type Item } from "../../stores/itemStore";

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
    filtered.sort((a, b) => b.id.localeCompare(a.id));
    items = filtered;
  }

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
  });

  function handleSelectAll() {
    selectionActions.toggleSelectAll(items.map((item) => item.id));
  }

  // Load items from localStorage
  onMount(() => {
    allItems = JSON.parse(localStorage.getItem("items") || "[]");
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
      <ItemCard {item} />
    {/each}
  </div>
</div>
