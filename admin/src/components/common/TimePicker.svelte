<script lang="ts">
  export let selectedTime: string = "";
  export let mode: "add" | "edit" | "view";
  let className: string = "";

  $: isDisabled = mode === "view";

  function handleTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    selectedTime = input.value;
  }
</script>

<form class={className}>
  <div class="relative">
    <input
      type="time"
      id="time"
      bind:value={selectedTime}
      required
      on:change={handleTimeChange}
      disabled={isDisabled}
      class="border leading-none border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5 cursor-pointer focus:ring-red-500 focus:ring-2"
    />
    <div
      class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</form>
