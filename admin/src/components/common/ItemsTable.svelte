<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    Spinner,
  } from "flowbite-svelte";
  import DeleteItem from "../widgets/DeleteItem.svelte";
  import EditItem from "../widgets/EditItem.svelte";
  import ViewItem from "../widgets/ViewItem.svelte";
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
  import { formatDate, formatTime } from "../../lib/formatDateTime";
  import { onMount } from "svelte";
  import type { Item } from "../../lib/types";
  import { fetchItems, updateItem } from "../../lib/api/items";

  let allItems: Item[] = [];
  let filteredItems: Item[] = [];
  let currentFilters: FilterOptions;
  let selectedIds: Set<string>;
  let isAllSelected: boolean;
  let loading = true;
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

    filtered.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    filteredItems = filtered;
  }

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
  });

  function handleSelectAll() {
    selectionActions.toggleSelectAll(filteredItems.map((item) => item.id));
  }

  function handleSelectItem(id: string) {
    selectionActions.toggleSelection(id);
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
  <div class="flex justify-center items-center h-40">
    <Spinner color="red" size={20} />
  </div>
{:else if error}
  <div class="text-center p-8 text-red-600">
    <p>Error loading data: {error}</p>
    <button
      class="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      on:click={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
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
            {item.category}
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 text-center">
            {formatDate(item.date_found)}
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
              <EditItem {item} onSave={handleSave} />
              <DeleteItem {item} onDelete={handleDelete} />
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/if}
