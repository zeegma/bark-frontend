<script lang="ts">
  import { Label, Input, Textarea, Button } from "flowbite-svelte";
  import { Dropzone } from "flowbite-svelte";
  import Status from "../../common/Status.svelte";
  import Category from "../../common/Category.svelte";
  import DatePicker from "../../common/DatePicker.svelte";
  import TimePicker from "../../common/TimePicker.svelte";
  import {
    MapPinAltSolid,
    CirclePlusSolid,
    CloseOutline,
  } from "flowbite-svelte-icons";

  // For dropzone functionality
  let value: string[] = [];
  let imagePreview: string | null = null;

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
  }
</script>

<div class="m-8">
  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
    Quick Entry
  </h3>
  <div class="space-y-3 mt-3">
    <!-- Item name -->
    <div class="space-y-1">
      <Label for="claimant-name" class="text-sm font-medium text-gray-600"
        >Item Name</Label
      >
      <Input
        id="claimant-name"
        placeholder="Enter item name"
        class="bg-white dark:bg-gray-800 text-gray-400 h-12 rounded-xl focus:ring-red-700 focus:border-red-700 focus:ring-1 focus:ring-offset-0"
      />
    </div>

    <!-- Status & category -->
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <Label for="status" class="text-sm-font-medium text-gray-600"
          >Status</Label
        >
        <Status />
      </div>
      <div class="space-y-1">
        <Label for="category" class="text-sm font-medium text-gray-600">
          Category
        </Label>
        <Category />
      </div>
    </div>

    <!-- Date & time -->
    <div class="grid grid-cols-3 gap-4">
      <div class="space-y-1 col-span-2">
        <Label for="date-picker" class="text-sm font-medium text-gray-600"
          >Date Lost</Label
        >
        <DatePicker />
      </div>
      <div class="space-y-1">
        <Label for="time-picker" class="text-sm font-medium text-gray-600">
          Time Lost
        </Label>
        <TimePicker />
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
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"
        >
          <MapPinAltSolid class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  </div>

  <div class="w-full mt-5">
    <Button class="bg-[#800000] hover:bg-[#600303] w-full rounded-xl"
      >Save</Button
    >
  </div>
</div>
