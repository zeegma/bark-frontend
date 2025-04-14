<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  export let mode: "add" | "edit" | "view";

  $: isDisabled = mode === "view";

  // Change this const
  const claimantOptions = ["Claimant 1", "Claimant 2", "Claimant 3"];
  export let selectedClaimant: string = "";

  function selectClaimant(claimant: string) {
    selectedClaimant = claimant;
  }
</script>

<div class="col-span-2">
  {#if mode === "view"}
    <input
      type="text"
      class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
      disabled
      value={selectedClaimant}
    />
  {:else}
    <div class="w-full relative">
      <Button
        disabled={isDisabled}
        class="w-full bg-white border border-gray-300 text-[#1E1E1E] justify-between hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-0"
      >
        {selectedClaimant || "Claimant"}
        <ChevronDownOutline class="w-6 h-6 ms-2 text-[#1E1E1E]" />
      </Button>
      <Dropdown class="w-full">
        {#each claimantOptions as claimant}
          <DropdownItem
            on:click={() => selectClaimant(claimant)}
            disabled={isDisabled}
          >
            {claimant}
          </DropdownItem>
        {/each}
      </Dropdown>
    </div>
  {/if}
</div>
