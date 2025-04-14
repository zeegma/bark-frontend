<script lang="ts">
  import { DotsVerticalOutline } from "flowbite-svelte-icons";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";

  export let id: string;
  export let name: string;
  export let dateFiled: string;
  export let phone: string;
  export let hasImage: boolean = true;

  // Selection state
  let selectedIds: Set<string>;
  let isSelected: boolean;

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isSelected = selectedIds.has(id);
  });

  // Function for handling the menu click
  const handleMenuClick = () => {
    // TBI
  };

  // Function to handle card selection
  const handleCardClick = () => {
    selectionActions.toggleSelection(id);
  };

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
