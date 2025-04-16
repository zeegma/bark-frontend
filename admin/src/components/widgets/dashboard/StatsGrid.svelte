<script lang="ts">
  import {
    ChartMixedOutline,
    SearchOutline,
    CheckCircleOutline,
    ExclamationCircleOutline,
  } from "flowbite-svelte-icons";

  // Statistics data (placeholder before api)
  const cardTitles = [
    { name: "Total", value: "88", icon: "chart", color: "bg-blue-200" },
    { name: "Lost", value: "53", icon: "search", color: "bg-red-200" },
    { name: "Claimed", value: "27", icon: "check", color: "bg-green-200" },
    { name: "Expired", value: "08", icon: "warn", color: "bg-orange-200" },
  ];
</script>

{#each cardTitles as card}
  <div
    class="bg-gray-50 rounded-xl p-6 flex justify-between items-cente hover:bg-gray-100"
  >
    <div>
      <div class="text-5xl font-semibold text-gray-900">
        {card.value}
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
