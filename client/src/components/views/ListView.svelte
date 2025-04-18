<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";
  import { formatTime } from "../../lib/utils/timeFormatter";
  import Tooltip from "../common/Tooltip.svelte";
  export let items: any[];
</script>

<section class="overflow-x-auto border px-8 rounded-2xl border-stone-300">
  <table class="min-w-full table-auto border-separate border-spacing-y-3">
    <tbody>
      {#each items as item (item.id)}
        <tr class="bg-white border border-stone-500 rounded-xl">
          <!-- Icon, Name, and Description -->
          <td class="max-w-34 py-4">
            <div class="flex items-center gap-6 max-w-240">
              <img
                src={categoryOptions.find((opt) => opt.value === item.category)
                  ?.icon}
                alt={item.name}
                class="w-14 h-14"
              />
              <div class="min-w-0">
                <p
                  class="text-base font-medium truncate text-stone-700"
                  title={item.name}
                >
                  {item.name}
                </p>
                <p
                  class="text-sm font-medium text-stone-400 truncate"
                  title={item.description}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </td>

          <!-- Display Status -->
          <td class="max-w-24 text-center">
            <span
              class={`min-w-42 py-3.5 inline-block text-sm font-bold rounded-lg ${
                item.status === "UC"
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {item.status === "UC" ? "Unclaimed" : "Claimed"}
            </span>
          </td>

          <!-- Date and Time Found-->
          <td
            class="max-w-24 px-2 py-4 text-base text-center text-stone-700 font-medium"
          >
            {item.date_found} @ {formatTime(item.time_found)}
          </td>

          <!-- Last Seen -->
          <td
            class="max-w-24 px-2 py-4 text-center text-base text-stone-700 font-medium truncate"
            title={item.location_found}
          >
            {item.location_found}
          </td>

          <!-- Action Button -->
          <td class="max-w-24 text-end">
            {#if item.status === "UC"}
              <a
                href={`#/claim?id=${item.id}`}
                class="min-w-48 inline-block py-4 text-center text-white rounded-lg text-base bg-[#800000] hover:bg-[#A73D3D] font-medium transition duration-300 ease-in-out cursor-pointer"
              >
                File A Claim
              </a>
            {:else}
              <Tooltip
                position="left"
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
                  class="justify-center min-w-48 py-4 text-white font-medium rounded-lg bg-stone-800 pointer-events-none"
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
