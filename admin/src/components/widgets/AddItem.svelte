<script lang="ts">
  import DatePicker from "../common/DatePicker.svelte";
  import TimePicker from "../common/TimePicker.svelte";
  import Category from "../common/Category.svelte";
  import Status from "../common/Status.svelte";
  import { Textarea } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  export let items: Array<any> = []; // List of items
  export let currentItem: any = {}; // Newly added/edited items

  let showModal = false;

  // Form data
  let formData: any = {
    id: "",
    name: "",
    status: "",
    category: "",
    claimant: "",
    image: null,
    imagePreview: null,
    description: "",
    dateLost: "",
    timeLost: "",
    lastKnownLocation: "",
  };

  // Generating ID
  const getNextHexId = () => {
    if (items.length === 0) return "LOST0001";
    const lastItem = items[items.length - 1];
    const lastId = parseInt(lastItem.id.replace("LOST", ""), 16);
    const nextId = (lastId + 1).toString(16).toUpperCase().padStart(4, "0");
    return `LOST${nextId}`;
  };

  const resetForm = () => {
    formData = {
      id: getNextHexId(),
      name: "",
      status: "",
      category: "",
      claimant: "",
      image: null,
      imagePreview: null,
      description: "",
      dateLost: "",
      timeLost: "",
      lastKnownLocation: "",
    };
  };

  const openModal = () => {
    resetForm();
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };

  // Temporary handling for submission in the localStorage
  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    currentItem = { ...formData };

    // Save item to localStorage
    let storedItems = JSON.parse(localStorage.getItem("items") || "[]");
    storedItems.push(currentItem);
    localStorage.setItem("items", JSON.stringify(storedItems));

    // Update items array to reflect the newly added item
    items = storedItems;

    closeModal();
  };

  // Handles image upload (for now as localStorage is being used - MUST be changed)
  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file) {
      formData.image = file;

      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        formData.imagePreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Load items from localStorage when the component is mounted
  onMount(() => {
    let storedItems = JSON.parse(localStorage.getItem("items") || "[]");
    items = storedItems;
  });
</script>

<button on:click={openModal} class="btn capitalize">
  <div
    class="bg-red-900 text-white px-4 py-2 flex items-center gap-2 rounded-lg"
  >
    Add Item <PlusOutline />
  </div>
</button>

{#if showModal}
  <div
    class="overflow-y-auto fixed inset-0 z-50 flex justify-center items-center w-screen h-screen max-h-full backdrop-blur-sm bg-black/50"
  >
    <div class="bg-white rounded-2xl w-full max-w-6xl shadow-md">
      <div
        class="flex justify-between items-center px-6 py-4 border-b border-gray-300"
      >
        <h2 class="text-2xl font-bold text-gray-800">Add Item</h2>
        <button
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

      <form
        class="px-6 py-4 grid grid-cols-12 gap-4"
        on:submit|preventDefault={handleSubmit}
      >
        <!-- Item Name -->
        <div class="col-span-3">
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

        <!-- Image -->
        <div class="col-span-4 row-span-3">
          <label
            for="image"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]">Image</label
          >
          <label
            class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded h-full cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              class="hidden"
              on:change={handleImageUpload}
            />

            {#if formData.imagePreview}
              <img
                src={formData.imagePreview}
                alt="Preview"
                class="w-full h-60 object-cover rounded-lg"
              />
            {:else}
              <span class="text-4xl text-gray-400">+</span>
              <span class="text-sm mt-2">Add image</span>
            {/if}
          </label>
        </div>

        <!-- Description -->
        <div class="col-span-8">
          <label
            for="description"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Description</label
          >
          <Textarea
            bind:value={formData.description}
            id="textarea-id"
            placeholder="Your message"
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
        <div class="col-span-3">
          <label
            for="lastKnownLocation"
            class="block text-sm font-medium text-gray-800 mb-1"
            >Last Known Location</label
          >
          <input
            bind:value={formData.lastKnownLocation}
            type="text"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter location"
          />
        </div>

        <!-- Action Buttons -->
        <div class="col-span-12 flex justify-center gap-4 mt-4">
          <button
            type="button"
            on:click={closeModal}
            class="w-32 border border-red-900 text-red-900 px-6 py-2 rounded-lg hover:bg-red-900 hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-32 bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-950 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
