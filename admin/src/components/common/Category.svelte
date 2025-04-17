<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";

  // Category List (Can be stored in store)
  const categoryOptions = [
    "Bags & Backpacks",
    "Electronics",
    "Eyewear",
    "Footwear",
    "IDs & Cards",
    "Keys",
    "Miscellaneous",
    "Mobile Devices",
    "Wallets & Purses",
    "Watches & Jewelries",
  ];

  export let selectedCategory: string = "";
  export let disabled: boolean = false; // To disable it for View Item

  function selectCategory(category: string) {
    selectedCategory = category;
  }
</script>

<div class="w-full">
  <Button
    class="w-full bg-white border border-gray-300 text-gray-400 justify-between hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-0 rounded-xl"
    {disabled}
    >{selectedCategory ? selectedCategory : "Category"}<ChevronDownOutline
      class="w-6 h-6 ms-2 text-[#1E1E1E]"
    /></Button
  >
  <Dropdown>
    {#each categoryOptions as category}
      <DropdownItem on:click={() => selectCategory(category)} aria-required
        >{category}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
