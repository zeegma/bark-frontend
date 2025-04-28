<script lang="ts">
  import { Button, Dropdown, Radio } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import {
    filterStore,
    type StatusFilter,
    type CategoryFilter,
    categoryOptions,
    statusOptions,
    reverseCategoryMap,
    reverseStatusMap,
  } from "../../stores/filterStore";

  // Assign the status and category values from the store
  $: status = $filterStore.status;
  $: category = $filterStore.category;

  // Update status
  function updateStatus(value: StatusFilter) {
    filterStore.update((current) => ({ ...current, status: value }));
  }

  // Update category
  function updateCategory(value: CategoryFilter) {
    filterStore.update((current) => ({ ...current, category: value }));
  }

  // Label for the dropdown
  function formatLabel(value: string) {
    return value === "All" ? "All" : value;
  }
</script>

<div class="relative inline-block text-left">
  <Button
    color="light"
    class="justify-start border rounded-xl h-11 focus:ring-2 focus:ring-red-600 focus:border-gray whitespace-nowrap"
  >
    Filter: {formatLabel(status)}, {formatLabel(category)}
    <ChevronDownOutline class="w-5 h-5 ms-2 text-gray-600" />
  </Button>

  <Dropdown placement="bottom-start" class="w-72 p-3 shadow-lg z-20">
    <!-- Filter by Status -->
    <div class="pb-2 px-2 mb-2 border-b border-gray-200">
      <h6 class="mb-2 text-sm font-medium text-gray-900">Filter by Status</h6>
      <ul class="space-y-2">
        {#each statusOptions as stat}
          <li class="pl-2">
            <Radio
              name="status"
              color="red"
              value={stat}
              checked={status === stat}
              on:change={() => updateStatus(stat)}
            >
              {stat}
            </Radio>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Filter by Category 
    TODO: Limit the view, use scrollbar
    -->
    <div class="max-h-60 overflow-y-auto p-2">
      <h6 class="mb-2 text-sm font-medium text-gray-900">Filter by Category</h6>
      <ul class="space-y-2">
        {#each categoryOptions as cat}
          <li class="pl-2">
            <Radio
              color="red"
              name="category"
              value={cat}
              checked={category === cat}
              on:change={() => updateCategory(cat)}
            >
              {cat}
            </Radio>
          </li>
        {/each}
      </ul>
    </div>
  </Dropdown>
</div>
