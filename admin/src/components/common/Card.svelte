<script lang="ts">
  import { DotsVerticalOutline } from "flowbite-svelte-icons";

  export let id: string;
  export let name: string;
  export let dateFiled: string;
  export let phone: string;
  export let hasImage: boolean = true;

  // Function for handling the menu click
  const handleMenuClick = () => {
    // TBI
  };
</script>

<div
  class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
>
  <div class="relative">
    <!-- Card header -->
    <div class="flex justify-between items-center p-2">
      <span class="text-sm text-gray-500">{id}</span>
      <button
        on:click={handleMenuClick}
        class="text-gray-500 hover:text-gray-700"
      >
        <DotsVerticalOutline size="sm" />
      </button>
    </div>

    <!-- Image area -->
    <div class="w-full h-32 bg-white flex items-center justify-center">
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
    <div class="p-2 bg-white">
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
