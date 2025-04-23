<script lang="ts">
  import {
    DotsVerticalOutline,
    MapPinSolid,
    CalendarMonthSolid,
    FileSolid,
  } from "flowbite-svelte-icons";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import { formatDate, formatTime } from "../../lib/formatDateTime";
  import { onMount, onDestroy } from "svelte";
  import ViewItem from "../widgets/ViewItem.svelte";
  import EditItem from "../widgets/EditItem.svelte";
  import DeleteItem from "../widgets/DeleteItem.svelte";
  import type { Item } from "../../lib/types";
  import { fetchItems } from "../../lib/api/items";

  export let item: Item;

  let selectedIds: Set<string>;
  let isSelected: boolean;
  let showMenu = false;
  let menuRef: HTMLElement; // For closing the menu if clicked outside the menu
  let currentlyOpenMenu: string | null = null; // Check if multiple menu is open (NOT WORKING)
  let allItems: Item[] = [];
  let loading = false;
  export let onDelete: (id: string) => void;
  export let onSave: (updatedItem: Item) => void;

  const { photo_url } = item;
  const hasImage = !!photo_url;

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isSelected = selectedIds.has(item.id);
  });

  const handleCardClick = () => {
    selectionActions.toggleSelection(item.id);
  };

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      handleCardClick();
    }
  }

  const handleMenuClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (currentlyOpenMenu !== item.id) {
      showMenu = true;
      currentlyOpenMenu = item.id;
    } else {
      showMenu = false;
      currentlyOpenMenu = null;
    }
  };

  const closeMenu = () => {
    showMenu = false;
    currentlyOpenMenu = null;
  };

  // Stop the card from being clicked when button is clicked in the dropdown
  const handleMenuItemClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef && !menuRef.contains(event.target as Node)) {
      showMenu = false;
      currentlyOpenMenu = null;
    }
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

  // Add/remove global click listener for menu (TODO: Check for other approaches)
  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<div
  class={`group w-full ${isSelected ? "bg-red-100 hover:bg-red-200 border border-red-200" : "bg-white hover:bg-gray-50 border border-gray-200"} rounded-xl`}
  tabindex="-1"
  aria-label="Description of card action"
  role="button"
  on:click={handleCardClick}
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
      <div class="relative" bind:this={menuRef}>
        <button
          on:click={handleMenuClick}
          class="text-gray-500 hover:text-gray-700"
        >
          <DotsVerticalOutline size="sm" />
        </button>

        {#if showMenu}
          <div
            class="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow z-50"
          >
            <button
              on:click={(event) => {
                handleMenuItemClick(event);
              }}
              class="w-full text-left px-1 py-1 hover:bg-gray-100 text-sm"
            >
              <ViewItem {item} viewType="grid" />
            </button>
            <button
              on:click={handleMenuItemClick}
              class="w-full text-left px-1 py-1 hover:bg-gray-100 text-sm"
            >
              <EditItem {item} viewType="grid" onSave={handleSave} />
            </button>
            <button
              on:click={handleMenuItemClick}
              class="w-full text-left px-1 py-1 hover:bg-gray-100 text-sm"
            >
              <DeleteItem {item} viewType="grid" onDelete={handleDelete} />
            </button>
          </div>
        {/if}
      </div>
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
            <span
              >{formatDate(item.date_found)} • {formatTime(
                item.time_found,
              )}</span
            >
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
</div>
