<script lang="ts">
  import Header from "../components/layout/Header.svelte";
  import Loader from "../components/common/Loader.svelte";
  import Filters from "../components/layout/Filters.svelte";
  import Contents from "../components/layout/Contents.svelte";
  import { fetchAllItems } from "../lib/api/fetch";
  import { onMount } from "svelte";
  import {
    selectedCategory,
    selectedStatus,
    searchQuery,
    selectedDateRange,
  } from "../stores/store";

  interface Item {
    id: number;
    name: string;
    description: string;
    category: string;
    date_found: string;
    time_found: string;
    location_found: string;
    photo_url: string;
    status: string;
  }

  let rawItems: Item[] = [];
  let filteredItems: Item[] = [];
  let isLoading: boolean = true;

  // Fetch all items from the backend
  onMount(async () => {
    try {
      rawItems = await fetchAllItems();
      console.log("Fetched Items:", rawItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      isLoading = false;
    }
  });

  function setToEndOfDay(date: Date): Date {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }

  $: {
    filteredItems = rawItems.filter((item) => {
      const categoryMatch =
        !$selectedCategory || item.category === $selectedCategory;
      const statusMatch = !$selectedStatus || item.status === $selectedStatus;
      const searchMatch =
        !$searchQuery ||
        item.name.toLowerCase().includes($searchQuery.toLowerCase());
      const dateMatch = (() => {
        if (!$selectedDateRange.startDate || !$selectedDateRange.endDate)
          return true;
        const itemDate = new Date(item.date_found);
        const startDate = $selectedDateRange.startDate;
        const endDate = setToEndOfDay($selectedDateRange.endDate);
        return itemDate >= startDate && itemDate <= endDate;
      })();
      return categoryMatch && statusMatch && searchMatch && dateMatch;
    });
  }

  let view: string = "grid";
</script>

<Header />
{#if isLoading}
  <Loader />
{:else}
  <Filters bind:view />
  {#if filteredItems.length === 0}
    <!-- Empty State -->
    <div class="flex flex-col items-center justify-center h-88 px-8">
      <img
        src="/icons/nobark.svg"
        alt=""
        class="w-36 sm:w-48 md:w-72 mb-6 md:mb-8"
      />
      <h1
        class="font-[Poppins] font-medium text-center text-base sm:text-xl md:text-2xl text-[#800000] mb-2 md:mb-3"
      >
        No Items Found...
      </h1>
      <p
        class="font-[Poppins] font-medium text-xs sm:text-sm md:text-md text-center text-red-400 max-w-64 md:max-w-96"
      >
        We couldn’t find anything. Try adjusting your filters or refreshing the
        page if the problem persists.
      </p>
    </div>
  {:else}
    <Contents items={filteredItems} {view} />
  {/if}
{/if}
