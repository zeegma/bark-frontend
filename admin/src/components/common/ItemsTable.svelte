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
  import DeleteItem from "../widgets/DeleteItem.svelte";
  import EditItem from "../widgets/EditItem.svelte";
  import ViewItem from "../widgets/ViewItem.svelte";
  import { filterStore, type FilterOptions } from "../../stores/filterStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import { formatDate, formatTime } from "../../lib/formatDateTime";
  import { onMount } from "svelte";
  import { type Item } from "../../stores/itemStore";

  let allItems: Item[] = [];
  let filteredItems: Item[] = [];
  let currentFilters: FilterOptions;
  let selectedIds: Set<string>;
  let isAllSelected: boolean;

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

  function handleDelete(id: string) {
    allItems = allItems.filter((i) => i.id !== id);
    localStorage.setItem("items", JSON.stringify(allItems));
    applyFiltering();
  }

  function handleSave(updatedItem: Item) {
    const index = allItems.findIndex((i) => i.id === updatedItem.id);
    if (index !== -1) {
      allItems[index] = updatedItem;
    } else {
      allItems.push(updatedItem);
    }

    localStorage.setItem("items", JSON.stringify(allItems));
    applyFiltering();
  }

  // Load items from localStorage
  onMount(() => {
    allItems = JSON.parse(localStorage.getItem("items") || "[]");
    applyFiltering();
  });
</script>

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
        <TableBodyCell class="p-2 text-gray-600 text-center">
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
          {formatDate(item.dateLost)}
        </TableBodyCell>
        <TableBodyCell class="p-2 text-gray-600 text-center">
          {formatTime(item.timeLost)}
        </TableBodyCell>
        <TableBodyCell
          class="p-2 text-gray-600 truncate text-center max-w-[18rem]"
        >
          {item.lastKnownLocation}
        </TableBodyCell>
        <TableBodyCell class="p-2 text-gray-600 text-center">
          {#if item.status === "Unclaimed"}
            <span
              class="inline-block w-[100px] bg-[#A79F00]/10 border border-[#A79F00] text-[#A79F00] font-medium p-2 rounded-lg"
            >
              {item.status}
            </span>
          {:else if item.status === "Claimed"}
            <span
              class="inline-block w-[100px] bg-[#4BA83D]/10 border border-[#4BA83D] text-[#4BA83D] font-medium p-2 rounded-lg"
            >
              {item.status}
            </span>
          {:else if item.status === "Expired"}
            <span
              class="inline-block w-[100px] bg-[#800000]/10 border border-[#800000] text-[#800000] font-medium p-2 rounded-lg"
            >
              {item.status}
            </span>
          {/if}
        </TableBodyCell>
        <TableBodyCell class="p-2">
          <div class="flex gap-1">
            <ViewItem {item} />
            <EditItem {item} onSave={handleSave} />
            <DeleteItem {item} />
          </div>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
