<script>
  import { Button } from "flowbite-svelte";
  import {
    CreditCardSolid,
    BriefcaseSolid,
    ComputerSpeakerOutline,
    ApiKeyOutline,
    ArchiveSolid,
  } from "flowbite-svelte-icons";

  // Quick filters data
  const quickFilters = [
    { name: "IDs & Cards", icon: "card" },
    { name: "Bags", icon: "bag" },
    { name: "Electronics", icon: "computer" },
    { name: "Keys", icon: "key" },
    { name: "Misc", icon: "archive" },
  ];
</script>

{#each quickFilters as filter}
  <div class="flex flex-col items-center justify-center w-1/5">
    <Button
      color="red"
      class="bg-[#800000] hover:bg-[#600303] rounded-xl w-full flex items-center justify-center p-0"
    >
      {#if filter.icon === "card"}
        <CreditCardSolid class="w-12 h-12 my-4" />
      {:else if filter.icon === "bag"}
        <BriefcaseSolid class="w-12 h-12 my-4" />
      {:else if filter.icon === "computer"}
        <ComputerSpeakerOutline class="w-12 h-12 my-4" />
      {:else if filter.icon === "key"}
        <ApiKeyOutline class="w-12 h-12 my-4" />
      {:else if filter.icon === "archive"}
        <ArchiveSolid class="w-12 h-12 my-4" />
      {/if}
    </Button>
    <span class="text-sm mt-2 text-center text-gray-700">{filter.name}</span>
  </div>
{/each}
