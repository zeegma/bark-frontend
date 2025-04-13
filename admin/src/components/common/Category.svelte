<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  export let mode: "add" | "edit" | "view";

  $: isDisabled = mode === "view";

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

  let selectedCategory: string = "";

  function selectCategory(category: string) {
    selectedCategory = category;
  }
</script>

<div class="w-full">
  <Button
    disabled={isDisabled}
    class="w-full bg-white border border-gray-300 text-[#1E1E1E] justify-between hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-0 "
    >{selectedCategory ? selectedCategory : "Category"}<ChevronDownOutline
      class="w-6 h-6 ms-2 text-[#1E1E1E]"
    /></Button
  >
  <Dropdown>
    {#each categoryOptions as category}
      <DropdownItem
        on:click={() => selectCategory(category)}
        disabled={isDisabled}
        aria-required
        >{category}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
