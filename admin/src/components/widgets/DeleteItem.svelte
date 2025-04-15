<script lang="ts">
  import {
    ExclamationCircleOutline,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import { itemsStore } from "../../stores/itemStore";

  export let item: any;

  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const handleDelete = () => {
    itemsStore.deleteItem(item.id);
    showModal = false;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

<button on:click={openModal} class="btn capitalize">
  <TrashBinSolid />
</button>

{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div
      class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg flex flex-col text-center"
    >
      <div class="flex justify-between px-[2px] py-[2px]">
        <button
          type="button"
          class="text-[#1E1E1E] bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-[#800000] hover:text-white cursor-pointer"
          on:click={closeModal}
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <!-- Icon centered here -->
      <div class="flex justify-center">
        <ExclamationCircleOutline class="w-16 h-16 text-red-600 mb-4" />
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mb-2">Confirm Delete</h3>
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{item.id}</strong>?
      </p>

      <div class="mt-6 flex gap-4 w-full items-center justify-center">
        <button
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          on:click={closeModal}
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-red-900 text-white hover:bg-red-950"
          on:click={handleDelete}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  </div>
{/if}
