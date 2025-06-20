<script lang="ts">
  import DatePicker from "../../common/DatePicker.svelte";
  import TimePicker from "../../common/TimePicker.svelte";
  import Category from "../../common/Category.svelte";
  import Status from "../../common/Status.svelte";
  import { Textarea, Modal } from "flowbite-svelte";
  import { MapPinAltSolid } from "flowbite-svelte-icons";
  import type { Item } from "../../../lib/types";

  export let item: Item;
  export let open = false;

  $: if (open) {
    console.log("Viewing item:", item);
  }

  const closeModal = () => {
    open = false;
  };
</script>

<!-- Modal -->
<Modal
  bind:open
  size="xl"
  class="bg-white rounded-2xl w-full max-w-6xl overflow-visible shadow-md"
  placement="center"
>
  <!-- Header -->
  <svelte:fragment slot="header">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">{item.id}: {item.name}</h1>
    </div>
  </svelte:fragment>

  <!-- Form (disabled)-->
  <div class="px-6 py-4 grid grid-cols-6 grid-rows-4 gap-4">
    <!-- Item Name -->
    <div class="col-span-2">
      <label for="name" class="block text-sm font-medium text-gray-800 mb-1"
        >Item Name</label
      >
      <input
        type="text"
        value={item.name}
        disabled
        class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 cursor-auto"
      />
    </div>

    <!-- Status -->
    <div class="col-span-2 col-start-1 row-start-3">
      <label for="status" class="block text-sm font-medium text-gray-800 mb-1"
        >Status</label
      >
      <Status selectedStatus={item.status} disabled={true} />
    </div>

    <!-- Category -->
    <div class="col-span-2 col-start-1 row-start-2">
      <label for="category" class="block text-sm font-medium text-gray-800 mb-1"
        >Category</label
      >
      <Category selectedCategory={item.category} disabled={true} />
    </div>

    <!-- Claimant -->
    <div class="col-start-6">
      <label for="claimant" class="block text-sm font-medium text-gray-800 mb-1"
        >Claimant</label
      >
      <input
        value={item.accepted_claim_id}
        type="text"
        disabled
        class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 cursor-auto"
      />
    </div>

    <!-- Date Picker -->
    <div class="col-start-4 row-start-1 col-span-2">
      <label for="dateLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Date Lost</label
      >
      <DatePicker value={new Date(item.date_found)} disabled={true} />
    </div>

    <!-- Description -->
    <div class="col-span-2 row-span-3 col-start-3 row-start-2">
      <label
        for="description"
        class="block text-sm font-medium text-gray-800 mb-1">Description</label
      >
      <Textarea
        value={item.description}
        id="description-view"
        rows={10}
        disabled
        class="bg-gray-50 cursor-auto"
      />
    </div>

    <!-- Time Picker -->
    <div class="col-start-3 row-start-1">
      <label for="timeLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Time Lost</label
      >
      <TimePicker selectedTime={item.time_found} disabled={true} />
    </div>

    <!-- Last Known Location -->
    <div class="col-span-2 col-start-1 row-start-4">
      <label
        for="lastKnownLocation"
        class="block text-sm font-medium text-gray-800 mb-1"
        >Last Known Location</label
      >

      <div class="relative w-full">
        <input
          value={item.location_found}
          type="text"
          disabled
          class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 cursor-auto"
        />
        <MapPinAltSolid
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>

    <!-- Image -->
    <div class="col-span-2 row-span-3 col-start-5 row-start-2">
      <label for="image" class="block mb-1 text-sm font-medium text-[#1E1E1E]"
        >Image</label
      >
      <div
        class="border border-gray-300 rounded h-[222px] flex items-center justify-center bg-gray-50 p-2"
      >
        {#if item.photo_url}
          <img
            src={item.photo_url}
            alt="Item"
            class="max-h-full max-w-full object-contain rounded"
          />
        {:else}
          <span class="text-gray-400">No image available</span>
        {/if}
      </div>
    </div>
  </div>
</Modal>
