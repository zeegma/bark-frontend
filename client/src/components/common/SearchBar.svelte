<script lang="ts">
  export let placeholder: string = "";
  export let value: string;
  export let onInput: (value: string) => void;
</script>

<div class="relative flex flex-grow">
  <input
    type="text"
    {placeholder}
    bind:value
    on:input={(e) => onInput((e.target as HTMLInputElement).value)}
    class="px-4 border border-stone-300 rounded-lg flex-1 bg-white text-sm"
  />
  <img
    src="/icons/search-icon.svg"
    alt="Search Icon"
    class="absolute right-2 top-2 w-8 h-8 pointer-events-none"
  />
</div>
