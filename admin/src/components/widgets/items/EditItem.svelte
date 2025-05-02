<script lang="ts">
  import DatePicker from "../../common/DatePicker.svelte";
  import TimePicker from "../../common/TimePicker.svelte";
  import Category from "../../common/Category.svelte";
  import Status from "../../common/Status.svelte";
  import ClaimantsList from "../../common/ClaimantsList.svelte";
  import { Textarea, Spinner, Button, Modal } from "flowbite-svelte";
  import { MapPinAltSolid } from "flowbite-svelte-icons";
  import { itemsStore } from "../../../stores/itemStore";
  import type { Item } from "../../../lib/types";

  export let item: Item;
  export let onSave: (data: Item) => void;
  export let open = false;
  let selectedDate: Date | null = null;

  function formatDate(date: Date | null): string {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const formattedDate = formatDate(selectedDate);

  let formData: Item = {
    ...item,
    accepted_claim: item.accepted_claim ?? null, // Ensure it's never undefined
  };
  let updating = false;
  let edit = true;

  // Ensure date is a valid Date object
  /* const ensureValidDate = (date: any): Date => {
    return date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  };*/

  // formData.date_found = ensureValidDate(formData.date_found);

  $: if (open && edit) {
    console.log("Opening modal for item:", item);
    formData = { ...item };
    // formData.date_found = ensureValidDate(formData.date_found);
    selectedDate = item.date_found ? new Date(item.date_found) : null;
    if (typeof formData.photo_url === "string") {
      formData.imagePreview = formData.photo_url;
    } else {
      formData.imagePreview = null;
    }

    edit = false;
  }

  const closeModal = () => {
    open = false;
  };

  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];

    if (file) {
      console.log("Image selected:", file.name);
      formData.image = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        formData.imagePreview = e.target?.result as string;
        console.log("Image preview generated.");
      };
      reader.onerror = (e) => {
        console.error("Failed to load image preview:", e);
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("No file selected.");
    }
  };

  const handleSubmit = async () => {
    updating = true;
    const itemToSave: Item = {
      ...formData,
      date_found: formatDate(selectedDate ?? new Date()),
    };

    console.log("Date:", item.date_found);

    console.log("Item to save:", itemToSave);
    if (formData.id) {
      await itemsStore.updateItem(itemToSave);
    }

    onSave(itemToSave);
    open = false;
    updating = false;
  };
</script>

<!-- Modal -->
<Modal bind:open size="xl" class="w-full max-w-6xl" placement="center">
  <svelte:fragment slot="header">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Edit Item</h1>
    </div>
  </svelte:fragment>
  <!-- Form -->
  <form
    class="px-6 py-4 grid grid-cols-6 grid-rows-4 gap-4"
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
        class="w-full p-2.5 border border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-lg text-sm"
        placeholder="Enter item name"
      />
    </div>

    <!-- Status -->
    <div class="col-start-3 row-start-1">
      <label for="status" class="block text-sm font-medium text-gray-800 mb-1"
        >Status</label
      >
      <Status bind:selectedStatus={formData.status} />
    </div>

    <!-- Category -->
    <div class="col-start-4 row-start-1 col-span-2">
      <label for="category" class="block text-sm font-medium text-gray-800 mb-1"
        >Category</label
      >
      <Category bind:selectedCategory={formData.category} />
    </div>

    <!-- Claimant -->
    <div class="col-start-6">
      <label for="claimant" class="block text-sm font-medium text-gray-800 mb-1"
        >Claimant</label
      >
      <ClaimantsList
        bind:selectedClaimant={formData.accepted_claim!}
        itemId={item.id}
      />
    </div>

    <!-- Date Picker -->
    <div class="col-span-2 col-start-1 row-start-2">
      <label for="dateLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Date Lost</label
      >
      <DatePicker
        bind:selectedDate
        value={selectedDate}
        on:apply={(event) => {
          selectedDate = event.detail;
        }}
      />
    </div>

    <!-- Description -->
    <div class="col-span-2 row-span-3 col-start-3 row-start-2">
      <label
        for="description"
        class="block text-sm font-medium text-gray-800 mb-1">Description</label
      >
      <Textarea
        bind:value={formData.description}
        placeholder="Description"
        rows={10}
      />
    </div>

    <!-- Time Picker -->
    <div class="col-span-2 col-start-1 row-start-3">
      <label for="timeLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Time Lost</label
      >
      <TimePicker bind:selectedTime={formData.time_found} />
    </div>

    <!-- Last Known Location -->
    <div class="col-span-2 col-start-1 row-start-4">
      <label for="timeLost" class="block text-sm font-medium text-gray-800 mb-1"
        >Last Known Location</label
      >

      <div class="relative w-full">
        <input
          type="text"
          bind:value={formData.location_found}
          class="w-full p-2.5 pr-10 border border-gray-300 focus:border-black focus:ring-2 focus:ring-red-500 focus:outline-none rounded-lg text-sm"
          placeholder="Location"
        />
        <MapPinAltSolid
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>

    <!-- Image Upload -->
    <div class="col-span-2 row-span-3 col-start-5 row-start-2">
      <label for="image" class="block mb-1 text-sm font-medium text-[#1E1E1E]">
        Image
      </label>

      <label
        class="relative border border-gray-300 rounded h-[222px] flex items-center justify-center bg-gray-50 p-2 cursor-pointer overflow-hidden group"
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
            class="max-h-full max-w-full object-contain rounded transition duration-200"
          />

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded"
          >
            <span class="text-white text-sm font-medium"
              >Click to change image</span
            >
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center text-center">
            <span class="text-4xl text-gray-400">+</span>
            <span class="text-sm mt-2">Add image</span>
          </div>
        {/if}
      </label>
    </div>

    <!-- Buttons -->
    <div class="col-span-6 flex justify-center gap-4 row-start-[5] col-start-1">
      <Button
        color="alternative"
        class="w-32 hover:text-red-800 border-red-800 text-[#800000]"
        on:click={closeModal}>Cancel</Button
      >

      <Button color="red" type="submit" class="w-32">
        {#if updating}
          <div class="flex items-center gap-x-2">
            <Spinner color="white" size={5} />
            Saving
          </div>
        {:else}
          Save edit
        {/if}</Button
      >
    </div>
  </form>
</Modal>
