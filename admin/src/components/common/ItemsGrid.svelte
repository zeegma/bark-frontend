<script lang="ts">
  import { onMount } from "svelte";
  import ItemCard from "./ItemCard.svelte";
  import { Checkbox } from "flowbite-svelte";
  import {
    filterStore,
    type FilterOptions,
    categoryMap,
    statusMap,
  } from "../../stores/filterStore";
  import { searchStore } from "../../stores/searchStore";
  import {
    itemSelectionStore,
    itemSelectionActions,
  } from "../../stores/itemSelectionStore";
  import {
    itemDateFilterStore,
    type DateFilterOptions,
  } from "../../stores/itemDateFilterStore";
  import { sortStore, type SortOptions } from "../../stores/sortStore";
  import { dropdownActions } from "../../stores/dropdownStore";
  import type { Item } from "../../lib/types";
  import { fetchItems, updateItem } from "../../lib/api/items";
  import { refreshTrigger } from "../../stores/itemStore";
  import ViewItem from "../widgets/items/ViewItem.svelte";
  import DeleteItem from "../widgets/items/DeleteItem.svelte";
  import EditItem from "../widgets/items/EditItem.svelte";
  import SkeletonLoader from "./SkeletonLoader.svelte";
  import EmptyFallback from "./EmptyFallback.svelte";

  let allItems: Item[] = [];
  let items: Item[] = [];
  let selectedItem: Item | null = null;
  let itemToDelete: Item | null = null;
  let currentFilters: FilterOptions;
  let currentSortOptions: SortOptions;
  let currentDateFilter: DateFilterOptions;
  let isAllSelected: boolean;
  let selectedIds: Set<string>;
  let loading: boolean = true;
  let error: string | null = null;
  let viewModalOpen = false;
  let editModalOpen = false;
  let deleteModalOpen = false;
  let currentSearchTerm = "";
  let isSearchActive = false;
  let isFilteredEmpty = false;

  searchStore.subscribe((term) => {
    currentSearchTerm = term;
    isSearchActive = term.length > 0;
    applyFiltering();
  });

  itemDateFilterStore.subscribe((options) => {
    currentDateFilter = options;
    applyFiltering();
  });

  sortStore.subscribe((options) => {
    currentSortOptions = options;
    applyFiltering();
  });

  filterStore.subscribe((f) => {
    currentFilters = f;
    applyFiltering();
  });

  // Function to apply date filters
  function applyDateFilter(items: Item[]): Item[] {
    if (
      !currentDateFilter.isActive ||
      (!currentDateFilter.startDate && !currentDateFilter.endDate)
    ) {
      // Return all items if no filter is active
      return items;
    }

    return items.filter((item) => {
      // Parse the dateFiled string to a Date object
      const itemDate = new Date(item.date_found);

      // Single date filter case (when only startDate is set)
      if (currentDateFilter.startDate && !currentDateFilter.endDate) {
        const filterDate = new Date(currentDateFilter.startDate);
        return (
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate()
        );
      }

      // Date range case
      const startDate = currentDateFilter.startDate
        ? new Date(currentDateFilter.startDate.setHours(0, 0, 0, 0))
        : null;

      const endDate = currentDateFilter.endDate
        ? new Date(currentDateFilter.endDate.setHours(23, 59, 59, 999))
        : null;

      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;

      return isAfterStart && isBeforeEnd;
    });
  }

  function applyFiltering() {
    if (!currentFilters) return;
    let filtered = [...allItems];

    filtered = applyDateFilter(allItems);

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

    if (currentSearchTerm.trim() !== "") {
      const search = currentSearchTerm.trim().toLowerCase();
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(search),
      );
    }

    // Then apply sorting
    filtered = [...filtered].sort((a: Item, b: Item) => {
      const dateA = new Date(a.date_found).getTime();
      const dateB = new Date(b.date_found).getTime();

      const multiplier = currentSortOptions.sortOrder === "Ascending" ? 1 : -1;
      return (dateA - dateB) * multiplier;
    });

    filtered.sort((a, b) => Number(b.id) - Number(a.id));
    items = filtered;

    isFilteredEmpty =
      items.length === 0 &&
      allItems.length > 0 &&
      currentDateFilter.isActive &&
      !isSearchActive;
  }

  itemSelectionStore.subscribe((state) => {
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
    itemSelectionActions.toggleSelectAll(items.map((item) => item.id));
  }

  function handleCardDoubleClick(item: Item) {
    selectedItem = item;
    viewModalOpen = true;
  }

  function handleViewClick(item: Item) {
    selectedItem = item;
    viewModalOpen = true;
  }

  function handleEditClick(item: Item) {
    selectedItem = item;
    editModalOpen = true;
  }

  function handleDeleteClick(item: Item) {
    console.log("Open delete");
    itemToDelete = item;
    deleteModalOpen = true;
  }

  async function handleDelete(id: string) {
    if (!itemToDelete) {
      console.error("Item to delete is not defined.");
      return;
    }
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
    const handleGlobalClick = (event: MouseEvent) => {
      const clickedOnDropdown = (event.target as Element).closest(
        "[role='dialog']",
      );
      const clickedOnMenu = (event.target as Element).closest(
        "[class^='dots-menu-']",
      );

      if (!clickedOnDropdown && !clickedOnMenu) {
        dropdownActions.closeAll();
      }
    };

    const handleScroll = () => {
      dropdownActions.closeAll();
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("scroll", handleScroll, true);

    // Fetch initial items
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

    window.removeEventListener("click", handleGlobalClick);
    window.removeEventListener("scroll", handleScroll, true);
  });
</script>

{#if loading}
  <SkeletonLoader type="grid" count={3} view="items" />
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
  <!-- allItems -->
{:else if items.length === 0}
  {#if isSearchActive}
    <EmptyFallback
      type="items"
      message="No items match your search."
      subMessage="Try using different keywords or clear the search."
    />
  {:else if isFilteredEmpty}
    <EmptyFallback
      type="items"
      message="No results match your filter."
      subMessage="Try adjusting or clearing the date range."
    />
  {:else}
    <EmptyFallback
      type="items"
      message="No items at the moment."
      subMessage="Looks like nobody has requested a claim yet."
    />
  {/if}
{:else}
  <div class="mr-2">
    <!-- Select all -->
    <div class="sticky top-0 bg-white pb-3 pl-1 flex items-center">
      <Checkbox
        checked={isAllSelected}
        on:change={handleSelectAll}
        color="red"
        class="cursor-pointer"
      />
      <span class="ml-2 mt-1 text-sm text-gray-700">Select All</span>
    </div>

    <!-- Main content grid -->
    <div class="grid grid-cols-3 gap-4 w-full">
      {#each items as item, index (item.id)}
        <ItemCard
          {index}
          {item}
          onDelete={handleDelete}
          onSave={handleSave}
          onDoubleClick={handleCardDoubleClick}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      {/each}
    </div>
  </div>

  {#if viewModalOpen && selectedItem !== null}
    <ViewItem item={selectedItem} bind:open={viewModalOpen} />
  {/if}
  {#if editModalOpen && selectedItem !== null}
    <EditItem
      bind:open={editModalOpen}
      item={selectedItem}
      onSave={handleSave}
    />
  {/if}
  {#if deleteModalOpen && itemToDelete}
    <DeleteItem
      bind:open={deleteModalOpen}
      item={itemToDelete}
      onDelete={() => itemToDelete && handleDelete(itemToDelete.id)}
    />
  {/if}
{/if}
