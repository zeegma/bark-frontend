<script lang="ts">
  import {
    selectedCategory,
    selectedStatus,
    searchQuery,
    selectedDateRange,
  } from "../../stores/store";
  import DatePicker from "../common/DatePicker.svelte";
  import Dropdown from "../common/Dropdown.svelte";
  import SearchBar from "../common/SearchBar.svelte";
  import { categoryOptions, statusOptions } from "../../lib/constants/filters";

  export let view: string;
  let isGrid = view === "grid";

  $: {
    if (isGrid) {
      view = "grid";
    } else {
      view = "list";
    }
  }

  function setCategory(code: string) {
    selectedCategory.set(code);
  }

  function setStatus(code: string) {
    selectedStatus.set(code);
  }

  function setSearch(query: string) {
    searchQuery.set(query);
  }

  const categoryIcon = "/icons/category-icon.svg";
  const statusIcon = "/icons/status-icon.svg";
</script>

<div
  class="flex gap-4 sticky top-0 px-24 py-4 bg-white/80 backdrop-blur-md font-[Poppins]"
>
  <!-- Dropdown Filter by Category -->
  <Dropdown
    label="All Categories"
    options={categoryOptions}
    selectedValue={$selectedCategory}
    onSelect={setCategory}
    icon={categoryIcon}
  />

  <!-- Dropdown Filter by Status -->
  <Dropdown
    label="All Statuses"
    options={statusOptions}
    selectedValue={$selectedStatus}
    onSelect={setStatus}
    icon={statusIcon}
  />

  <!-- Date Range Picker -->
  <DatePicker value={$selectedDateRange} />

  <!-- Search Input -->
  <SearchBar
    placeholder="Search for keys, bags, etc."
    value={$searchQuery}
    onInput={setSearch}
  />

  <!-- View Toggle -->
  <div class="flex border border-stone-300 rounded-lg overflow-hidden">
    <!-- Grid Button -->
    <button
      class={`flex items-center gap-2 px-6 py- hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer ${isGrid ? "bg-red-100 text-white" : "bg-white"}`}
      on:click={() => (isGrid = true)}
    >
      <img src="/icons/grid-icon.svg" alt="Grid View" class="w-5 h-5" />
    </button>

    <!-- List Button -->
    <button
      class={`flex items-center gap-2 px-6 py-2 hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer ${!isGrid ? "bg-red-100 text-white" : "bg-white"}`}
      on:click={() => (isGrid = false)}
    >
      <img src="/icons/list-icon.svg" alt="List View" class="w-4 h-4" />
    </button>
  </div>
</div>
