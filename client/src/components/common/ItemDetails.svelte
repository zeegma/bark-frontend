<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";
  import { formatTime } from "../../lib/utils/timeFormatter";
  import InfoRow from "./InfoRow.svelte";

  export let item: any;
</script>

<div
  class="flex flex-col px-6 py-6 md:px-12 xl:px-16 xl:py-12 border-b-1 lg:border-r-1 border-stone-300"
>
  <div class="flex row-auto justify-between">
    <div class="flex flex-col">
      <p class="text-xs md:text-sm font-medium text-stone-400">
        {categoryOptions.find((opt) => opt.value === item.category)?.label}
      </p>
      <h1 class="text-lg md:text-xl font-medium text-stone-700">{item.name}</h1>
    </div>
    <div
      class={`grid place-content-center px-6 text-sm md:text-base font-semibold rounded-full ${
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
    class="my-6 border border-stone-300 rounded-xl object-cover w-full h-64 sm:h-96"
  />
  <div class="flex flex-col gap-4">
    <InfoRow label="Item Description" value={item.description} />
    <InfoRow
      label="Found on"
      value={`${item.date_found} at ${formatTime(item.time_found)}`}
    />
    <InfoRow label="Last Seen" value={item.location_found} />
  </div>
</div>
