<script lang="ts">
  import { Button, Dropdown, Radio } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import {
    sortStore,
    type SortField,
    type SortOrder,
  } from "../../stores/sortStore";

  // Local variables for tracking selected options
  let sortBy: SortField;
  let sortOrder: SortOrder;

  sortStore.subscribe((value) => {
    sortBy = value.sortBy;
    sortOrder = value.sortOrder;
  });

  function updateSortBy(value: SortField) {
    sortStore.update((current) => ({ ...current, sortBy: value }));
  }

  function updateSortOrder(value: SortOrder) {
    sortStore.update((current) => ({ ...current, sortOrder: value }));
  }

  function formatSortBy(sortBy: string) {
    const withSpaces = sortBy.replace(/([a-z])([A-Z])/g, "$1 $2");
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }
</script>

<div class="relative inline-block text-left">
  <Button
    color="light"
    class="justify-start border rounded-xl h-11 focus:ring-2 focus:ring-red-600 focus:border-gray"
  >
    Sort by: {formatSortBy(sortBy)}, {sortOrder}
    <ChevronDownOutline class="w-5 h-5 ms-2 text-gray-600" />
  </Button>

  <Dropdown placement="bottom-start" class="w-60 p-3 shadow-lg">
    <!-- Sort by field section -->
    <div class="pb-2 mb-2 border-b border-gray-200">
      <h6 class="mb-2 text-sm font-medium text-gray-900">Sort by</h6>
      <ul class="space-y-2">
        <li>
          <Radio
            color="red"
            name="sortby"
            value="name"
            checked={sortBy === "name"}
            on:change={() => updateSortBy("name")}>Name</Radio
          >
        </li>
        <li>
          <Radio
            color="red"
            name="sortby"
            value="itemRequested"
            checked={sortBy === "itemRequested"}
            on:change={() => updateSortBy("itemRequested")}>Item</Radio
          >
        </li>
        <li>
          <Radio
            color="red"
            name="sortby"
            value="facebook"
            checked={sortBy === "facebook"}
            on:change={() => updateSortBy("facebook")}>Facebook</Radio
          >
        </li>
      </ul>
    </div>

    <!-- Sort order section -->
    <div>
      <h6 class="mb-2 text-sm font-medium text-gray-900">Sort order</h6>
      <ul class="space-y-2">
        <li>
          <Radio
            color="red"
            name="sortorder"
            value="Ascending"
            checked={sortOrder === "Ascending"}
            on:change={() => updateSortOrder("Ascending")}>Ascending</Radio
          >
        </li>
        <li>
          <Radio
            color="red"
            name="sortorder"
            value="Descending"
            checked={sortOrder === "Descending"}
            on:change={() => updateSortOrder("Descending")}>Descending</Radio
          >
        </li>
      </ul>
    </div>
  </Dropdown>
</div>
