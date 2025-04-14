<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  export let mode: "add" | "edit" | "view";

  $: isDisabled = mode === "view";

  const statusOptions = ["Unclaimed", "Claimed"];

  export let selectedStatus: string = "";

  function selectStatus(status: string) {
    selectedStatus = status;
  }
</script>

<div class="w-full">
  <Button
    disabled={isDisabled}
    class="w-full bg-white border border-gray-300 text-[#1E1E1E] justify-between hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-0 "
    >{selectedStatus ? selectedStatus : "Status"}<ChevronDownOutline
      class="w-6 h-6 ms-2 text-[#1E1E1E]"
    /></Button
  >
  <Dropdown>
    {#each statusOptions as status}
      <DropdownItem
        on:click={() => selectStatus(status)}
        disabled={isDisabled}
        aria-required
        >{status}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
