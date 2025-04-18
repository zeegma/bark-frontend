<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { fetchClaimants, fetchClaimantById } from "../../lib/api";
  import type { ClaimantResponse } from "../../lib/types";

  export let selectedClaimant: number;
  let claimantOptions: ClaimantResponse[] = [];

  function selectClaimant(claimant: ClaimantResponse) {
    selectedClaimant = claimant.id;
  }

  onMount(async () => {
    try {
      const data = await fetchClaimants();
      claimantOptions = data;
    } catch (error) {
      console.error("Failed to load claimants", error);
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
      {#each claimantOptions as claimant}
        <DropdownItem on:click={() => selectClaimant(claimant)}>
          {claimant.id}
        </DropdownItem>
      {/each}
    </Dropdown>
  </div>
</div>
