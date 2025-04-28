<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";
  import { formatTime } from "../../lib/utils/timeFormatter";
  import Tooltip from "../common/Tooltip.svelte";
  import timeIcon from "/icons/time-icon.svg";
  import locationIcon from "/icons/location-icon.svg";

  export let items: any[];
</script>

<section class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
  {#each items as item (item.id)}
    <div
      class="p-3 md:p-4 lg:p-6 border border-stone-300 rounded-2xl bg-white hover:bg-stone-100 hover:border-stone-400 transition duration-300 ease-in-out"
    >
      <div class="flex justify-between flex-col md:flex-row">
        <!-- Item Label -->
        <div class="flex-col flex-grow min-w-0">
          <p
            class="text-base font-medium text-stone-700 truncate w-full pl-2 md:pl-0"
            title={item.name}
          >
            {item.name}
          </p>
          <p
            class="text-xs font-medium text-stone-400 truncate w-full hidden md:block"
          >
            {categoryOptions.find((opt) => opt.value === item.category)?.label}
          </p>
        </div>

        <!-- Status -->
        <div class="flex mt-2 md:mt-0">
          <div class="flex flex-grow items-center md:items-start">
            <!-- Status -->
            <div
              class={`grid place-content-center w-full md:min-w-24 h-full md:h-8 text-xs font-semibold rounded-2xl ${
                item.status === "UC"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {item.status === "UC" ? "Unclaimed" : "Claimed"}
            </div>

            <!-- 3-Dot Button (Visible on Small Screens) -->
            <div class="md:hidden">
              <Tooltip
                position="bottom"
                text={`
                  <div class="text-xs text-white font-medium">
                    <p>Found:</p>
                    <p class="font-base text-red-200">${item.date_found} at ${formatTime(item.time_found)}</p>
                    <p class="mt-2">Last Seen:</p>
                    <p class="font-base text-red-200">${item.location_found}</p>
                  </div>
                `}
              >
                <button
                  class="pl-1 py-2 text-stone-600 hover:text-stone-800 focus:outline-none"
                  aria-label="Show more details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <img
        src={item.photo_url}
        alt={item.name}
        title={item.description}
        class="object-cover w-full h-48 my-3 md:my-5 border border-stone-200 rounded-xl"
      />

      <!-- Date and Time Found -->
      <div
        class="items-center gap-2 mb-2 text-xs font-medium text-stone-600 md:flex hidden"
      >
        <img src={timeIcon} alt="Location Icon" class="w-4 h-4 md:w-5 md:h-5" />
        <p class="font-semibold text-stone-500">Found on</p>
        <p class="font-medium text-stone-500 md:text-stone-400">
          {item.date_found} at {formatTime(item.time_found)}
        </p>
      </div>

      <!-- Last Seen -->
      <div
        class="items-center gap-2 mb-5 text-xs font-medium text-stone-600 md:flex hidden"
      >
        <img
          src={locationIcon}
          alt="Location Icon"
          class="w-4 h-4 md:w-5 md:h-5"
        />
        <p class="font-semibold text-stone-500 hidden md:block">Last Seen</p>
        <p class="font-medium text-stone-500 md:text-stone-400">
          {item.location_found}
        </p>
      </div>
      <!-- Action Button -->
      <div class="">
        {#if item.status === "UC"}
          <a
            href={`#/claim?id=${item.id}`}
            class="flex justify-center px-4 py-3 text-white text-sm md:text-base font-medium rounded-lg bg-[#800000] hover:bg-[#A73D3D] transition duration-300 ease-in-out cursor-pointer"
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
                please contact BARK admin at <a href="mailto:email@example.com"
                class="text-red-50 underline">pupbark@gmail.com</a> or visit BARK at the 
                main entrance gate of PUP Main.
              </p>
            `}
          >
            <button
              class="flex justify-center w-full px-4 py-3 text-white text-sm md:text-base font-medium rounded-lg bg-stone-800 pointer-events-none"
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
