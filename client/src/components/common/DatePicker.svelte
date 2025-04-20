<script lang="ts">
  import { selectedDateRange } from "../../stores/store";
  import { onClickOutside } from "../../lib/utils/onClickOutside";

  export let value: { startDate: Date | null; endDate: Date | null };
  export let fullWidth: boolean = false;

  let showCalendar = false;
  let currentDate = new Date();
  let selectedStartDate: Date | null = value.startDate;
  let selectedEndDate: Date | null = value.endDate;
  let hoveredDate: Date | null = null;

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
    if (selectedStartDate && !selectedEndDate) {
      selectedEndDate = selectedStartDate;
    }

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

  // Helper function to check if a date is today
  function isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
</script>

<div
  class={`relative ${fullWidth ? "w-full" : "min-w-48"}`}
  use:onClickOutside={() => (showCalendar = false)}
>
  <div class={`relative h-full flex ${fullWidth ? "w-full" : "min-w-48"}`}>
    <input
      type="text"
      readonly
      value={formatDateRange(selectedStartDate, selectedEndDate)}
      class={`px-4 border border-stone-300 rounded-lg bg-white text-sm font-medium text-[#9A4444] hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer w-full
      }`}
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
      class={`absolute z-10 bg-white border border-stone-300 rounded-lg mt-2 shadow-md w-82`}
    >
      <!-- Month Navigation -->
      <div class="flex justify-between mx-6 mt-6 mb-4">
        <!-- Previous Button-->
        <button
          on:click={() => navigateMonth("prev")}
          class="p-2 bg-[#800000] hover:bg-[#A73D3D] rounded-lg cursor-pointer transition duration-300 ease-in-out"
          aria-label="Previous Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 text-white"
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
        <span class="flex items-center font-bold text-md text-[#800000]">
          {currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <!-- Next Button -->
        <button
          on:click={() => navigateMonth("next")}
          class="p-2 bg-[#800000] hover:bg-[#A73D3D] rounded-lg cursor-pointer transition duration-300 ease-in-out"
          aria-label="Next Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 text-white"
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
      <div class="mx-6 mb-4 grid grid-cols-7 gap-1">
        {#each ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as dayName}
          <div class="text-sm text-center text-stone-500 py-1">
            {dayName}
          </div>
        {/each}

        <!-- Cell for each days -->
        {#each getDaysInMonth(currentDate) as day}
          <div class="relative">
            <button
              class={`rounded-lg py-2 w-full text-sm cursor-pointer ${
                !day.date
                  ? "text-gray-400 cursor-not-allowed"
                  : day.date.getMonth() !== currentDate.getMonth()
                    ? "text-gray-400 cursor-not-allowed"
                    : day.date === selectedStartDate
                      ? "bg-[#800000] text-white"
                      : day.date === selectedEndDate
                        ? "bg-[#800000] text-white"
                        : selectedStartDate &&
                            !selectedEndDate &&
                            ((hoveredDate &&
                              day.date >= selectedStartDate &&
                              day.date <= hoveredDate) ||
                              (hoveredDate &&
                                day.date <= selectedStartDate &&
                                day.date >= hoveredDate))
                          ? "bg-red-100"
                          : selectedStartDate &&
                              selectedEndDate &&
                              day.date >= selectedStartDate &&
                              day.date <= selectedEndDate
                            ? "bg-red-100"
                            : isToday(day.date)
                              ? "text-[#800000] font-bold hover:bg-red-100 transition duration-100 ease-in-out"
                              : "hover:bg-red-100 transition duration-100 ease-in-out"
              }`}
              disabled={!day.date ||
                (day.date && day.date.getMonth() !== currentDate.getMonth())}
              on:click={() => handleDayClick(day)}
              on:mouseenter={() =>
                (hoveredDate =
                  selectedStartDate && !selectedEndDate ? day.date : null)}
              on:mouseleave={() => (hoveredDate = null)}
            >
              {day.day || ""}
            </button>
            <!--  Current day indicator -->
            {#if day.date && isToday(day.date)}
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 text-[8px] text-[#800000]"
              >
                ●
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <span class="border-t-stone-200 border-t flex"></span>
      <div class="flex justify-between m-4 gap-3">
        <button
          class="flex flex-grow justify-center items-center px-3 py-3 rounded-lg bg-stone-100 text-sm text-[#800000] font-semibold hover:bg-red-100 transition duration-300 ease-in-out cursor-pointer"
          on:click={clearDateRange}
        >
          Clear
        </button>
        <button
          class="flex flex-grow justify-center items-center px-3 py-3 border rounded-lg bg-[#800000] text-sm text-white font-medium hover:bg-[#A73D3D] transition duration-300 ease-in-out cursor-pointer"
          on:click={applyDateRange}
        >
          Apply
        </button>
      </div>
    </div>
  {/if}
</div>
