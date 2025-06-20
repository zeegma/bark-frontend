<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
  } from "flowbite-svelte";
  import DeleteItem from "../widgets/items/DeleteItem.svelte";
  import EditItem from "../widgets/items/EditItem.svelte";
  import ViewItem from "../widgets/items/ViewItem.svelte";
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
  import { sortStore, type SortOptions } from "../../stores/sortStore";
  import {
    dateFilterStore,
    type DateFilterOptions,
  } from "../../stores/dateFilterStore";
  import { formatTime } from "../../lib/formatDateTime";
  import { onMount } from "svelte";
  import type { Item } from "../../lib/types";
  import { fetchItems, updateItem } from "../../lib/api/items";
  import { searchStore } from "../../stores/searchStore";
  import { refreshTrigger } from "../../stores/itemStore";
  import {
    TrashBinSolid,
    InfoCircleOutline,
    EditSolid,
    FileZipSolid,
  } from "flowbite-svelte-icons";
  import SkeletonLoader from "./SkeletonLoader.svelte";
  import EmptyFallback from "./EmptyFallback.svelte";

  let allItems: Item[] = [];
  let filteredItems: Item[] = [];
  let currentFilters: FilterOptions;
  let currentSortOptions: SortOptions;
  let currentDateFilter: DateFilterOptions;
  let selectedIds: Set<string>;
  let isAllSelected: boolean;
  let loading: boolean = true;
  let error: string | null = null;
  let deleteModalOpen = false;
  let itemToDelete: Item | null = null;
  let selectedItem: Item | null = null;
  let viewModalOpen = false;
  let editModalOpen = false;
  let currentSearchTerm = "";
  let isSearchActive = false;
  let isFilteredEmpty = false;

  searchStore.subscribe((term) => {
    currentSearchTerm = term;
    isSearchActive = term.length > 0;
    applyFiltering();
  });

  dateFilterStore.subscribe((options) => {
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
        filteredItems = filtered;
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
    filteredItems = filtered;

    isFilteredEmpty =
      filteredItems.length === 0 &&
      allItems.length > 0 &&
      currentDateFilter.isActive &&
      !isSearchActive;
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
    selectionActions.toggleSelectAll(filteredItems.map((item) => item.id));
  }

  function handleSelectItem(id: string) {
    selectionActions.toggleSelection(id);
  }

  function formatCategoryKey(key: string): string {
    if (!key) return "";
    return key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/&/g, "&")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\s+&\s+/g, " & ");
  }

  function openEditModal(item: Item) {
    selectedItem = item;
    editModalOpen = true;
  }

  function openDeleteModal(item: Item) {
    itemToDelete = item;
    deleteModalOpen = true;
  }

  async function handleDelete() {
    loading = true;
    try {
      const fetched = await fetchItems();
      allItems = fetched;
      applyFiltering();
    } catch (e) {
      console.error("Error deleting item:", e);
    } finally {
      loading = false;
    }
  }

  async function handleSave(updatedItem: Item) {
    loading = true;
    try {
      const res = await updateItem(updatedItem);
      if (res.ok) {
        const fetched = await fetchItems(); // refresh data from server
        allItems = fetched;
        applyFiltering();
      } else {
        console.error("Failed to update/save item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
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
  <div class="flex justify-center items-center h-full pb-10">
    <SkeletonLoader type="table" count={6} />
  </div>
{:else if error}
  <div class="flex justify-center items-center h-full flex-col text-gray-800">
    <FileZipSolid class="w-20 h-20 mb-4 text-[#800000]" />
    <p>Error loading data: {error}</p>
    <button
      class="mt-4 px-4 py-2 bg-[#800000] text-white rounded"
      on:click={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
{:else if filteredItems.length === 0}
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
      subMessage="Looks like nobody has reported a lost item yet."
    />
  {/if}
{:else}
  <Table hoverable class="w-full table-fixed overflow-auto">
    <TableHead>
      <TableHeadCell class="p-4 w-16 text-center">
        <Checkbox
          checked={isAllSelected}
          on:change={handleSelectAll}
          color="red"
          class="cursor-pointer"
        />
      </TableHeadCell>
      <TableHeadCell class="p-4 whitespace-nowrap w-20 text-center"
        >ID</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-32 text-center"
        >Item Name</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-36 text-center"
        >Description</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-36 text-center"
        >Category</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-24 text-center"
        >Date Lost</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-20 text-center"
        >Time Lost</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-32 text-center"
        >Location</TableHeadCell
      >
      <TableHeadCell class="p-4 whitespace-nowrap w-28 text-center"
        >Status</TableHeadCell
      >
      <TableHeadCell class="p-4 w-24">
        <span class="sr-only">Actions</span>
      </TableHeadCell>
    </TableHead>

    <TableBody tableBodyClass="divide-y">
      {#each filteredItems as item}
        <!-- Using 'filteredItems' here -->
        <TableBodyRow
          class={selectedIds.has(item.id)
            ? "h-16 bg-red-100 hover:bg-red-200"
            : "h-16"}
        >
          <TableBodyCell class="p-4">
            <Checkbox
              checked={selectedIds.has(item.id)}
              on:change={() => handleSelectItem(item.id)}
              color="red"
              class="cursor-pointer"
            />
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 text-center">
            {item.id}
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 truncate text-center">
            {item.name}
          </TableBodyCell>
          <TableBodyCell
            class="p-2 text-gray-600 truncate text-center max-w-[18rem]"
            title={item.description}
          >
            {item.description}
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 text-center">
            {formatCategoryKey(
              Object.keys(categoryMap).find(
                (key) => categoryMap[key] === item.category,
              ) || "",
            )}
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 text-center">
            {item.date_found}
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 text-center">
            {formatTime(item.time_found)}
          </TableBodyCell>
          <TableBodyCell
            class="p-2 text-gray-600 truncate text-center max-w-[18rem]"
          >
            {item.location_found}
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 text-center">
            {#if item.status === "UC"}
              <span
                class="inline-block w-[100px] bg-[#A79F00]/10 border border-[#A79F00] text-[#A79F00] font-medium p-2 rounded-lg"
              >
                Unclaimed
              </span>
            {:else if item.status === "CL"}
              <span
                class="inline-block w-[100px] bg-[#4BA83D]/10 border border-[#4BA83D] text-[#4BA83D] font-medium p-2 rounded-lg"
              >
                Claimed
              </span>
            {:else if item.status === "EX"}
              <span
                class="inline-block w-[100px] bg-[#800000]/10 border border-[#800000] text-[#800000] font-medium p-2 rounded-lg"
              >
                Expired
              </span>
            {/if}
          </TableBodyCell>
          <TableBodyCell class="p-2">
            <div class="flex gap-1">
              <ViewItem {item} />
              <button
                on:click={() => {
                  viewModalOpen = true;
                  selectedItem = item;
                }}
              >
                <InfoCircleOutline />
              </button>
              <button on:click={() => openEditModal(item)}>
                <EditSolid />
              </button>
              <button on:click={() => openDeleteModal(item)}>
                <TrashBinSolid />
              </button>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

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
  {#if itemToDelete}
    <DeleteItem
      bind:open={deleteModalOpen}
      item={itemToDelete}
      onDelete={handleDelete}
    />
  {/if}
{/if}
