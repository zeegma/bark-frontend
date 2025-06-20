<script lang="ts">
  import { onClickOutside } from "../../lib/utils/onClickOutside";
  import allIcon from "/icons/ct-all.svg";

  export let label: string;
  export let options: { value: string; label: string; icon?: string }[];
  export let selectedValue: string;
  export let onSelect: (value: string) => void;
  export let fullWidth: boolean = false;
  export let icon: string;
  export let expanded: boolean = false;

  let showDropdown = false;

  function selectOption(value: string) {
    onSelect(value);
    showDropdown = false;
  }
</script>

<div class="relative" use:onClickOutside={() => (showDropdown = false)}>
  {#if !expanded}
    <button
      on:click={() => (showDropdown = !showDropdown)}
      class={`flex items-center justify-between gap-2 h-[48px] px-4 lg:min-w-48 min-w-0 border border-stone-300 rounded-lg bg-white focus:border-[#9A4444] focus:border-2 hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out cursor-pointer`}
    >
      <div class="flex items-center gap-2">
        <img src={icon} class="min-w-5 min-h-5" alt="Dropdown Icon" />
        <span class="lg:block hidden text-sm font-medium text-[#9A4444] truncate">
          {selectedValue
            ? options.find((opt) => opt.value === selectedValue)?.label
            : label}
        </span>
      </div>
      <div class="lg:block hidden translate-x-2">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#9A4444"
        >
          <path d="M7 10l5 5 5-5"></path>
        </svg>
      </div>
    </button>
  {/if}

  {#if showDropdown || expanded}
    <div
      class={`${expanded ? "" : "absolute"} ${fullWidth ? "w-full" : "w-64"} z-10 py-1 ${expanded ? "" : "mt-2"} bg-white border border-stone-300 rounded-lg shadow`}
    >
      <!-- All Options -->
      <button
        class={`w-full flex items-center gap-3 px-[14px] py-[10px] hover:bg-gray-100 text-sm text-left text-stone-600 cursor-pointer ${
          selectedValue === "" ? "bg-gray-100" : ""
        }`}
        on:click={() => selectOption("")}
      >
        <img src={allIcon} alt="All" class="w-5 h-5" />
        {label}
      </button>

      <!-- Options List -->
      {#each options as opt}
        <button
          class={`w-full flex items-center gap-3 px-[14px] py-[10px] hover:bg-gray-100 text-sm text-left text-stone-600 cursor-pointer ${
            selectedValue === opt.value ? "bg-gray-100" : ""
          }`}
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
