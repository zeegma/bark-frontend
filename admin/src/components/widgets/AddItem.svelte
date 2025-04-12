<script lang="ts">
  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

<!-- Button -->
<button
  on:click={openModal}
  class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium outline-none text-white bg-red-900 rounded-lg hover:bg-red-950 cursor-pointer"
  >Add item <svg
    class="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
    />
  </svg></button
>

<!-- Add Item Modal -->
{#if showModal}
  <div
    id="crud-modal"
    tabindex="-1"
    aria-hidden="false"
    class="overflow-y-auto fixed overflow-x-hidden top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-screen h-screen max-h-full backdrop-blur-sm bg-black/50"
  >
    <div class="bg-[#F9F9F9] rounded-2xl w-full max-w-6xl shadow-md">
      <!-- Header -->
      <div
        class="flex justify-between items-center px-6 py-4 border-b border-gray-300"
      >
        <h2 class="text-2xl font-bold text-[#1E1E1E]">Add item</h2>
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

      <form class="px-6 py-4 grid grid-cols-12 gap-4">
        <!-- Item Name -->
        <div class="col-span-3">
          <label
            for="itemName"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]"
            >Item Name</label
          >
          <input
            id="itemName"
            type="text"
            class="w-full p-2.5 border border-[#B8B7B7] rounded-lg text-sm"
            placeholder="Enter item name"
          />
        </div>
        <!-- Status -->
        <div class="col-span-2">
          <label
            for="status"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]">Status</label
          >
          <select
            class="w-full p-2.5 border border-[#B8B7B7] rounded-lg text-sm"
          >
            <option>Status</option>
            <option>Claimed</option>
            <option>Unclaimed</option>
          </select>
        </div>
        <!-- Category -->
        <div class="col-span-3">
          <label
            for="category"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]"
            >Category</label
          >
          <select
            class="w-full p-2.5 border border-[#B8B7B7] rounded-lg text-sm"
          >
            <option>Category</option>
            <option>Bags & Backpacks</option>
            <option>Electronics</option>
            <option>Eyewear</option>
            <option>Footwear</option>
            <option>IDs & Cards</option>
            <option>Keys</option>
            <option>Miscellaneous</option>
            <option>Mobile Devices</option>
            <option>Wallets & Purses</option>
            <option>Watches & Jewelries</option>
          </select>
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
            <input type="file" class="hidden" />
            <span class="text-4xl text-gray-400">+</span>
            <span class="text-sm mt-2">Add image</span>
          </label>
        </div>
        <!-- Description -->
        <div class="col-span-8">
          <label
            for="description"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]"
            >Description</label
          >
          <textarea
            rows="4"
            class="w-full p-2.5 border border-[#B8B7B7] rounded-lg text-sm"
            placeholder="Describe the item"
          ></textarea>
        </div>
        <!-- Date Lost -->
        <div class="col-span-3">
          <label
            for="dateLost"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]"
            >Date Lost</label
          >
          <input
            id="dateLost"
            type="date"
            class="w-full p-2.5 border border-[#B8B7B7] rounded-lg text-sm"
          />
        </div>
        <!-- Time Lost -->
        <div class="col-span-2">
          <label
            for="timeLost"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]"
            >Time Lost</label
          >
          <input
            id="timeLost"
            type="time"
            class="w-full p-2.5 border border-[#B8B7B7] rounded-lg text-sm"
          />
        </div>
        <!-- Last Known Location -->
        <div class="col-span-3">
          <label
            for="lastKnownLocation"
            class="block mb-1 text-sm font-medium text-[#1E1E1E]"
            >Last Known Location</label
          >
          <div class="relative">
            <input
              id="lastKnownLocation"
              type="text"
              class="w-full p-2.5 pr-10 border border-[#B8B7B7] rounded-lg text-sm"
              placeholder="Location"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                class="w-[12px] h-[17px] text-[#1E1E1E]"
                viewBox="0 0 384 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M192 0C86 0 0 86 0 192c0 77.7 111.8 222.7 168.3 294.2 12.3 15.6 35.1 15.6 47.4 0C272.2 414.7 384 269.7 384 192 384 86 298 0 192 0zm0 272a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"
                />
              </svg>
            </div>
          </div>
        </div>
        <!-- Cancel and Save buttons -->
        <div class="col-span-12 flex justify-center gap-4 mt-4">
          <button
            type="button"
            on:click={closeModal}
            class="w-32 border border-[#800000] text-[#800000] px-6 py-2 rounded-lg hover:bg-[#800000] hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-32 bg-[#800000] text-white px-6 py-2 rounded-lg hover:bg-[#660000] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
