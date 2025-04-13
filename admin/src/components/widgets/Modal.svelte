<script lang="ts">
  export let mode: "add" | "view" | "edit" = "add";

  let showModal = false;

  const openModal = () => (showModal = true);
  const closeModal = () => (showModal = false);

  const statusOptions = ["Unclaimed", "Claimed"];
  const categoryOptions = [
    "Bags & Backpacks",
    "Electronics",
    "Eyewear",
    "Footwear",
    "IDs & Cards",
    "Keys",
    "Miscellaneous",
    "Mobile Devices",
    "Wallets & Purses",
    "Watches & Jewelries",
  ];

  $: title =
    mode === "add" ? "Add Item" : mode === "edit" ? "Edit Item" : "View Item";

  $: isDisabled = mode === "view";
  $: showClaimant = mode !== "add";

  const handleSubmit = () => {
    // Submission logic
    closeModal();
  };
</script>

<!-- If statement depending on the mode as edit and view uses icons -->
<button on:click={openModal} class="btn capitalize">{mode} Item</button>

{#if showModal}
  <div
    class="overflow-y-auto fixed inset-0 z-50 flex justify-center items-center w-screen h-screen max-h-full backdrop-blur-sm bg-black/50"
  >
    <div class="bg-white rounded-2xl w-full max-w-6xl shadow-md">
      <div
        class="flex justify-between items-center px-6 py-4 border-b border-gray-300"
      >
        <h2 class="text-2xl font-bold text-gray-800">{title}</h2>
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
          <label for="name" class="block text-sm font-medium text-gray-800"
            >Item Name</label
          >
          <input
            type="text"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            placeholder={!isDisabled ? "Enter item name" : ""}
            disabled={isDisabled}
          />
        </div>

        <!-- Status -->
        <div class="col-span-2">
          <label for="status" class="block text-sm font-medium text-gray-800"
            >Status</label
          >
          <select
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            disabled={isDisabled}
          >
            {#if mode === "add"}<option value="">Status</option>{/if}
            {#each statusOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <!-- Category -->
        <div class={`col-span-${mode === "add" ? 3 : 2}`}>
          <label for="category" class="block text-sm font-medium text-gray-800"
            >Category</label
          >
          <select
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            disabled={isDisabled}
          >
            {#if mode === "add"}<option value="">Category</option>{/if}
            {#each categoryOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <!-- Claimant -->
        {#if showClaimant}
          <div class="col-span-2">
            <label
              for="claimant"
              class="block text-sm font-medium text-gray-800">Claimant</label
            >
            {#if mode === "view"}
              <input
                type="text"
                class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                disabled
              />
            {:else}
              <select
                class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select Claimant</option>
                <option value="Claimant 1">Claimant 1</option>
                <option value="Claimant 2">Claimant 2</option>
                <option value="Claimant 3">Claimant 3</option>
              </select>
            {/if}
          </div>
        {/if}

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
            class="block text-sm font-medium text-gray-800">Description</label
          >
          <textarea
            rows="4"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            placeholder={!isDisabled ? "Describe the item" : ""}
            disabled={isDisabled}
          ></textarea>
        </div>

        <!-- Date Lost -->
        <div class="col-span-3">
          <label for="dateLost" class="block text-sm font-medium text-gray-800"
            >Date Lost</label
          >
          <input
            type="date"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            disabled={isDisabled}
          />
        </div>

        <!-- Time Lost -->
        <div class="col-span-2">
          <label for="timeLost" class="block text-sm font-medium text-gray-800"
            >Time Lost</label
          >
          <input
            type="time"
            class="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            disabled={isDisabled}
          />
        </div>

        <!-- Last Known Location -->
        <div class="col-span-3">
          <label
            for="lastKnownLocation"
            class="block text-sm font-medium text-gray-800"
            >Last Known Location</label
          >
          <div class="relative">
            <input
              type="text"
              class="w-full p-2.5 pr-10 border border-gray-300 rounded-lg text-sm"
              placeholder={!isDisabled ? "Location" : ""}
              disabled={isDisabled}
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                class="w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M192 0C86 0 0 86 0 192c0 77.7 111.8 222.7 168.3 294.2 12.3 15.6 35.1 15.6 47.4 0C272.2 414.7 384 269.7 384 192 384 86 298 0 192 0zm0 272a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        {#if mode !== "view"}
          <div class="col-span-12 flex justify-center gap-4 mt-4">
            <button
              type="button"
              on:click={closeModal}
              class="w-32 border border-red-900 text-red-900 px-6 py-2 rounded-lg hover:bg-red-900 hover:text-white cursor-pointer"
            >
              {mode === "edit" ? "Discard" : "Cancel"}
            </button>
            <button
              type="submit"
              class="w-32 bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-950 cursor-pointer"
            >
              Save
            </button>
          </div>
        {/if}
      </form>
    </div>
  </div>
{/if}
