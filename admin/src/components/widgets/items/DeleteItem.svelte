<script lang="ts">
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import { itemsStore } from "../../../stores/itemStore";
  import type { Item } from "../../../lib/types";
  import { Button, Spinner, Modal } from "flowbite-svelte";
  import { showToast } from "../../../stores/toastStore";
  import { triggerRefresh } from "../../../stores/itemStore";

  export let item: Item | null = null;
  export let onDelete: () => void;
  export let open = false;
  export let idsToDelete: string[] = [];
  let deleting = false;

  $: isBulkDelete = idsToDelete.length > 0;

  const handleDelete = async () => {
    try {
      deleting = true;

      // Use idsToDelete for bulk or item.id for single deletion
      const ids = isBulkDelete
        ? idsToDelete.map((id) => id)
        : item
          ? [item.id]
          : [];

      if (ids.length === 0) return;

      let success = true;

      for (const id of ids) {
        try {
          await itemsStore.deleteItem(id);
        } catch (error) {
          success = false;
          console.error(`Failed to delete item with id ${id}:`, error);
        }
      }

      const deletedIds = isBulkDelete ? idsToDelete : item ? [item.id] : [];

      document.dispatchEvent(
        new CustomEvent("itemdeletecomplete", {
          detail: { deletedIds },
          bubbles: true,
        }),
      );

      if (success) {
        onDelete();
        showToast(
          isBulkDelete
            ? idsToDelete.length !== 1
              ? `Successfully deleted ${idsToDelete.length} Items`
              : `Successfully deleted 1 Item`
            : `Successfully deleted Item ${item?.id || ""}`,
          "success",
        );
      } else {
        showToast(`Failed to delete one or more items`, "error");
        console.error("Not successful (some deletions failed)");
      }
      triggerRefresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Failed to delete:", error);
      showToast(`Failed to delete: ${errorMessage}`, "error");
      triggerRefresh();
    } finally {
      deleting = false;
      open = false;
    }
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
  {#if item || isBulkDelete}
    <div class="flex justify-center">
      <ExclamationCircleOutline
        class="mx-auto mb-6 text-red-700 w-24 h-24 dark:text-gray-200"
      />
    </div>

    <h1 class="mb-2 text-4xl font-semibold text-gray-800">
      Delete Item{isBulkDelete ? "s" : ""}
    </h1>
    <h3 class="mb-8 text-lg font-normal text-gray-800 dark:text-gray-400">
      {#if isBulkDelete}
        Are you sure you want to delete {idsToDelete.length} Item{idsToDelete.length !==
        1
          ? "s"
          : ""}?
      {:else if item}
        Are you sure you want to delete Item {item.id}?
      {/if}
    </h3>

    <div class="mb-3 flex gap-3 justify-center">
      <Button
        color="alternative"
        class="hover:text-red-800 border-red-800 text-[#800000]"
        on:click={closeModal}
        disabled={deleting}>No, cancel</Button
      >

      <Button color="red" on:click={handleDelete} disabled={deleting}>
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
  {:else}
    <p>No item selected</p>
  {/if}
</Modal>
