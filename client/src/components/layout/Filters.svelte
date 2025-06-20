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
  import SidePanel from "../common/SidePanel.svelte";

  export let view: string;
  let isGrid = view === "grid";
  let isSticked = false;
  let stickyDiv: HTMLElement;
  let showSidePanel = false;
  let windowWidth: number =
    typeof window !== "undefined" ? window.innerWidth : 1024;

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

  function toggleView() {
    isGrid = !isGrid;
  }

  function toggleSidePanel() {
    showSidePanel = !showSidePanel;
  }

  function closeSidePanel() {
    showSidePanel = false;
  }

  function updateWindowWidth() {
    windowWidth = window.innerWidth;
  }

  // Function to check div if sticked
  function updateShadow() {
    if (!stickyDiv) return;
    const rect = stickyDiv.getBoundingClientRect();
    isSticked = rect.top === 0;
  }

  // Add scroll and resize listeners
  onMount(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", updateShadow);
    window.addEventListener("resize", updateShadow);
    window.addEventListener("resize", updateWindowWidth);
    updateShadow();
    updateWindowWidth();
    return () => {
      window.removeEventListener("scroll", updateShadow);
      window.removeEventListener("resize", updateShadow);
      window.removeEventListener("resize", updateWindowWidth);
    };
  });

  const categoryIcon = "/icons/category-icon.svg";
  const statusIcon = "/icons/status-icon.svg";
  const filterIcon = "/icons/filter-icon.svg";
</script>

<div
  bind:this={stickyDiv}
  class={`flex z-20 gap-2 md:gap-4 sticky top-0 px-2 md:px-12 xl:px-24 py-4 bg-white font-[Poppins] transition-shadow duration-300 ${
    isSticked ? "shadow-xl" : ""
  }`}
>
  {#if windowWidth < 768}
    <!-- Side Panel Button -->
    <button
      on:click={toggleSidePanel}
      class="flex items-center gap-2 h-[48px] px-4 border border-stone-300 rounded-lg bg-white hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer"
    >
      <img src={filterIcon} class="min-w-5 h-5" alt="Filters" />
    </button>

    <!-- Search Bar -->
    <SearchBar
      placeholder="Search..."
      value={$searchQuery}
      onInput={setSearch}
    />

    <!-- Condensed View Toggle -->
    <button
      on:click={toggleView}
      class="flex items-center justify-center h-[48px] min-w-[48px] px-2 border border-stone-300 rounded-lg bg-white hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={isGrid ? "/icons/grid-icon.svg" : "/icons/list-icon.svg"}
        alt={isGrid ? "Grid View" : "List View"}
        class={isGrid ? "min-w-5 h-5" : "w-4 h-4"}
      />
    </button>
  {:else}
    <!--  -->
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

    <!-- Search Bar -->
    <SearchBar
      placeholder="Search for keys, bags, etc."
      value={$searchQuery}
      onInput={setSearch}
    />

    <!-- View Toggle -->
    <div class="flex border border-stone-300 rounded-lg min-w-26 overflow-hidden">
      <!-- Grid Button -->
      <button
        class={`flex items-center gap-2 px-4 xl:px-6 py-2 hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer ${isGrid ? "bg-red-100 text-white" : "bg-white"}`}
        on:click={() => (isGrid = true)}
      >
        <img src="/icons/grid-icon.svg" alt="Grid View" class="min-w-5 min-h-5" />
      </button>

      <!-- List Button -->
      <button
        class={`flex items-center gap-2 px-4 xl:px-6 py-2 hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer ${!isGrid ? "bg-red-100 text-white" : "bg-white"}`}
        on:click={() => (isGrid = false)}
      >
        <img src="/icons/list-icon.svg" alt="List View" class="min-w-4 min-h-4" />
      </button>
    </div>
  {/if}
</div>

<SidePanel isOpen={showSidePanel} closePanel={closeSidePanel} />
<div
  class="fixed inset-0 z-20 bg-black transition-opacity duration-300 ease-in-out"
  class:opacity-50={showSidePanel}
  class:opacity-0={!showSidePanel}
  class:pointer-events-auto={showSidePanel}
  class:pointer-events-none={!showSidePanel}
  on:click={closeSidePanel}
  aria-hidden="true"
></div>
