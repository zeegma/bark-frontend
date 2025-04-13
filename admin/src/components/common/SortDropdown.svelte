<script lang="ts">
  import { Button, Dropdown, Radio } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";

  // Track selected options
  let sortBy = "Name";
  let sortOrder = "Ascending";
</script>

<div class="relative inline-block text-left">
  <Button
    color="light"
    class="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-xl"
  >
    Sort by
    <ChevronDownOutline class="w-5 h-5 ms-2 text-gray-600" />
  </Button>

  <Dropdown placement="bottom-start" class="w-56 p-3 shadow-lg">
    <!-- Sort by field section -->
    <div class="pb-2 mb-2 border-b border-gray-200">
      <h6 class="mb-2 text-sm font-medium text-gray-900">Sort by</h6>
      <ul class="space-y-2">
        <li>
          <Radio color="red" name="sortby" value="Name" bind:group={sortBy}
            >Name</Radio
          >
        </li>
        <li>
          <Radio color="red" name="sortby" value="Item" bind:group={sortBy}
            >Item</Radio
          >
        </li>
        <li>
          <Radio color="red" name="sortby" value="Facebook" bind:group={sortBy}
            >Facebook</Radio
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
            bind:group={sortOrder}>Ascending</Radio
          >
        </li>
        <li>
          <Radio
            color="red"
            name="sortorder"
            value="Descending"
            bind:group={sortOrder}>Descending</Radio
          >
        </li>
      </ul>
    </div>
  </Dropdown>
</div>
