<script lang="ts">
  export let placeholder: string = "";
  export let value: string;
  export let onInput: (value: string) => void;
</script>

<div class="relative flex flex-grow min-w-0">
  <input
    type="text"
    {placeholder}
    bind:value
    on:input={(e) => onInput((e.target as HTMLInputElement).value)}
    class="pl-4 pr-12 min-w-0 border border-stone-300 rounded-lg flex-1 bg-white text-sm hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out truncate"
  />
  <img
    src="/icons/search-icon.svg"
    alt="Search Icon"
    class="absolute right-2 top-2 w-8 h-8 pointer-events-none"
  />
</div>
