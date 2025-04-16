<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { claimsData } from "../../lib/mockData";
  import { onMount } from "svelte";

  // id from the claimsData to be displayed in the dropdown
  type Claimant = {
    id: string;
  };

  export let selectedClaimant: string = "";
  let claimantOptions: Claimant[] = [];

  // TODO: Check if this is right
  async function fetchClaimants(): Promise<Claimant[]> {
    try {
      const response = await fetch(""); // API
      if (!response.ok) {
        throw new Error(`Failed to fetch claimants: ${response.statusText}`);
      }
      return claimsData.map((claim) => ({ id: claim.id })); // Use and map claimsData from mockData for now
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function selectClaimant(claimant: Claimant) {
    selectedClaimant = claimant.id;
  }

  onMount(() => {
    fetchClaimants().then((data) => {
      claimantOptions = data;
    });
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
