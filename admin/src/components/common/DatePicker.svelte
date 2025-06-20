<script lang="ts">
  import { Datepicker } from "flowbite-svelte";

  export let disabled: boolean = false;
  export let value: Date | null = null;
  export let selectedDate: Date | null = value;
  export let ranged: boolean = false;

  // Optional injection of actions
  export let setDateRange:
    | ((start: Date | null, end: Date | null) => void)
    | null = null;
  export let clearDateFilter: (() => void) | null = null;

  let lastAction: string = "";
  let dateRange = { from: null, to: null };

  $: selectedDate = value;

  function handleClear(): void {
    lastAction = "Cleared";
    selectedDate = null;
    clearDateFilter?.();
  }

  function handleApply(event: CustomEvent<Date>): void {
    lastAction = "Applied";
    selectedDate = event.detail;

    // Do nothing if not in filter mode
    if (!setDateRange) return;

    ranged
      ? setDateRange(dateRange.from, dateRange.to)
      : setDateRange(event.detail, event.detail);
  }
</script>

<div class="w-full">
  {#if ranged}
    <Datepicker
      range
      bind:rangeFrom={dateRange.from}
      bind:rangeTo={dateRange.to}
      on:clear={handleClear}
      on:apply={handleApply}
      {disabled}
      color="red"
      showActionButtons
      placeholder="Date"
      autohide={false}
      inputClass="border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 rounded-xl h-11"
    />
  {:else}
    <Datepicker
      bind:value={selectedDate}
      on:clear={handleClear}
      on:apply={handleApply}
      {disabled}
      color="red"
      showActionButtons
      placeholder="Date"
      autohide={false}
      inputClass="border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 rounded-xl h-11"
    />
  {/if}
</div>
