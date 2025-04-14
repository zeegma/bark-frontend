<script lang="ts">
  import { selectedDateRange } from "../../stores/store";
  import { onClickOutside } from "../../lib/utils/onClickOutside";

  export let value: { startDate: Date | null; endDate: Date | null };

  let showCalendar = false;
  let currentDate = new Date();
  let selectedStartDate: Date | null = value.startDate;
  let selectedEndDate: Date | null = value.endDate;

  $: {
    selectedStartDate = value.startDate;
    selectedEndDate = value.endDate;
  }

  // Navigation between months
  function navigateMonth(direction: "prev" | "next") {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    currentDate = newDate;
  }

  type Day = { day: number; date: Date } | { day: null; date: null };

  // Gets days in the current month
  function getDaysInMonth(date: Date): Day[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: Day[] = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.unshift({
        day: prevMonthDays - i,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, date: new Date(year, month, i) });
    }

    // Next month days
    const remainingCells = 7 - (days.length % 7 || 7);
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, date: new Date(year, month + 1, i) });
    }

    return days;
  }

  // Handles day click
  function handleDayClick(day: Day) {
    if (!day.date) return;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      selectedStartDate = day.date;
      selectedEndDate = null;
    } else if (selectedStartDate && !selectedEndDate) {
      selectedEndDate = day.date;
      if (selectedStartDate > selectedEndDate) {
        [selectedStartDate, selectedEndDate] = [
          selectedEndDate,
          selectedStartDate,
        ];
      }
    }
  }

  // Applies the selected date range
  function applyDateRange() {
    if (selectedStartDate && selectedEndDate) {
      selectedDateRange.set({
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });
    }
    showCalendar = false;
  }

  // Clears the selected date range
  function clearDateRange() {
    selectedStartDate = null;
    selectedEndDate = null;
    selectedDateRange.set({ startDate: null, endDate: null });
  }

  // Formats date range
  function formatDateRange(
    startDate: Date | null,
    endDate: Date | null,
  ): string {
    if (!startDate || !endDate) return "Search by Date";
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return `${startDate.toLocaleDateString("en-US", options)} - ${endDate.toLocaleDateString("en-US", options)}`;
  }
</script>

<div class="relative" use:onClickOutside={() => (showCalendar = false)}>
  <div class="relative h-full flex max-w-64">
    <input
      type="text"
      readonly
      value={formatDateRange(selectedStartDate, selectedEndDate)}
      class="px-4 border border-stone-300 rounded-lg bg-white text-sm font-medium text-[#9A4444] hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer"
      on:click={() => (showCalendar = !showCalendar)}
    />
    <img
      src="/icons/calendar-icon.svg"
      alt="Search Icon"
      class="absolute right-4 top-[14px] w-5 h-5 pointer-events-none"
    />
  </div>

  {#if showCalendar}
    <div
      class="absolute z-10 bg-white border border-stone-300 rounded-lg mt-2 shadow-md w-76"
    >
      <!-- Month Navigation -->
      <div class="flex justify-between mx-6 mt-6 mb-4">
        <!-- Previous Button-->
        <button
          on:click={() => navigateMonth("prev")}
          class="p-2 hover:bg-stone-100 rounded-lg cursor-pointer transition duration-300 ease-in-out"
          aria-label="Previous Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 text-[#800000] hover:text-[#500000]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Current Month Display-->
        <span class="flex items-center font-medium text-sm text-[#800000]">
          {currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <!-- Next Button -->
        <button
          on:click={() => navigateMonth("next")}
          class="p-2 hover:bg-stone-100 rounded-lg cursor-pointer transition duration-300 ease-in-out"
          aria-label="Next Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 text-[#800000] hover:text-[#500000]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Calendar Grid -->
      <div class="mx-6 mb-6 grid grid-cols-7 gap-1">
        {#each ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as dayName}
          <div class="text-xs text-center text-stone-500 py-1">
            {dayName}
          </div>
        {/each}

        <!-- Cell for each days -->
        {#each getDaysInMonth(currentDate) as day}
          <button
            class={`rounded-lg py-2 w-full text-xs cursor-pointer ${
              !day.date
                ? "text-gray-400 cursor-not-allowed"
                : day.date.getMonth() !== currentDate.getMonth()
                  ? "text-gray-400 cursor-not-allowed"
                  : day.date === selectedStartDate
                    ? "bg-[#800000] text-white"
                    : day.date === selectedEndDate
                      ? "bg-[#800000] text-white"
                      : selectedStartDate &&
                          selectedEndDate &&
                          day.date >= selectedStartDate &&
                          day.date <= selectedEndDate
                        ? "bg-gray-200"
                        : "hover:bg-gray-100 transition duration-100 ease-in-out"
            }`}
            disabled={!day.date ||
              (day.date && day.date.getMonth() !== currentDate.getMonth())}
            on:click={() => handleDayClick(day)}
          >
            {day.day || ""}
          </button>
        {/each}
      </div>
      <span class="border-t-stone-200 border-t flex"></span>
      <div class="flex justify-between m-4 gap-2">
        <button
          class="flex flex-grow justify-center items-center px-3 py-2 border rounded-md bg-red-500 text-xs text-white hover:bg-red-400 transition duration-300 ease-in-out cursor-pointer"
          on:click={clearDateRange}
        >
          Clear
        </button>
        <button
          class="flex flex-grow justify-center items-center px-3 py-2 border rounded-md bg-[#800000] text-xs text-white hover:bg-[#A73D3D] transition duration-300 ease-in-out cursor-pointer"
          on:click={applyDateRange}
        >
          Apply
        </button>
      </div>
    </div>
  {/if}
</div>
