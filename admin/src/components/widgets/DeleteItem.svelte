<script lang="ts">
  import {
    ExclamationCircleOutline,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import { itemsStore } from "../../stores/itemStore";
  import type { Item } from "../../lib/types";
  import { Button, Spinner } from "flowbite-svelte";

  export let item: Item;
  export let viewType: "list" | "grid" = "list";
  export let onDelete: () => void;
  let showModal = false;
  let deleting = false;

  const handleDelete = async () => {
    deleting = true;
    const success = await itemsStore.deleteItem(item.id);
    if (success) {
      onDelete();
      console.log("Item deleted successfully");
    } else {
      console.error("Failed to delete item");
    }
    deleting = false;
    showModal = false;
  };

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

<button
  on:click={openModal}
  class="btn capitalize {viewType === 'grid'
    ? 'w-full px-1 m-0 text-left'
    : ''}"
>
  {#if viewType === "list"}
    <TrashBinSolid />
  {:else}
    Delete
  {/if}
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
        <ExclamationCircleOutline
          class="mx-auto mb-6 text-red-700 w-24 h-24 dark:text-gray-200"
        />
      </div>

      <h1 class="mb-2 text-4xl font-semibold text-gray-800">Delete Item</h1>
      <h3 class="mb-8 text-lg font-normal text-gray-800 dark:text-gray-400">
        Are you sure you want to delete item {item.id}?
      </h3>

      <div class="mb-3 flex gap-3 justify-center">
        <Button
          color="alternative"
          class="hover:text-red-800 border-red-800 text-[#800000]"
          on:click={closeModal}>No, cancel</Button
        >

        <Button color="red" on:click={handleDelete}>
          {#if deleting}
            <div class="flex items-center gap-x-2">
              <Spinner color="white" size={5} />
              Deleting
            </div>
          {:else}
            Yes, I'm sure
          {/if}
        </Button>
      </div>
    </div>
  </div>
{/if}
