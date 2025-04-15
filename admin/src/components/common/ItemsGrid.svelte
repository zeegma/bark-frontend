<script lang="ts">
  import { onMount } from "svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Checkbox } from "flowbite-svelte";
  import { filterStore, type FilterOptions } from "../../stores/filterStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";

  type Item = {
    id: string;
    name: string;
    status: string;
    category: string;
    description: string;
    dateLost: string;
    timeLost: string;
    lastKnownLocation: string;
    image?: File | null;
  };

  let allItems: Item[] = [];
  let items: Item[] = [];
  let currentFilters: FilterOptions;
  let isAllSelected: boolean;
  let selectedIds: Set<string>;

  onMount(() => {
    allItems = JSON.parse(localStorage.getItem("items") || "[]");
    applyFiltering();
  });

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

  function shouldShowImage(id: string): boolean {
    const item = items.find((i) => i.id === id);
    return !!item?.image;
  }

  // 👇 Add your handler for View button
  function handleViewItem(id: string) {
    console.log("Viewing item with id:", id);
    // You could open a modal, set a store value, etc.
  }
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
        id={item.id}
        name={item.name}
        status={item.status}
        dateLost={item.dateLost}
        timeLost={item.timeLost}
        lastKnownLocation={item.lastKnownLocation}
        hasImage={shouldShowImage(item.id)}
        onView={() => handleViewItem(item.id)}
      />
    {/each}
  </div>
</div>
