<script lang="ts">
  import { Datepicker } from "flowbite-svelte";

  export let disabled: boolean = false;

  export let value: Date | null = null;

  export let selectedDate: Date | null = value;
  let lastAction: string = "";

  $: selectedDate = value;

  function handleClear(): void {
    lastAction = "Cleared";
    selectedDate = null;
  }

  function handleApply(event: CustomEvent<Date>): void {
    lastAction = "Applied";
    selectedDate = event.detail;
  }
</script>

<div class="w-full">
  <Datepicker
    bind:value={selectedDate}
    on:clear={handleClear}
    on:apply={handleApply}
    {disabled}
    color="red"
    showActionButtons
    placeholder="Date"
    autohide={false}
    inputClass="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-xl h-11"
  />
</div>
