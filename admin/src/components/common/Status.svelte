<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { statusOptions } from "../../stores/filterStore";

  export let selectedStatus: string = "";
  export let disabled: boolean = false; // To disable it for View Item

  function selectStatus(status: string) {
    selectedStatus = status;
  }
</script>

<div class="w-full">
  <Button
    class="w-full bg-white border border-gray-300 text-[#1E1E1E] justify-between hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-0"
    {disabled}
  >
    {selectedStatus ? selectedStatus : "Status"}
    <ChevronDownOutline class="w-6 h-6 ms-2 text-[#1E1E1E]" />
  </Button>

  <Dropdown>
    {#each statusOptions.filter((s) => s !== "All" && s !== "Expired") as status}
      <DropdownItem on:click={() => selectStatus(status)} aria-required>
        {status}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
