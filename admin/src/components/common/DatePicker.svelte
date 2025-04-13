<script lang="ts">
  import { Datepicker } from "flowbite-svelte";
  export let mode: "add" | "edit" | "view";
  let className = "";

  $: isDisabled = mode === "view";

  let selectedDate: Date | null = null;
  let lastAction: string = "";

  function handleClear(): void {
    lastAction = "Cleared";
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
    color="red"
    showActionButtons
    placeholder="Date"
    autohide={false}
    disabled={isDisabled}
    inputClass="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-xl h-11"
  />
</div>
