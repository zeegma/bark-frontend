<script lang="ts">
  import { CloseOutline } from "flowbite-svelte-icons";
  import DeleteModal from "../widgets/claimants/DeleteModal.svelte";
  import { selectionStore } from "../../stores/selectionStore";

  // For delete modal
  let deleteModal: boolean = false;
  let bulkDeleteIds: string[] = [];
  let selectedIds: Set<string>;

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
  });

  // Props
  export let selectedCount: number = 0;
  export let onClear: () => void = () => {};

  function handleDelete() {
    bulkDeleteIds = Array.from(selectedIds);
    deleteModal = true;
  }
</script>

<div class="fixed flex items-center rounded-full bg-red-100 px-3 py-2 h-11">
  <button
    class="flex items-center justify-center mr-2 ml-1 text-gray-500 hover:text-gray-700"
    on:click={onClear}
    aria-label="Clear selection"
  >
    <CloseOutline class="w-6 h-6" />
  </button>

  <span class="text-sm font-medium text-gray-700">
    {selectedCount} selected
  </span>

  <button
    class="ml-4 bg-[#800000] hover:bg-red-700 text-white px-12 py-2 text-sm font-medium rounded-full"
    on:click={handleDelete}
  >
    Delete
  </button>
</div>
<DeleteModal bind:open={deleteModal} claim={null} idsToDelete={bulkDeleteIds} />
