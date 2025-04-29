<script lang="ts">
  import {
    ChartMixedOutline,
    SearchOutline,
    CheckCircleOutline,
    ExclamationCircleOutline,
  } from "flowbite-svelte-icons";
  import { Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { getDashboardStats, type DashboardStats } from "../../../lib/api";

  // Default values before API data is loaded
  let stats: DashboardStats = {
    total: 0,
    lost: 0,
    claimed: 0,
    expired: 0,
  };

  let isLoading = true;
  let error: string | null = null;

  // Card definitions
  const cardDefinitions = [
    {
      name: "Total",
      getValue: () => stats.total.toString(),
      icon: "chart",
      color: "bg-blue-200",
    },
    {
      name: "Lost",
      getValue: () => stats.lost.toString(),
      icon: "search",
      color: "bg-red-200",
    },
    {
      name: "Claimed",
      getValue: () => stats.claimed.toString(),
      icon: "check",
      color: "bg-green-200",
    },
    {
      name: "Expired",
      getValue: () => stats.expired.toString(),
      icon: "warn",
      color: "bg-orange-200",
    },
  ];

  onMount(async () => {
    try {
      stats = await getDashboardStats();
    } catch (err) {
      error =
        err instanceof Error
          ? err.message
          : "Failed to load dashboard statistics";
      console.error(error);
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <div class="flex justify-center items-center p-6 h-3/4">
    <Spinner color="red" size={20} />
  </div>
{:else}
  <div class="grid grid-cols-2 gap-x-10 gap-y-6 mb-8">
    {#each cardDefinitions as card}
      <div
        class="bg-gray-50 rounded-xl p-6 flex justify-between items-cente hover:bg-gray-100"
      >
        <div>
          <div class="text-5xl font-semibold text-gray-900">
            {card.getValue()}
          </div>
          <div class="text-base text-gray-500 mt-1">{card.name}</div>
        </div>
        <div
          class={`${card.color} rounded-full flex items-center justify-center w-16 h-16`}
        >
          {#if card.icon === "chart"}
            <ChartMixedOutline class="w-9 h-9 text-blue-500" />
          {:else if card.icon === "search"}
            <SearchOutline class="w-9 h-9 text-red-500" />
          {:else if card.icon === "check"}
            <CheckCircleOutline class="w-9 h-9 text-green-500" />
          {:else if card.icon === "warn"}
            <ExclamationCircleOutline class="w-9 h-9 text-orange-500" />
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}
