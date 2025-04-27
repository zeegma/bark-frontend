<script lang="ts">
  import { Button, Modal, Spinner } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import { deleteClaimants } from "../../../lib/api";

  export let open = false;

  let deleting = false;

  export let claim: {
    id: string;
    name: string;
    phone: string;
    facebook: string;
    dateFiled: string;
    itemId: string;
    itemRequested: string;
    hasImage?: boolean;
  } | null;

  // Prop for bulk delete
  export let idsToDelete: string[] = [];

  // Determine if in bulk delete mode
  $: isBulkDelete = idsToDelete.length > 0;

  async function handleDelete() {
    try {
      deleting = true;

      // Use idsToDelete for bulk or claim.id for single deletion
      const ids = isBulkDelete
        ? idsToDelete.map((id) => Number(id))
        : claim
          ? [Number(claim.id)]
          : [];

      if (ids.length === 0) return;

      await deleteClaimants(ids);

      // Create deleted IDs array for the event
      const deletedIds = isBulkDelete ? idsToDelete : claim ? [claim.id] : [];

      // Fire a DOM custom event that will bubble up
      const myEvent = new CustomEvent("deletecomplete", {
        detail: { deletedIds },
        bubbles: true,
      });

      // Dispatch from any element
      document.dispatchEvent(myEvent);

      open = false;
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      deleting = false;
      open = false;
    }
  }
</script>

<Modal
  bind:open
  size="sm"
  outsideclose
  class="bg-gray-50 rounded-3xl ring-1 ring-gray-800"
>
  {#if claim || isBulkDelete}
    <div class="text-center">
      <ExclamationCircleOutline
        class="mx-auto mb-6 text-red-700 w-24 h-24 dark:text-gray-200"
      />
      <h1 class="mb-2 text-4xl font-semibold text-gray-800">
        Delete Claimant{isBulkDelete ? "s" : ""}
      </h1>
      <h3 class="mb-8 text-lg font-normal text-gray-800 dark:text-gray-400">
        {#if isBulkDelete}
          Are you sure you want to delete {idsToDelete.length} Claim{idsToDelete.length !==
          1
            ? "s"
            : ""}?
        {:else if claim}
          Are you sure you want to delete Claim {claim.id}?
        {/if}
      </h3>
      <div class="mb-3 flex gap-3 justify-center">
        <Button
          color="alternative"
          class="hover:text-red-800 border-red-800 text-[#800000]"
          on:click={() => (open = false)}
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
    </div>
  {:else}
    <p>No claim selected</p>
  {/if}
</Modal>
