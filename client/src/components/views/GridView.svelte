<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";
  import { formatTime } from "../../lib/utils/timeFormatter";
  import Tooltip from "../common/Tooltip.svelte";
  import timeIcon from "/icons/time-icon.svg";
  import locationIcon from "/icons/location-icon.svg";

  export let items: any[];
</script>

<section class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
  {#each items as item (item.id)}
    <div
      class="px-6 py-6 border border-stone-300 rounded-2xl bg-white hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out"
    >
      <div class="flex justify-between">
        <!-- Item Label -->
        <div class="flex-col flex-grow min-w-0">
          <p
            class="text-base font-medium text-stone-700 truncate w-full"
            title={item.name}
          >
            {item.name}
          </p>
          <p class="text-xs font-medium text-stone-400 truncate w-full">
            {categoryOptions.find((opt) => opt.value === item.category)?.label}
          </p>
        </div>

        <!-- Display Status -->
        <div
          class={`grid place-content-center ml-4 min-w-24 h-8 text-xs font-semibold rounded-2xl ${
            item.status === "UC"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {item.status === "UC" ? "Unclaimed" : "Claimed"}
        </div>
      </div>

      <img
        src={item.photo_url}
        alt={item.name}
        title={item.description}
        class="object-cover w-full h-48 mt-5 mb-5 border border-stone-200 rounded-xl"
      />

      <!-- Date and Time Found -->
      <div
        class="flex items-center gap-2 mb-2 text-xs font-medium text-stone-600"
      >
        <img src={timeIcon} alt="Location Icon" class="w-5 h-5" />
        <p class="font-semibold text-stone-500">Found on</p>
        <p class="font-medium text-stone-400">
          {item.date_found} at {formatTime(item.time_found)}
        </p>
      </div>

      <!-- Last Seen -->
      <div class="flex items-center gap-2 text-xs font-medium text-stone-600">
        <img src={locationIcon} alt="Location Icon" class="w-5 h-5" />
        <p class="font-semibold text-stone-500">Last Seen</p>
        <p class="font-medium text-stone-400">
          {item.location_found}
        </p>
      </div>
      <!-- Action Button -->
      <div class="mt-5">
        {#if item.status === "UC"}
          <a
            href={`#/claim?id=${item.id}`}
            class="flex justify-center px-4 py-3 text-white font-medium rounded-lg bg-[#800000] hover:bg-[#A73D3D] transition duration-300 ease-in-out cursor-pointer"
          >
            File A Claim
          </a>
        {:else}
          <Tooltip
            position="top"
            text={`
              <h1 class="text-xs text-white font-medium">This item has already been claimed</h1>
              <p class="text-xs/relaxed text-red-200 font-light mt-3">
                If you believe this is a mistake and the item belongs to you, 
                contact BARK admin at <a href="mailto:email@example.com"
                class="text-red-50 underline">pupbark@gmail.com</a> or visit BARK at the 
                main entrance gate of PUP Main.
              </p>
            `}
          >
            <button
              class="md:flex justify-center w-full px-4 py-3 text-white font-medium rounded-lg bg-stone-800 pointer-events-none"
              aria-disabled={true}
            >
              Claimed
            </button>
          </Tooltip>
        {/if}
      </div>
    </div>
  {/each}
</section>
