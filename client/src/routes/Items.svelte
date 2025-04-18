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
  <Contents items={filteredItems} {view} />
{/if}
