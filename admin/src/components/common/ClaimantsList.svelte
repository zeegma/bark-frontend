<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { fetchClaimants, fetchClaimantById } from "../../lib/api";
  import type { ClaimantResponse, Item } from "../../lib/types";

  export let selectedClaimant: number;
  export let itemId: string;
  let claimantOptions: ClaimantResponse[] = [];

  function selectClaimant(claimant: ClaimantResponse) {
    selectedClaimant = claimant.id;
  }

  onMount(async () => {
    try {
      // Fetch all claimants
      const allClaimants = await fetchClaimants();
      console.log("All claimants:", allClaimants);
      // Filter claimants to only those who claimed the current item
      claimantOptions = allClaimants.filter(
        (claimant) =>
          claimant.item_id === parseInt(itemId) ||
          claimant.item_id.toString() === itemId,
      );
      console.log("Filtered claimants for item", itemId, ":", claimantOptions);
    } catch (error) {
      console.error(`Failed to load claimants for item #${itemId}:`, error);
    }
  });
</script>

<div class="col-span-2">
  <div class="w-full relative">
    <Button
      class="w-full bg-white border border-gray-300 text-[#1E1E1E] justify-between hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-0"
    >
      {selectedClaimant || "Claimant"}
      <ChevronDownOutline class="w-6 h-6 ms-2 text-[#1E1E1E]" />
    </Button>
    <Dropdown class="w-full">
      {#if claimantOptions.length > 0}
        {#each claimantOptions as claimant}
          <DropdownItem on:click={() => selectClaimant(claimant)}>
            {claimant.id}
          </DropdownItem>
        {/each}
      {:else}
        <DropdownItem>No Claim</DropdownItem>
      {/if}
    </Dropdown>
  </div>
</div>
