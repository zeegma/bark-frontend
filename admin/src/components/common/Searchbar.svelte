<script lang="ts">
  import { Search, Button } from "flowbite-svelte";
  import { SearchOutline } from "flowbite-svelte-icons";
  import { searchStore, searchActions } from "../../stores/searchStore";

  let searchTerm = "";

  // Subscribe to store
  searchStore.subscribe((value) => {
    searchTerm = value;
  });

  // Update store when input changes
  function handleSearch() {
    searchActions.setSearchTerm(searchTerm);
  }

  // Handle input events
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchTerm = target.value;
    handleSearch();
  }
</script>

<Search
  size="lg"
  placeholder="Search by name"
  bind:value={searchTerm}
  on:input={handleInput}
  class="h-16 rounded-2xl bg-white text-gray-500 border-gray-200 focus:ring-red-800 focus:border-red-800"
>
  <Button
    class="bg-red-800 hover:bg-red-700 w-1/8 h-full rounded-r-2xl rounded-l-none"
    on:click={handleSearch}
  >
    <SearchOutline class="w-7 h-7" />
  </Button>
</Search>
