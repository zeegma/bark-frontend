<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { statusOptions, reverseStatusMap } from "../../stores/filterStore";

  export let selectedStatus: string = "";
  export let disabled: boolean = false; // To disable it for View Item

  function selectStatus(status: string) {
    selectedStatus = status;
  }

  function getFullStatus(status: string) {
    return reverseStatusMap[status] || status; // Fallback to status if not found
  }
</script>

<div class="w-full">
  <Button
    class="w-full bg-white border border-gray-300 text-gray-800 justify-between hover:bg-white hover:border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-xl"
    {disabled}
    color="red"
  >
    {selectedStatus ? getFullStatus(selectedStatus) : "Status"}
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
