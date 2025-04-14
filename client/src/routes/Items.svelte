<script lang="ts">
  import Header from "../components/layout/Header.svelte";
  import Filters from "../components/layout/Filters.svelte";
  import Contents from "../components/layout/Contents.svelte";
  import { mockdata } from "../lib/constants/mockdata";
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

  let rawItems: Item[] = mockdata;
  let filteredItems: Item[] = [];

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
<Filters bind:view />
<Contents items={filteredItems} {view} />
