<script lang="ts">
  import {
    DotsVerticalOutline,
    MapPinSolid,
    CalendarMonthSolid,
    FileSolid,
  } from "flowbite-svelte-icons";
  import { Dropdown, DropdownItem } from "flowbite-svelte";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import { formatTime } from "../../lib/formatDateTime";
  import { onMount } from "svelte";
  import ViewItem from "../widgets/items/ViewItem.svelte";
  import EditItem from "../widgets/items/EditItem.svelte";
  import DeleteItem from "../widgets/items/DeleteItem.svelte";
  import type { Item } from "../../lib/types";
  import {
    openDropdownIdStore,
    dropdownActions,
  } from "../../stores/dropdownStore";

  export let item: Item;
  export let index: number;
  export let onDelete: (id: string) => void;
  export let onSave: (updatedItem: Item) => void;
  export let onDoubleClick: (item: Item) => void;
  export let onViewClick: (item: any) => void;
  export let onDeleteClick: (item: any) => void;
  export let onEditClick: (item: Item) => void;

  let selectedIds: Set<string>;
  let isSelected: boolean;
  let showMenu = false;
  let isDropdownOpen = false;
  let loading = false;
  let viewModalOpen = false;
  let editModalOpen = false;
  let deleteModalOpen = false;
  let itemToDelete: Item | null = null;
  let clickTimeout: NodeJS.Timeout | null = null;
  let currentlyOpenMenu: string | null = null; // Check if multiple menu is open (NOT WORKING)

  const { photo_url } = item;
  const hasImage = !!photo_url;
  const dropdownId = `dropdown-${item.id}-${index}`;

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isSelected = selectedIds.has(item.id);
  });

  openDropdownIdStore.subscribe((openId) => {
    isDropdownOpen = openId === dropdownId;
  });

  function handleCardClick() {
    // Clear any existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
    }

    // Set a new timeout
    clickTimeout = setTimeout(() => {
      // Only toggle selection if it wasn't a double click
      selectionActions.toggleSelection(item.id);
      clickTimeout = null;
    }, 250);
  }

  function handleDoubleClick(event: MouseEvent) {
    // Clear the timeout to prevent the click handler from firing
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
    }

    // Also, select item
    if (!selectedIds.has(item.id)) {
      selectionActions.toggleSelection(item.id);
    }

    onDoubleClick(item);
  }

  function toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    dropdownActions.toggleDropdown(dropdownId);
  }

  function handleView(event: MouseEvent) {
    event.stopPropagation();
    dropdownActions.closeAll();
    onViewClick(item);
  }

  function openDeleteModal(item: Item, event: MouseEvent) {
    event.stopPropagation();
    itemToDelete = item;
    onDeleteClick(item);
    dropdownActions.closeAll();
  }

  function handleEdit(event: MouseEvent) {
    event.stopPropagation();
    dropdownActions.closeAll();
    onEditClick(item);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      handleCardClick(); // No event passed here
    }
  }

  const closeMenu = () => {
    showMenu = false;
    currentlyOpenMenu = null;
  };

  async function handleDelete() {
    loading = true;
    try {
      console.log("Deleting item with ID:", item.id);
      await onDelete(item.id);
      closeMenu();
    } catch (e) {
      console.error("Error deleting item:", e);
    } finally {
      loading = false;
    }
  }

  async function handleSave(updatedItem: Item) {
    loading = true;
    try {
      console.log("Saving updated item from ItemCard:", updatedItem);
      await onSave(updatedItem);
      closeMenu();
    } catch (error) {
      console.error("Error saving item from ItemCard:", error);
    } finally {
      loading = false;
    }
  }

  // Add scroll handler to close dropdown when scrolling
  onMount(() => {
    const handleScroll = () => {
      if (isDropdownOpen) {
        dropdownActions.closeAll();
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, true);

    // Clean up on component destruction
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  });
</script>

<div
  class={`group w-full ${isSelected ? "bg-red-100 hover:bg-red-200 border border-red-200" : "bg-white hover:bg-gray-50 border border-gray-200"} rounded-xl`}
  tabindex="-1"
  aria-label="Description of card action"
  role="button"
  on:click={handleCardClick}
  on:dblclick={handleDoubleClick}
  on:keydown={handleKeyDown}
>
  <div
    class={`relative rounded-xl shadow-sm overflow-hidden border border-gray-200 cursor-pointer ${isSelected ? "bg-red-100 group-hover:bg-red-200" : "bg-white group-hover:bg-gray-50"}`}
  >
    <!-- Card header -->
    <div
      class={`flex justify-between items-center px-4 py-3 ${isSelected ? "bg-red-100 group-hover:bg-red-200" : "bg-white group-hover:bg-gray-50"}`}
    >
      <div class="flex items-center">
        <span class="text-sm font-semibold text-[#1E1E1E]">{item.id}</span>
        {#if isSelected}
          <span class="ml-2 w-2 h-2 bg-red-700 rounded-full"></span>
        {/if}
      </div>

      <!-- Menu trigger & dropdown -->
      <div
        aria-label="Menu icon"
        role="button"
        tabindex="-2"
        on:click={toggleDropdown}
        on:keydown={handleKeyDown}
      >
        <DotsVerticalOutline class={`dots-menu-${index} dark:text-white`} />
      </div>

      <Dropdown
        triggeredBy={`.dots-menu-${index}`}
        autosave="true"
        bind:open={isDropdownOpen}
        class="text-left items-start"
      >
        <DropdownItem on:click={handleView}>View</DropdownItem>
        <DropdownItem on:click={handleEdit}>Edit</DropdownItem>
        <DropdownItem on:click={(e) => openDeleteModal(item, e)}
          >Delete</DropdownItem
        >
      </Dropdown>
    </div>

    <!-- Image area -->
    <div
      class={`w-full h-[180px] flex items-center justify-center ${isSelected ? "bg-red-100 group-hover:bg-red-200" : "bg-white group-hover:bg-gray-50"}`}
    >
      {#if hasImage && item.photo_url}
        <div
          class="w-[90%] h-full bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <img
            src={item.photo_url}
            alt="Claim"
            class="h-full w-full object-cover"
          />
        </div>
      {:else}
        <div
          class="w-[90%] h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center"
        >
          <div
            class="w-12 h-12 bg-gray-300 flex items-center justify-center rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span class="text-xs text-gray-500 mt-1">NO PHOTO AVAILABLE</span>
        </div>
      {/if}
    </div>

    <!-- Card footer -->
    <div
      class={`flex row-auto justify-between px-4 py-2 ${isSelected ? "bg-red-100 group-hover:bg-red-200" : "bg-white group-hover:bg-gray-50"}`}
    >
      <div class="flex flex-col">
        <div class="space-y-1 text-sm">
          <div class="flex items-center gap-1">
            <FileSolid class="w-4 h-4" />
            <span class="truncate">{item.name}</span>
          </div>
          <div class="flex items-center gap-1">
            <CalendarMonthSolid class="w-4 h-4" />
            <span>{item.date_found} • {formatTime(item.time_found)}</span>
          </div>
          <div class="flex items-center gap-1">
            <MapPinSolid class="w-4 h-4" />
            <span class="truncate">{item.location_found}</span>
          </div>
        </div>
      </div>
      <div>
        {#if item.status === "UC"}
          <span
            class="inline-block w-fit bg-[#A79F00]/10 border border-[#A79F00] text-[#A79F00] text-[10px] font-medium px-3 py-1 rounded-lg"
          >
            Unclaimed
          </span>
        {:else if item.status === "CL"}
          <span
            class="inline-block w-fit bg-[#4BA83D]/10 border border-[#4BA83D] text-[#4BA83D] text-[10px] font-medium px-3 py-1 rounded-lg"
          >
            Claimed
          </span>
        {:else if item.status === "EX"}
          <span
            class="inline-block w-fit bg-[#800000]/10 border border-[#800000] text-[#800000] text-[10px] font-medium px-3 py-1 rounded-lg"
          >
            Expired
          </span>
        {/if}
      </div>
    </div>
  </div>

  {#if viewModalOpen}
    <ViewItem {item} bind:open={viewModalOpen} />
  {/if}
  {#if editModalOpen}
    <EditItem bind:open={editModalOpen} {item} onSave={handleSave} />
  {/if}
  {#if itemToDelete}
    <DeleteItem
      bind:open={deleteModalOpen}
      item={itemToDelete}
      onDelete={handleDelete}
    />
  {/if}
</div>
