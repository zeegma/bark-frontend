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

<div class="flex gap-4 sticky top-0 px-24 py-4 bg-white font-[Poppins]">
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
</div>
