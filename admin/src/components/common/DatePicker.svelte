<script lang="ts">
  import { Datepicker } from "flowbite-svelte";

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

<div class="relative w-1/4">
  <Datepicker
    bind:value={selectedDate}
    on:clear={handleClear}
    on:apply={handleApply}
    color="red"
    showActionButtons
    placeholder="Date"
    autohide={false}
    inputClass="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-xl h-11"
  />
</div>
