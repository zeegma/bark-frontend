<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";
  import timeIcon from "/icons/time-icon.svg";
  import locationIcon from "/icons/location-icon.svg";

  export let items: any[];

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };
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
      <a
        href={item.status === "UC"
          ? `#/claim?id=${item.id}`
          : `#/appeal?id=${item.id}`}
        class="flex justify-center mt-5 px-4 py-3 text-white font-medium bg-[#800000] rounded-lg hover:bg-[#A73D3D] transition duration-300 ease-in-out cursor-pointer"
      >
        {item.status === "UC" ? "File Claim" : "Appeal Claim"}
      </a>
    </div>
  {/each}
</section>
