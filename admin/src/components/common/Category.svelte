<script lang="ts">
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import {
    categoryOptions,
    reverseCategoryMap,
  } from "../../stores/filterStore";

  export let selectedCategory: string = "";
  export let disabled: boolean = false; // To disable it for View Item

  function selectCategory(category: string) {
    selectedCategory = category;
  }

  function formatCategoryKey(key: string): string {
    if (!key) return "";
    return key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/&/g, "&")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\s+&\s+/g, " & ");
  }

  $: displayCategory = selectedCategory
    ? formatCategoryKey(
        reverseCategoryMap[selectedCategory] ?? selectedCategory,
      )
    : "Category";

  const filteredCategoryOptions = categoryOptions.filter(
    (category) => category !== "All",
  );
</script>

<div class="w-full">
  <Button
    class="w-full bg-white border border-gray-300 text-[#1E1E1E] justify-between hover:bg-white hover:border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-xl disabled:cursor-auto"
    {disabled}
    >{displayCategory}<ChevronDownOutline
      class="w-6 h-6 ms-2 text-[#1E1E1E]"
    /></Button
  >
  <Dropdown class="w-full max-h-48 overflow-y-auto rounded-lg">
    {#each filteredCategoryOptions as category}
      <DropdownItem on:click={() => selectCategory(category)} aria-required
        >{formatCategoryKey(category)}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
