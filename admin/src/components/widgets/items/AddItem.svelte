<script lang="ts">
  import {
    currentItem,
    createNewItem,
    itemsStore,
    triggerRefresh,
  } from "../../../stores/itemStore";
  import DatePicker from "../../common/DatePicker.svelte";
  import TimePicker from "../../common/TimePicker.svelte";
  import Category from "../../common/Category.svelte";
  import Status from "../../common/Status.svelte";
  import { Textarea, Spinner, Button, Modal, Toast } from "flowbite-svelte";
  import { MapPinAltSolid } from "flowbite-svelte-icons";
  import { addItem } from "../../../lib/api/items";
  import type { Item } from "../../../lib/types";
  import { showToast } from "../../../stores/toastStore";

  export let open = false;
  let formData: Item;
  let adding = false;
  let selectedDate: Date | null = null;

  function formatDate(date: Date | null): string {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Reset form to create a new item
  const resetForm = () => {
    const nextId = itemsStore.getNextId();
    formData = createNewItem(nextId);
  };

  // Open modal for adding item
  $: if (open) {
    resetForm();
  }

  // Close the modal
  const closeModal = () => {
    open = false;
    triggerRefresh();
  };

  // Submit the form data
  const handleSubmit = async () => {
    adding = true;
    formData.date_found = formatDate(selectedDate ?? new Date());
    try {
      if (!formData.name?.trim()) throw new Error("Item name is required");
      if (!formData.status?.trim()) throw new Error("Status is required");
      if (!formData.category?.trim()) throw new Error("Category is required");
      if (!selectedDate) throw new Error("Date lost is required");
      if (!formData.time_found?.trim())
        throw new Error("Time lost is required");
      if (!formData.description?.trim())
        throw new Error("Description is required");
      if (!formData.location_found?.trim())
        throw new Error("Last known location is required");
      if (!formData.image) throw new Error("Image is required");

      // Format date
      formData.date_found = formatDate(selectedDate);
      if (!formData.date_found) {
        throw new Error("Formatted date is invalid");
      }

      const response = await addItem(formData);
      console.log("Response from addItem:", response);
      if (!response.ok) {
        throw new Error("Failed to add lost item");
      }

      currentItem.set({ ...formData });
      showToast("Item created successfully!", "success");
      closeModal();
    } catch (error: any) {
      showToast(error.message || "Failed to create item.", "error");
      console.error("Error submitting:", error);
    } finally {
      adding = false;
    }
  };

  // Handle image upload
  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file) {
      formData.image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        formData.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
</script>

<Modal bind:open size="xl" class="w-full max-w-6xl" placement="center">
  <!-- Header -->
  <svelte:fragment slot="header">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Add Item</h1>
    </div>
  </svelte:fragment>

  <!-- Form -->
  <form
    class="px-6 py-4 grid grid-cols-6 grid-rows-4 gap-x-4 gap-y-2 overflow-visible"
    on:submit|preventDefault={handleSubmit}
  >
    <!-- Item Name -->
    <div class="col-span-3">
      <label for="name" class="block text-sm font-medium text-gray-800 mb-1"
        >Item Name</label
      >
      <input
        id="name"
        type="text"
        bind:value={formData.name}
        class="w-full p-2.5 border border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-lg text-sm text-[#1E1E1E]"
        placeholder="Enter item name"
      />
    </div>

    <!-- Status -->
    <div class="col-span-2 col-start-1 row-start-3">
      <label for="status" class="block text-sm font-medium text-gray-800 mb-1"
        >Status</label
      >
      <Status bind:selectedStatus={formData.status} modalType="add" />
    </div>

    <!-- Category -->
    <div class="col-span-2 col-start-1 row-start-2 overflow-visible">
      <label for="category" class="block text-sm font-medium text-gray-800 mb-1"
        >Category</label
      >
      <Category bind:selectedCategory={formData.category} />
    </div>

    <!-- Description -->
    <div class="col-span-2 row-span-3 col-start-3 row-start-2">
      <label
        for="description"
        class="block text-sm font-medium text-gray-800 mb-1">Description</label
      >
      <Textarea
        bind:value={formData.description}
        id="textarea-id"
        placeholder="Your message"
        rows={10}
      />
    </div>

    <!-- Date Picker -->
    <div class="col-start-5 row-start-1 col-span-2">
      <label for="dateLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Date Lost</label
      >
      <DatePicker
        bind:selectedDate
        on:apply={(event) => {
          selectedDate = event.detail;
        }}
      />
    </div>

    <!-- Time Picker -->
    <div class="col-start-4 row-start-1">
      <label for="timeLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Time Lost</label
      >
      <TimePicker bind:selectedTime={formData.time_found} />
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
          bind:value={formData.location_found}
          type="text"
          id="lastKnownLocation"
          class="w-full p-2.5 pr-10 border border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-lg text-sm text-[#1E1E1E]"
          placeholder="Enter location"
        />
        <MapPinAltSolid
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>

    <!-- Image Upload -->
    <div class="col-span-2 row-span-3 col-start-5 row-start-2">
      <label for="image" class="block mb-1 text-sm font-medium text-[#1E1E1E]"
        >Image</label
      >
      <label
        class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-[222px] rounded cursor-pointer bg-gray-50 p-4"
      >
        <input
          id="image"
          type="file"
          accept="image/*"
          class="hidden"
          on:change={handleImageUpload}
        />
        {#if formData.imagePreview}
          <img
            src={formData.imagePreview}
            alt="Preview"
            class="max-h-full max-w-full object-contain rounded"
          />
        {:else}
          <div class="flex flex-col items-center justify-center text-center">
            <span class="text-4xl text-gray-400">+</span>
            <span class="text-sm mt-2">Add image</span>
          </div>
        {/if}
      </label>
    </div>

    <!--  Buttons -->
    <div
      class="col-span-6 flex mt-4 justify-center gap-4 row-start-[5] col-start-1"
    >
      <Button
        color="alternative"
        class="w-32 hover:text-red-800 border-red-800 text-[#800000]"
        on:click={closeModal}>Cancel</Button
      >

      <Button type="submit" color="red" class="w-32" disabled={adding}>
        {#if adding}
          <div class="flex items-center gap-x-2">
            <Spinner color="white" size={5} />
            Adding
          </div>
        {:else}
          Save item
        {/if}</Button
      >
    </div>
  </form>
</Modal>
