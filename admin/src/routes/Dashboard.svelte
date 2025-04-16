<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import { onMount } from "svelte";
  import StatsGrid from "../components/widgets/dashboard/StatsGrid.svelte";
  import QuickFilters from "../components/widgets/dashboard/QuickFilters.svelte";

  let time: Date = $state(new Date());

  let hours = $derived(time.getHours());
  let minutes = $derived(time.getMinutes());

  // AM/PM
  let period = $derived(hours >= 12 ? "PM" : "AM");

  // Convert to 12-hour format
  let displayHours = $derived(hours % 12 || 12);

  // Format time as H:MM AM/PM (without leading zero for hour)
  let formattedTime = $derived(
    `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`,
  );

  // Format: Month Day, Year
  let formattedDate = $derived(
    time.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  );

  // Combined date and time
  let dateTimeDisplay = $derived(`As of ${formattedDate}, ${formattedTime}`);

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<Layout>
  <div class="p-2 flex">
    <!-- Main content -->
    <div class="w-3/5 mr-8">
      <h1 class="text-5xl mb-3 font-semibold">Statistics</h1>
      <h3 class="text-gray-500 mb-6">{dateTimeDisplay}</h3>

      <div class="grid grid-cols-2 gap-x-10 gap-y-6 mb-8">
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
    <div class="w-2/5">
      <!-- Important: tomorrow -->
    </div>
  </div>
</Layout>
