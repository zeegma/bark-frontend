<script lang="ts">
  export let selectedTime: string = "";
  export let disabled: boolean = false;
  let className: string = "";

  function handleTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    selectedTime = input.value;
  }
</script>

<!-- className for the width and style (Can/Should be modified)-->
<form class={className}>
  <div class="relative">
    <input
      type="time"
      id="time"
      bind:value={selectedTime}
      {disabled}
      required
      step="60"
      on:change={handleTimeChange}
      class="border leading-none border-gray-300 text-gray-700 text-sm rounded-xl block w-full p-2.5 focus:ring-red-500 focus:ring-2 ${disabled
        ? 'opacity-50'
        : 'hover:bg-gray-100 cursor-pointer'}"
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
