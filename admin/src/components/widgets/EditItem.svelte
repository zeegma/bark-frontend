<script lang="ts">
  import DatePicker from "../common/DatePicker.svelte";
  import TimePicker from "../common/TimePicker.svelte";
  import Category from "../common/Category.svelte";
  import Status from "../common/Status.svelte";
  import { Textarea } from "flowbite-svelte";
  import ClaimantsList from "../common/ClaimantsList.svelte";
  import { EditSolid } from "flowbite-svelte-icons";
  import {
    items,
    currentItem,
    createNewItem,
    itemsStore,
    type Item,
  } from "../../stores/itemStore";

  export let item: Item;
  export let onSave: (data: Item) => void;
  export let viewType: "list" | "grid" = "list";

  let showModal = false;
  let formData: Item = { ...item };

  // Ensure date is a valid Date object
  const ensureValidDate = (date: any): Date => {
    return date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  };

  formData.dateLost = ensureValidDate(formData.dateLost);

  const openModal = () => {
    console.log("Opening modal for item:", item);
    formData = { ...item }; // Reset form data when opening the modal
    formData.dateLost = ensureValidDate(formData.dateLost); // Ensure valid date
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };

  const handleSubmit = () => {
    if (formData.id) {
      // If the item already exists (has an ID), update it in the store
      itemsStore.updateItem(formData);
    } else {
      // If it's a new item, create it, merge with form data, and add to the store
      const newItem = createNewItem(itemsStore.getNextId());
      const itemToAdd = { ...newItem, ...formData };
      itemsStore.addItem(itemToAdd);
    }

    // Trigger the onSave callback to propagate the changes
    onSave(formData);
    showModal = false;
  };
</script>

<button on:click={openModal} class="btn capitalize">
  {#if viewType === "list"}
    <EditSolid />
  {:else}
    Edit
  {/if}
</button>

<!-- Modal -->
{#if showModal}
  <div
    class="overflow-y-auto fixed inset-0 z-50 flex justify-center items-center w-screen h-screen max-h-full backdrop-blur-sm bg-black/50"
  >
    <div class="bg-white rounded-2xl w-full max-w-6xl shadow-md">
      <!-- Header -->
      <div
        class="flex justify-between items-center px-6 py-4 border-b border-gray-300"
      >
        <h2 class="text-2xl font-bold text-gray-800">Edit Item</h2>
        <button
          aria-label="close"
          type="button"
          class="text-[#1E1E1E] bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-[#800000] hover:text-white cursor-pointer"
          on:click={closeModal}
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
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

      <!-- Form -->
      <form
        class="px-6 py-4 grid grid-cols-12 gap-4"
        on:submit|preventDefault={handleSubmit}
      >
        <!-- Item Name -->
        <div class="col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-800 mb-1"
            >Item Name</label
          >
          <input
            type="text"
            bind:value={formData.name}
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter item name"
          />
        </div>

        <!-- Status -->
        <div class="col-span-2">
          <label
            for="status"
            class="block text-sm font-medium text-gray-800 mb-1">Status</label
          >
          <Status bind:selectedStatus={formData.status} />
        </div>

        <!-- Category -->
        <div class="col-span-3">
          <label
            for="category"
            class="block text-sm font-medium text-gray-800 mb-1">Category</label
          >
          <Category bind:selectedCategory={formData.category} />
        </div>

        <!-- Claimant -->
        <div class="col-span-2">
          <label
            for="claimant"
            class="block text-sm font-medium text-gray-800 mb-1">Claimant</label
          >
          <ClaimantsList bind:selectedClaimant={formData.claimant} />
        </div>

        <!-- Image Upload -->
        <div class="col-span-3 row-span-3">
          <label
            for="image"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]">Image</label
          >
          <label
            class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded h-full cursor-pointer"
          >
            <input type="file" class="hidden" />
            <span class="text-4xl text-gray-400">+</span>
            <span class="text-sm mt-2">Add image</span>
          </label>
        </div>

        <!-- Description -->
        <div class="col-span-9">
          <label
            for="description"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Description</label
          >
          <Textarea
            bind:value={formData.description}
            placeholder="Description"
            rows={4}
          />
        </div>

        <!-- Date Lost -->
        <div class="col-span-3">
          <label
            for="dateLost"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Date Lost</label
          >
          <DatePicker bind:selectedDate={formData.dateLost} />
        </div>

        <!-- Time Lost -->
        <div class="col-span-2">
          <label
            for="timeLost"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Time Lost</label
          >
          <TimePicker bind:selectedTime={formData.timeLost} />
        </div>

        <!-- Last Known Location -->
        <div class="col-span-4">
          <label
            for="timeLost"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Last Known Location</label
          >
          <input
            type="text"
            bind:value={formData.lastKnownLocation}
            class="w-full p-2.5 pr-10 border border-gray-300 rounded-lg text-sm"
            placeholder="Location"
          />
        </div>

        <!-- Buttons -->
        <div class="col-span-12 flex justify-center gap-4 mt-4">
          <button
            type="button"
            on:click={closeModal}
            class="w-32 border border-red-900 text-red-900 px-6 py-2 rounded-lg hover:bg-red-900 hover:text-white"
            >Discard</button
          >
          <button
            type="submit"
            class="w-32 bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-950"
            >Save</button
          >
        </div>
      </form>
    </div>
  </div>
{/if}
