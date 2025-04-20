<script lang="ts">
  import {
    selectedCategory,
    selectedStatus,
    selectedDateRange,
  } from "../../stores/store";
  import { categoryOptions, statusOptions } from "../../lib/constants/filters";
  import DatePicker from "../common/DatePicker.svelte";
  import Dropdown from "../common/Dropdown.svelte";

  export let isOpen: boolean;
  export let closePanel: () => void;

  const categoryIcon = "/icons/category-icon.svg";
  const statusIcon = "/icons/status-icon.svg";

  function setCategory(code: string) {
    selectedCategory.set(code);
  }

  function setStatus(code: string) {
    selectedStatus.set(code);
  }
</script>

<div
  class={`fixed inset-0 z-30 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out font-[Poppins]`}
>
  <button
    type="button"
    class="fixed inset-0 opacity-0"
    on:click={closePanel}
    aria-label="Close panel"
  ></button>
  <div class="relative w-80 h-full bg-white shadow-xl overflow-y-auto">
    <div class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl text-[#9A4444] font-bold">Filter Items</h1>
        <button
          on:click={closePanel}
          class="text-[#9A4444] border bg-white border-stone-300 hover:bg-stone-100 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer"
          aria-label="Close panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <span class="flex flex-grow border-t-1 mb-6 border-stone-300"></span>
      <div class="flex flex-col gap-6">
        <!-- Category Filter -->
        <div>
          <h3 class="text-md font-semibold text-stone-700 mb-2">Category</h3>
          <Dropdown
            label="All Categories"
            options={categoryOptions}
            selectedValue={$selectedCategory}
            onSelect={setCategory}
            icon={categoryIcon}
            fullWidth={true}
            expanded={true}
          />
        </div>

        <!-- Status Filter -->
        <div>
          <h3 class="text-md font-semibold text-stone-700 mb-2">Status</h3>
          <Dropdown
            label="All Statuses"
            options={statusOptions}
            selectedValue={$selectedStatus}
            onSelect={setStatus}
            icon={statusIcon}
            fullWidth={true}
            expanded={true}
          />
        </div>

        <!-- Date Range -->
        <div>
          <h3 class="text-md font-semibold text-stone-700 mb-2">Date Range</h3>
          <DatePicker
            value={$selectedDateRange}
            fullWidth={true}
            expanded={true}
          />
        </div>
      </div>
    </div>
  </div>
</div>
