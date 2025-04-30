<script lang="ts">
  import { Datepicker } from "flowbite-svelte";
  import { dateFilterActions } from "../../stores/dateFilterStore";

  export let disabled: boolean = false;
  export let value: Date | null = null;
  export let selectedDate: Date | null = value;
  export let ranged: boolean = false;

  let lastAction: string = "";
  let dateRange = { from: null, to: null };

  $: selectedDate = value;

  function handleClear(): void {
    lastAction = "Cleared";
    selectedDate = null;
    dateFilterActions.clearDateFilter();
  }

  function handleApply(event: CustomEvent<Date>): void {
    lastAction = "Applied";
    selectedDate = event.detail;

    ranged
      ? dateFilterActions.setDateRange(dateRange.from, dateRange.to)
      : dateFilterActions.setDateRange(event.detail, event.detail);
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
