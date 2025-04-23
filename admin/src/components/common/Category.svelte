<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { categoryOptions } from "../../stores/filterStore";

  export let selectedCategory: string = "";
  export let disabled: boolean = false; // To disable it for View Item

  function selectCategory(category: string) {
    selectedCategory = category;
  }

  const filteredCategoryOptions = categoryOptions.filter(
    (category) => category !== "All",
  );
</script>

<div class="w-full">
  <Button
    class="w-full bg-white border border-gray-300 text-gray-800 justify-between hover:bg-white hover:border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-xl"
    {disabled}
    >{selectedCategory ? selectedCategory : "Category"}<ChevronDownOutline
      class="w-6 h-6 ms-2 text-[#1E1E1E]"
    /></Button
  >
  <Dropdown>
    {#each filteredCategoryOptions as category}
      <DropdownItem on:click={() => selectCategory(category)} aria-required
        >{category}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
