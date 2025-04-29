<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";
  import { formatTime } from "../../lib/utils/timeFormatter";
  import Tooltip from "../common/Tooltip.svelte";
  export let items: any[];
</script>

<section class=" border px-4 md:px-8 rounded-2xl border-stone-300">
  <table class="min-w-full table-auto border-separate border-spacing-y-4">
    <tbody>
      {#each items as item (item.id)}
        <tr class="bg-white border border-stone-500 rounded-xl">
          <!-- Icon, Name, and Description -->
          <td class="min-w-0 max-w-48 md:max-w-34 py-0 md:py-4">
            <div class="flex items-center gap-4 pr-2 md:gap-6">
              <img
                src={categoryOptions.find((opt) => opt.value === item.category)
                  ?.icon}
                alt={item.name}
                class="w-10 h-10 md:w-14 md:h-14"
              />
              <div class="min-w-0">
                <p
                  class="text-sm md:text-base font-medium truncate text-stone-700"
                  title={item.name}
                >
                  {item.name}
                </p>
                <p
                  class="text-xs md:text-sm font-medium text-stone-400 truncate"
                  title={item.description}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </td>

          <!-- Display Status -->
          <td class="max-w-20 px-0 md:px-2 lg:px-6 text-center">
            <span
              class={`w-full px-2 py-3.5 lg:block hidden text-xs xl:text-base font-bold rounded-lg ${
                item.status === "UC"
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {item.status === "UC" ? "Unclaimed" : "Claimed"}
            </span>
          </td>

          <!-- Date and Time Found-->
          <td class="max-w-24 text-center">
            <div
              class="md:block hidden px-2 py-4 text-center text-sm xl:text-base text-stone-700 font-medium"
            >
              {item.date_found} @ {formatTime(item.time_found)}
            </div>
          </td>

          <!-- Last Seen -->
          <td class="max-w-24 text-center">
            <div
              class="md:block hidden px-2 py-4 text-center text-sm xl:text-base text-stone-700 font-medium truncate"
            >
              {item.location_found}
            </div>
          </td>

          <td>
            <div class="md:hidden flex items-center justify-center">
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
                  class="pr-2 py-2 text-stone-600 hover:text-stone-800 focus:outline-none"
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
          </td>

          <!-- Action Button -->
          <td class="max-w-16 md:max-w-16 text-end">
            {#if item.status === "UC"}
              <a
                href={`#/claim?id=${item.id}`}
                class="w-full md:min-w-0 inline-block py-3 md:py-4 text-center text-white text-xs xl:text-base whitespace-nowrap rounded-lg bg-[#800000] hover:bg-[#A73D3D] font-medium transition duration-300 ease-in-out cursor-pointer"
              >
                File Claim
              </a>
            {:else}
              <Tooltip
                position="left"
                text={`
                  <h1 class="text-xs text-white text-left font-medium">This item has already been claimed</h1>
                  <p class="text-xs/relaxed text-red-200 text-left font-light mt-3">
                    If you believe this is a mistake and the item belongs to you, 
                    contact BARK admin at <a href="mailto:email@example.com"
                    class="text-red-50 underline">pupbark@gmail.com</a> or visit BARK at the 
                    main entrance gate of PUP Main.
                  </p>
                `}
              >
                <button
                  class="justify-center w-full min-w-0 py-3 md:py-4 text-white text-xs xl:text-base font-medium rounded-lg bg-stone-800 pointer-events-none"
                  aria-disabled={true}
                >
                  Claimed
                </button>
              </Tooltip>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
