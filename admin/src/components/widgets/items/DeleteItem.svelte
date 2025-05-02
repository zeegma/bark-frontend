<script lang="ts">
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import { itemsStore } from "../../../stores/itemStore";
  import type { Item } from "../../../lib/types";
  import { Button, Spinner, Modal } from "flowbite-svelte";

  export let item: Item;
  export let onDelete: () => void;
  let deleting = false;
  export let open = false;

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
    open = false;
  };

  const closeModal = () => {
    open = false;
  };
</script>

<Modal
  bind:open
  size="sm"
  class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg flex flex-col text-center"
  placement="center"
  autoclose={false}
>
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
</Modal>
