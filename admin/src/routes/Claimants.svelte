<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import SortDropdown from "../components/common/SortDropdown.svelte";
  import DatePicker from "../components/common/DatePicker.svelte";
  import Toggle from "../components/common/Toggle.svelte";
  import Table from "../components/common/Table.svelte";
  import Grid from "../components/common/Grid.svelte";
  import Indicator from "../components/common/Indicator.svelte";
  import { viewStore, type ViewType } from "../stores/viewStore";
  import {
    claimantsSelectionStore,
    claimantsSelectionActions,
  } from "../stores/claimantsSelectionStore";
  import { claimantsDateFilterActions } from "../stores/claimantsDateFilterStore";
  import { onMount, onDestroy } from "svelte";

  // Subscribe to necessary stores
  let currentView: ViewType;
  let selectedIds: Set<string>;

  onMount(() => {
    claimantsSelectionActions.clearSelection();
  });

  viewStore.subscribe((value) => {
    currentView = value;
  });

  claimantsSelectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
  });

  // Function to handle selection actions
  function clearSelection() {
    claimantsSelectionActions.clearSelection();
  }

  // Clear filter when coming from a diff page
  onDestroy(() => {
    claimantsDateFilterActions.clearDateFilter();
  });
</script>

<Layout title="Claimants">
  <div class="p-2">
    <!-- Filter section -->
    <div class="flex gap-4 mb-7">
      <SortDropdown />
      <div class="w-1/4">
        <DatePicker
          ranged={true}
          setDateRange={claimantsDateFilterActions.setDateRange}
          clearDateFilter={claimantsDateFilterActions.clearDateFilter}
        />
      </div>
      <Toggle />

      <div class="flex flex-1 justify-end">
        <!-- Selection Indicator -->
        {#if selectedIds.size > 0}
          <Indicator
            type="claimants"
            selectedCount={selectedIds.size}
            onClear={clearSelection}
          />
        {/if}
      </div>
    </div>

    <!-- Table section -->
    <div class="overflow-auto h-[calc(100vh-18rem)]">
      {#if currentView === "list"}
        <Table />
      {:else}
        <Grid />
      {/if}
    </div>
  </div>
</Layout>
