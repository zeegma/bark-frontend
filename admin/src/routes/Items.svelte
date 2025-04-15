<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import AddItem from "../components/widgets/AddItem.svelte";
  import DatePicker from "../components/common/DatePicker.svelte";
  import ItemsTable from "../components/common/ItemsTable.svelte";
  import FilterDropdown from "../components/common/FilterDropdown.svelte";
  import Toggle from "../components/common/Toggle.svelte";
  import { viewStore, type ViewType } from "../stores/viewStore";
  import { selectionStore, selectionActions } from "../stores/selectionStore";
  import ItemsGrid from "../components/common/ItemsGrid.svelte";

  let currentView: ViewType;
  let selectedIds: Set<string>;

  viewStore.subscribe((value) => {
    currentView = value;
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
      <div class="flex gap-4 mb-7">
        <FilterDropdown />
        <DatePicker />
        <Toggle />
      </div>
      <div>
        <AddItem />
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
</Layout>
