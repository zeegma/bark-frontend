<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import DateTime from "../components/widgets/dashboard/DateTime.svelte";
  import StatsGrid from "../components/widgets/dashboard/StatsGrid.svelte";
  import QuickFilters from "../components/widgets/dashboard/QuickFilters.svelte";
  import QuickEntry from "../components/widgets/dashboard/QuickEntry.svelte";
</script>

<Layout padding="p-0">
  <div class="flex h-full">
    <!-- Main content -->
    <div class="p-9 w-3/5">
      <!-- Title & time -->
      <h1 class="text-5xl mb-3 font-semibold">Statistics</h1>
      <DateTime />

      <!-- Stats -->
      <div class="h-72 mb-4">
        <StatsGrid />
      </div>

      <!-- Quick filters -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-medium text-gray-800">Quick Filters</h2>
        </div>
        <hr />
        <div class="flex w-full justify-between gap-6 mt-4">
          <QuickFilters />
        </div>
      </div>
    </div>

    <!-- Add item sidebar -->
    <div class="w-2/5 bg-gray-50 rounded-r-3xl">
      <QuickEntry />
    </div>
  </div>
</Layout>
