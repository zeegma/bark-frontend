<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import SortDropdown from "../components/common/SortDropdown.svelte";
  import DatePicker from "../components/common/DatePicker.svelte";
  import Toggle from "../components/common/Toggle.svelte";
  import Table from "../components/common/Table.svelte";
  import Grid from "../components/common/Grid.svelte";
  import { viewStore, type ViewType } from "../stores/viewStore";

  // Subscribe to the viewStore
  let currentView: ViewType;

  viewStore.subscribe((value) => {
    currentView = value;
  });
</script>

<Layout title="Claimants">
  <div class="p-2">
    <!-- Filter section -->
    <div class="flex gap-4 mb-7">
      <SortDropdown />
      <DatePicker />
      <Toggle />
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
