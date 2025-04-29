<script lang="ts">
  import {
    Label,
    Input,
    Textarea,
    Button,
    Dropzone,
    Toast,
  } from "flowbite-svelte";
  import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
  import Status from "../../common/Status.svelte";
  import Category from "../../common/Category.svelte";
  import DatePicker from "../../common/DatePicker.svelte";
  import TimePicker from "../../common/TimePicker.svelte";
  import {
    MapPinAltSolid,
    CirclePlusSolid,
    CloseOutline,
  } from "flowbite-svelte-icons";
  import { createItemQuickEntry } from "../../../lib/api";
  import type { LostItem } from "../../../lib/types";

  // Form data binding
  let itemName: string = "";
  let description: string = "";
  let lastKnownLocation: string = "";
  let uploadedFile: File | null = null;
  let selectedStatus: string = "";
  let selectedDate: Date | null = null;
  let selectedTime: string = "";
  let selectedCategory: string = "";

  // Form state
  let isSubmitting: boolean = false;

  // Map frontend display values to backend codes [status]
  const statusMap = {
    Unclaimed: "UC",
    Claimed: "CL",
    Expired: "EX",
  };

  // Map frontend display values to backend codes [category]
  const categoryMap = {
    "Bags & Backpacks": "BA",
    Electronics: "EL",
    Eyewear: "EW",
    Footwear: "FW",
    "IDs & Cards": "ID",
    Keys: "KY",
    Miscellaneous: "MS",
    "Mobile Devices": "MB",
    "Wallets & Purses": "WT",
    "Watches & Jewelries": "WH",
  };

  // For dropzone functionality
  let value: string[] = [];
  let imagePreview: string | null = null;

  // Toast variables
  let toastStatus = false;
  let toastMessage = "";
  let toastType: "success" | "error" = "success";
  let counter = 5;

  function showToast(message: string, type: "success" | "error") {
    toastMessage = message;
    toastType = type;
    toastStatus = true;
    counter = 5;
    timeout();
  }

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
  }

  function dropHandle(event: DragEvent): void {
    value = [];
    event.preventDefault();

    if (event.dataTransfer?.items) {
      [...event.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file && file.type.startsWith("image/")) {
            value.push(file.name);
            // Trigger reactivity
            value = value;
            uploadedFile = file;
            createImagePreview(file);
          }
        }
      });
    } else if (event.dataTransfer?.files) {
      [...event.dataTransfer.files].forEach((file) => {
        if (file.type.startsWith("image/")) {
          value.push(file.name);
          // Trigger reactivity
          value = value;
          uploadedFile = file;
          createImagePreview(file);
        }
      });
    }
  }

  function handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        // Replace any existing files
        value = [file.name];
        uploadedFile = file;
        createImagePreview(file);
      }
    }
  }

  function createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function removeImage(): void {
    value = [];
    imagePreview = null;
    uploadedFile = null;
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function handleSubmit() {
    // Reset submission state
    isSubmitting = true;

    try {
      // Validate required fields
      if (!itemName) {
        throw new Error("Item name is required");
      }
      if (!selectedStatus) {
        throw new Error("Status is required");
      }
      if (!selectedCategory) {
        throw new Error("Category is required");
      }
      if (!selectedDate) {
        throw new Error("Date lost is required");
      }
      if (!selectedTime) {
        throw new Error("Time lost is required");
      }
      if (!description) {
        throw new Error("Description is required");
      }
      if (!lastKnownLocation) {
        throw new Error("Last known location is required");
      }

      // Map frontend values to backend codes
      const statusCode =
        statusMap[selectedStatus as keyof typeof statusMap] || "UC";
      const categoryCode =
        categoryMap[selectedCategory as keyof typeof categoryMap] || "MS";

      const formattedDate = formatDate(selectedDate);

      if (!formattedDate) {
        throw new Error("Date lost is required");
      }

      // Create the item object
      const lostItem: LostItem = {
        name: itemName,
        description: description || "",
        status: statusCode,
        category: categoryCode,
        date_found: formattedDate,
        time_found: selectedTime || "",
        location_found: lastKnownLocation || "",
        image: uploadedFile || undefined,
      };

      console.log(JSON.stringify(lostItem));

      // Call the API
      await createItemQuickEntry(lostItem);

      // Handle successful submission
      showToast("Item created successfully!", "success");
      resetForm();
    } catch (error) {
      showToast("Failed to create item.", "error");
      console.error("Form submission error:", error);
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    itemName = "";
    selectedStatus = "";
    selectedCategory = "";
    selectedDate = null;
    selectedTime = "";
    description = "";
    lastKnownLocation = "";
    removeImage();
  }
</script>

<Toast
  color={toastType === "success" ? "green" : "red"}
  bind:toastStatus
  dismissable={false}
  position="bottom-right"
>
  <svelte:fragment slot="icon">
    {#if toastType === "success"}
      <CheckCircleSolid class="w-5 h-5" />
      <span class="sr-only">Success icon</span>
    {:else}
      <CloseCircleSolid class="w-5 h-5" />
      <span class="sr-only">Error icon</span>
    {/if}
  </svelte:fragment>
  {toastMessage}
</Toast>

<div class="m-8">
  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
    Quick Entry
  </h3>
  <form on:submit|preventDefault={handleSubmit} class="space-y-3 mt-3">
    <!-- Item name -->
    <div class="space-y-1">
      <Label for="item-name" class="text-sm font-medium text-gray-600"
        >Item Name</Label
      >
      <Input
        id="item-name"
        placeholder="Enter item name"
        class="bg-white dark:bg-gray-800 text-gray-400 h-12 rounded-xl focus:ring-red-700 focus:border-red-700 focus:ring-1 focus:ring-offset-0"
        bind:value={itemName}
        required
      />
    </div>

    <!-- Status & category -->
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <Label for="status" class="text-sm-font-medium text-gray-600"
          >Status</Label
        >
        <Status bind:selectedStatus />
      </div>
      <div class="space-y-1">
        <Label for="category" class="text-sm font-medium text-gray-600">
          Category
        </Label>
        <Category bind:selectedCategory />
      </div>
    </div>

    <!-- Date & time -->
    <div class="grid grid-cols-3 gap-4">
      <div class="space-y-1 col-span-2">
        <Label for="date-picker" class="text-sm font-medium text-gray-600"
          >Date Lost</Label
        >
        <DatePicker
          bind:selectedDate
          on:apply={(event) => {
            selectedDate = event.detail;
          }}
        />
      </div>
      <div class="space-y-1">
        <Label for="time-picker" class="text-sm font-medium text-gray-600">
          Time Lost
        </Label>
        <TimePicker
          bind:selectedTime
          on:apply={(event) => {
            selectedTime = event.detail;
          }}
        />
      </div>
    </div>

    <!-- Description & file uploader -->
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <Label for="text-area" class="text-sm font-medium text-gray-600"
          >Description</Label
        >
        <Textarea
          id="text-area"
          placeholder="Describe the item"
          rows={5}
          class="bg-white dark:bg-gray-800 text-gray-400 h-5/6 rounded-xl focus:ring-red-700 focus:border-red-700 focus:ring-1 focus:ring-offset-0"
          bind:value={description}
        />
      </div>
      <div class="space-y-1">
        <Label for="file-upload" class="text-sm font-medium text-gray-600"
          >Image</Label
        >
        {#if imagePreview}
          <div class="relative h-32 min-h-32 w-full">
            <img
              src={imagePreview}
              alt="Uploaded preview"
              class="h-full w-full object-cover rounded-xl"
            />
            <button
              aria-label="Close button"
              type="button"
              class="absolute top-2 right-2 bg-gray-900 bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
              on:click={removeImage}
            >
              <CloseOutline class="text-white" />
            </button>
          </div>
        {:else}
          <Dropzone
            id="file-upload"
            on:drop={dropHandle}
            on:dragover={(event: DragEvent) => {
              event.preventDefault();
            }}
            on:change={handleChange}
            class="h-32 min-h-32 bg-white rounded-xl p-2"
            accept="image/*"
          >
            <CirclePlusSolid class="mb-2 w-8 h-8 text-gray-300" />
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
          </Dropzone>
        {/if}
      </div>
    </div>

    <!-- Last known location -->
    <div class="space-y-1">
      <Label for="last-known-location" class="text-sm font-medium text-gray-600"
        >Last Known Location</Label
      >
      <div class="relative">
        <Input
          id="last-known-location"
          class="bg-white dark:bg-gray-800 text-gray-400 pe-10 h-12 rounded-xl focus:ring-red-700 focus:border-red-700 focus:ring-1 focus:ring-offset-0"
          placeholder="Enter location"
          bind:value={lastKnownLocation}
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"
        >
          <MapPinAltSolid class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>

    <div class="w-full mt-5">
      <Button
        type="submit"
        class="bg-[#800000] hover:bg-[#600303] w-full rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </div>
  </form>
</div>
