<script lang="ts">
  import {
    selectedCategory,
    selectedStatus,
    searchQuery,
    selectedDateRange,
  } from "../../stores/store";
  import { categoryOptions, statusOptions } from "../../lib/constants/filters";
  import { onMount } from "svelte";
  import DatePicker from "../common/DatePicker.svelte";
  import Dropdown from "../common/Dropdown.svelte";
  import SearchBar from "../common/SearchBar.svelte";

  export let view: string;
  let isGrid = view === "grid";
  let isSticked = false;
  let stickyDiv: HTMLElement;

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

  // Function to check div if sticked
  function updateShadow() {
    if (!stickyDiv) return;
    const rect = stickyDiv.getBoundingClientRect();
    isSticked = rect.top === 0;
  }

  // Add scroll and resize listeners
  onMount(() => {
    window.addEventListener("scroll", updateShadow);
    window.addEventListener("resize", updateShadow);

    updateShadow();
    return () => {
      window.removeEventListener("scroll", updateShadow);
      window.removeEventListener("resize", updateShadow);
    };
  });
</script>

<div
  bind:this={stickyDiv}
  class={`flex z-20 gap-4 sticky top-0 px-24 py-4 bg-white font-[Poppins] transition-shadow duration-300 ${
    isSticked ? "shadow-xl" : ""
  }`}
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
      class={`flex items-center gap-2 px-6 py-2 hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer ${isGrid ? "bg-red-100 text-white" : "bg-white"}`}
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
