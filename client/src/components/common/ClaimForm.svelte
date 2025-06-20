<script lang="ts">
  export let itemId: string;

  let fullName: string = "";
  let contactNumber: string = "";
  let facebookLink: string = "";
  let description: string = "";
  let photo: File | null = null;
  let isLoading: boolean = false;
  let errorMessage: string | null = null;
  let previewUrl: string | null = null;
  let isSubmitted: boolean = false;

  // Handle file input change
  function handleFile(file: File) {
    photo = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      previewUrl = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Function for click-based upload
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      handleFile(target.files[0]);
    }
  }

  // Function for drag-and-drop events
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Function for submitting the form
  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (
      !fullName ||
      !contactNumber ||
      !facebookLink ||
      !description ||
      !photo
    ) {
      errorMessage = "Please fill out all required fields.";
      return;
    }

    isLoading = true;
    errorMessage = null;

    try {
      const formData = new FormData();
      formData.append("image", photo!);
      formData.append(
        "data",
        JSON.stringify({
          name: fullName,
          request_date: new Date().toISOString().split("T")[0],
          detailed_description: description,
          number: contactNumber,
          media: facebookLink,
          item_id: parseInt(itemId, 10),
        }),
      );

      console.log("Submitting claim form...");
      const apiResponse = await fetch(
        "http://127.0.0.1:8000/claim-form/create/",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        throw new Error(errorBody || "Failed to submit claim.");
      }

      // Clear all fields
      fullName = "";
      contactNumber = "";
      facebookLink = "";
      description = "";
      photo = null;
      previewUrl = null;

      // Update state
      isSubmitted = true;
      isLoading = false;

      setTimeout(() => {
        isSubmitted = false;
      }, 1000);
    } catch (error) {
      console.error("Error submitting claim:", error);
      errorMessage = "An error occurred while submitting your claim.";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex flex-col">
  <div class="px-6 pt-6 sm:pt-8 md:pt-12 lg:pt-6 pb-6 md:px-12 xl:px-16 xl:py-12">
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
      <!-- Full Name -->
      <label class="flex flex-col gap-2 text-stone-700">
        <p class="text-sm md:text-base font-medium text-[#9A4444]">Full Name</p>
        <input
          type="text"
          name="name"
          placeholder="Juan Dela Cruz"
          bind:value={fullName}
          required
          autocomplete="name"
          class="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm"
        />
      </label>

      <div class="grid grid-cols-2 gap-4 md:gap-6">
        <!-- Contact Number -->
        <label class="flex flex-col flex-grow gap-2 text-stone-700">
          <p class="text-sm md:text-base font-medium text-[#9A4444] truncate">
            Contact Number
          </p>
          <input
            type="tel"
            name="contact_number"
            placeholder="09123456789"
            bind:value={contactNumber}
            required
            class="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm"
          />
        </label>

        <!-- Facebook Link -->
        <label class="flex flex-col flex-grow gap-2 text-stone-700">
          <p class="text-sm md:text-base font-medium text-[#9A4444] truncate">
            Facebook Link
          </p>
          <input
            type="url"
            name="facebook_link"
            placeholder="https://facebook.com/example"
            bind:value={facebookLink}
            required
            class="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm"
          />
        </label>
      </div>

      <!-- Detailed Description -->
      <label class="text-sm md:text-base flex flex-col gap-2 text-stone-700">
        <p class="font-medium text-[#9A4444]">Detailed Description</p>
        <textarea
          name="description"
          placeholder="To help us verify that you are the owner, please provide any unique features that only you would know about this..."
          bind:value={description}
          required
          class="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm h-32"
        ></textarea>
      </label>

      <!-- Image Uploader -->
      <div class="flex flex-col gap-2">
        <p class="text-sm md:text-base font-medium text-[#9A4444]">
          Ownership Photo
        </p>
        <label
          class="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
        >
          {#if previewUrl}
            <!-- Show Preview Image -->
            <img
              src={previewUrl}
              alt="Preview"
              class="w-full h-64 object-cover rounded-md mb-2"
            />
            <span class="text-sm text-stone-500"
              >Replace image by dropping or clicking</span
            >
          {:else}
            <!-- Upload Prompt -->
            <div
              class="flex flex-col items-center justify-center gap-2 min-h-36"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              <span class="text-sm text-stone-500 max-w-52"
                >Drag and drop an image here, or click to upload</span
              >
            </div>
          {/if}
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            on:change={handleFileChange}
            class="absolute inset-0 opacity-0 cursor-pointer"
            on:dragover={handleDragOver}
            on:drop={handleDrop}
          />
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        disabled={isLoading || isSubmitted}
        class={`px-4 py-3 font-medium rounded-lg transition duration-300 ease-in-out mt-4 ${
          isSubmitted
            ? "bg-green-500 text-white pointer-events-none"
            : isLoading
              ? "bg-gray-500 text-white pointer-events-none"
              : "bg-[#800000] text-white hover:bg-[#A73D3D]"
        }`}
      >
        {isSubmitted
          ? "Submitted"
          : isLoading
            ? "Submitting..."
            : "Submit Claim"}
      </button>
    </form>
  </div>
  {#if errorMessage}
    <div class="bg-red-500 p-6">
      <p class="text-white text-xs">{errorMessage}</p>
    </div>
  {/if}
</div>
