<script lang="ts">
  import { DotsVerticalOutline } from "flowbite-svelte-icons";
  import Placeholder from "./Placeholder.svelte";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";

  type ClaimItem = {
    id: string;
    name: string;
    phone: string;
    facebook: string;
    dateFiled: string;
    itemId: string;
    itemRequested: string;
    hasImage?: boolean;
  };

  let clickTimeout: NodeJS.Timeout | null = null;

  export let id: string;
  export let name: string;
  export let dateFiled: string;
  export let phone: string;
  export let hasImage: boolean = true;
  export let claim: ClaimItem;
  export let onDoubleClick: (claim: ClaimItem) => void;

  // Selection state
  let selectedIds: Set<string>;
  let isSelected: boolean;

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isSelected = selectedIds.has(id);
  });

  // Function for handling the menu click
  function handleMenuClick() {
    // TBI
  }

  // Function to handle card selection
  function handleCardClick() {
    // Clear any existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
    }

    // Set a new timeout
    clickTimeout = setTimeout(() => {
      // Only toggle selection if it wasn't a double click
      selectionActions.toggleSelection(id);
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
    if (!selectedIds.has(id)) {
      selectionActions.toggleSelection(id);
    }

    // Trigger double click
    onDoubleClick(claim);
  }

  function handleKeyDown(event: KeyboardEvent) {
    // Trigger click on enter space to stop linter yap
    if (event.key === "Enter" || event.key === " ") {
      handleCardClick();
    }
  }
</script>

<div
  class={`group ${
    isSelected
      ? "bg-red-100 hover:bg-red-200 border border-red-200"
      : "bg-white hover:bg-gray-50 border border-gray-200"
  } rounded-xl`}
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
    <div class="flex justify-between items-center p-2">
      <div class="flex items-center">
        <span class="text-sm text-gray-500">{id}</span>
        {#if isSelected}
          <span class="ml-2 w-2 h-2 bg-red-700 rounded-full"></span>
        {/if}
      </div>
      <button
        on:click|stopPropagation={handleMenuClick}
        class="text-gray-500 hover:text-gray-700"
      >
        <DotsVerticalOutline size="sm" />
      </button>
    </div>

    <!-- Image area -->
    <div
      class={`w-full h-32 flex items-center justify-center ${isSelected ? "bg-red-100 group-hover:bg-red-200" : "bg-white group-hover:bg-gray-50"}`}
    >
      {#if hasImage}
        <div
          class="w-[90%] h-full bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <img
            src="/src/assets/me.png"
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
            <Placeholder />
          </div>
          <span class="text-xs text-gray-500 mt-1">NO PHOTO AVAILABLE</span>
        </div>
      {/if}
    </div>

    <!-- Card footer w/ info -->
    <div
      class={`p-2 ${isSelected ? "bg-red-100 group-hover:bg-red-200" : "bg-white group-hover:bg-gray-50"}`}
    >
      <div class="flex flex-col">
        <span class="text-xs text-gray-800 truncate">{name}</span>
        <div class="flex text-xs text-gray-500 space-x-1">
          <span>•</span>
          <span>{dateFiled}</span>
          <span>•</span>
          <span>{phone}</span>
        </div>
      </div>
    </div>
  </div>
</div>
