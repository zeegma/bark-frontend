<script lang="ts">
  import { onClickOutside } from "../../lib/utils/onClickOutside";
  import allIcon from "/icons/ct-all.svg";

  export let label: string;
  export let options: { value: string; label: string; icon?: string }[];
  export let selectedValue: string;
  export let onSelect: (value: string) => void;
  export let icon: string;

  let showDropdown = false;

  function selectOption(value: string) {
    onSelect(value);
    showDropdown = false;
  }
</script>

<div class="relative" use:onClickOutside={() => (showDropdown = false)}>
  <button
    on:click={() => (showDropdown = !showDropdown)}
    class="flex items-center justify-between gap-2 h-[48px] px-4 w-56 border border-stone-300 rounded-lg bg-white focus:border-[#9A4444] focus:border-2 "
  >
    <div class="flex items-center gap-2">
      <img src={icon} class="w-5 h-5" alt="Dropdown Icon" />
      <span class="text-sm font-medium text-[#9A4444]">
        {selectedValue
          ? options.find((opt) => opt.value === selectedValue)?.label
          : label}
      </span>
    </div>
    <div class="flex translate-x-2">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#9A4444"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <rect x="0" fill="none" width="24" height="24"></rect>
          <g>
            <path d="M7 10l5 5 5-5"></path>
          </g>
        </g>
      </svg>
    </div>
  </button>

  {#if showDropdown}
    <div
      class="absolute w-64 z-10 py-1 mt-2 bg-white border border-stone-300 rounded-lg shadow-md"
    >
      <button
        class="w-full flex items-center gap-3 px-[14px] py-[10px] hover:bg-gray-100 text-sm text-left text-stone-600"
        on:click={() => selectOption("")}
      >
        <img src={allIcon} alt="All" class="w-5 h-5" />
        {label}
      </button>
      {#each options as opt}
        <button
          class="w-full flex items-center gap-3 px-[14px] py-[10px] hover:bg-gray-100 text-sm text-left text-stone-600"
          on:click={() => selectOption(opt.value)}
        >
          {#if opt.icon}
            <img src={opt.icon} alt={opt.label} class="w-5 h-5" />
          {/if}
          {opt.label}
        </button>
      {/each}
    </div>
  {/if}
</div>
