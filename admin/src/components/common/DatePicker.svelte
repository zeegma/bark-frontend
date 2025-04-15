<script lang="ts">
  import { Datepicker } from "flowbite-svelte";

  export let selectedDate: Date | null = null;
  export let disabled: boolean = false;
  let className = "";
  let lastAction: string = "";

  function handleClear(): void {
    lastAction = "Cleared";
    selectedDate = null;
  }

  function handleApply(event: CustomEvent<Date>): void {
    lastAction = "Applied";
    selectedDate = event.detail;
  }
</script>

<div class={`relative ${className}`}>
  <Datepicker
    bind:value={selectedDate}
    on:clear={handleClear}
    on:apply={handleApply}
    {disabled}
    color="red"
    showActionButtons
    placeholder="Date"
    autohide={false}
    inputClass={`border border-gray-300 bg-white text-gray-700 rounded-xl h-11 ${disabled ? "opacity-50" : "hover:bg-gray-100"}`}
  />
</div>
