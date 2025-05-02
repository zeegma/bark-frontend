<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import AddItem from "../components/widgets/items/AddItem.svelte";
  import DatePicker from "../components/common/DatePicker.svelte";
  import ItemsTable from "../components/common/ItemsTable.svelte";
  import FilterDropdown from "../components/common/FilterDropdown.svelte";
  import Toggle from "../components/common/Toggle.svelte";
  import Indicator from "../components/common/Indicator.svelte";
  import { viewStore, type ViewType } from "../stores/viewStore";
  import { selectionStore, selectionActions } from "../stores/selectionStore";
  import ItemsGrid from "../components/common/ItemsGrid.svelte";
  import { Button } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";

  let currentView: ViewType;
  let selectedIds: Set<string>;
  let addItemModal = false;

  viewStore.set((sessionStorage.getItem("currentView") as ViewType) || "list");

  viewStore.subscribe((value) => {
    currentView = value;
    sessionStorage.setItem("currentView", value);
  });

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
  });

  // Function to handle selection actions
  function clearSelection() {
    selectionActions.clearSelection();
  }

  function deleteSelectedItems() {
    // Wait for API imple of deletion, this one's temp code
    console.log("Deleting items:", Array.from(selectedIds));
    selectionActions.clearSelection();
  }
</script>

<Layout title="Items">
  <div class="p-2">
    <div class="flex row-auto justify-between">
      <div class="flex items-center gap-4 mb-7">
        <FilterDropdown />
        <div class="min-w-[300px]">
          <DatePicker />
        </div>
        <div class="min-w-[96px]">
          <Toggle />
        </div>
      </div>
      <div class="flex flex-1 justify-end">
        {#if selectedIds.size > 0}
          <Indicator
            selectedCount={selectedIds.size}
            onClear={clearSelection}
          />
        {/if}
      </div>
      <div class="ml-4">
        <Button
          on:click={() => (addItemModal = true)}
          class="h-[44px] bg-red-900 text-white px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-red-950"
        >
          Add Item <PlusOutline />
        </Button>
      </div>
    </div>

    <div class="overflow-auto h-[calc(100vh-18rem)]">
      {#if currentView === "list"}
        <ItemsTable />
      {:else}
        <ItemsGrid />
      {/if}
    </div>
  </div>

  <AddItem bind:open={addItemModal} />
</Layout>
