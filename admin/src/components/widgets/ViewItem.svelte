<script lang="ts">
  import DatePicker from "../common/DatePicker.svelte";
  import TimePicker from "../common/TimePicker.svelte";
  import Category from "../common/Category.svelte";
  import Status from "../common/Status.svelte";
  import { Textarea } from "flowbite-svelte";
  import { InfoCircleOutline } from "flowbite-svelte-icons";
  import type { Item } from "../../lib/types";

  export let item: Item;
  export let viewType: "list" | "grid" = "list";

  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

<button
  on:click={openModal}
  class="btn capitalize {viewType === 'grid'
    ? 'w-full px-1 m-0 text-left'
    : ''}"
>
  {#if viewType === "list"}
    <InfoCircleOutline />
  {:else}
    View
  {/if}
</button>

<!-- Modal -->
{#if showModal}
  <div
    class="overflow-y-auto fixed inset-0 z-50 flex justify-center items-center w-screen h-screen max-h-full backdrop-blur-sm bg-black/50"
  >
    <div class="bg-white rounded-2xl w-full h-[60vh] max-w-6xl shadow-md">
      <!-- Header -->
      <div
        class="flex justify-between items-center px-6 py-4 border-b border-gray-300"
      >
        <h2 class="text-2xl font-bold text-gray-800">{item.id}</h2>
        <button
          type="button"
          class="text-[#1E1E1E] bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-[#800000] hover:text-white"
          on:click={closeModal}
        >
          <svg
            class="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <!-- Form (disabled)-->
      <div class="px-6 py-4 grid grid-cols-12 gap-4">
        <!-- Item Name -->
        <div class="col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-800 mb-1"
            >Item Name</label
          >
          <input
            type="text"
            value={item.name}
            disabled
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50"
          />
        </div>

        <!-- Status -->
        <div class="col-span-2">
          <label
            for="status"
            class="block text-sm font-medium text-gray-800 mb-1">Status</label
          >
          <Status selectedStatus={item.status} disabled={true} />
        </div>

        <!-- Category -->
        <div class="col-span-3">
          <label
            for="category"
            class="block text-sm font-medium text-gray-800 mb-1">Category</label
          >
          <Category selectedCategory={item.category} disabled={true} />
        </div>

        <!-- Claimant -->
        <div class="col-span-2">
          <label
            for="claimant"
            class="block text-sm font-medium text-gray-800 mb-1">Claimant</label
          >
          <input
            value={item.claimant}
            type="text"
            disabled
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
          />
        </div>

        <!-- Image -->
        <div class="col-span-3 row-span-3">
          <label
            for="image"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]">Image</label
          >
          <div
            class="border border-gray-300 rounded h-full flex items-center justify-center bg-gray-50 p-2"
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

        <!-- Description -->
        <div class="col-span-9">
          <label
            for="description"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Description</label
          >
          <Textarea
            value={item.description}
            id="description-view"
            rows={4}
            disabled
            class="bg-gray-50 cursor-not-allowed"
          />
        </div>

        <!-- Date Lost -->
        <div class="col-span-3">
          <label
            for="dateLost"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Date Lost</label
          >
          <DatePicker
            selectedDate={new Date(item.date_found)}
            disabled={true}
          />
        </div>

        <!-- Time Lost -->
        <div class="col-span-2">
          <label
            for="timeLost"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Time Lost</label
          >
          <TimePicker selectedTime={item.time_found} disabled={true} />
        </div>

        <!-- Last Known Location -->
        <div class="col-span-4">
          <label
            for="lastKnownLocation"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Last Known Location</label
          >
          <input
            value={item.location_found}
            type="text"
            disabled
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  </div>
{/if}
