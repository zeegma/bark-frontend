<script lang="ts">
  import { Modal, Label, Input } from "flowbite-svelte";
  import DatePicker from "../../common/DatePicker.svelte";
  import Placeholder from "../../common/Placeholder.svelte";

  export let open = false;

  export let claim: {
    id: string;
    name: string;
    phone: string;
    facebook: string;
    dateFiled: string;
    itemId: string;
    itemRequested: string;
    hasImage?: boolean;
  } | null;
</script>

{#if claim}
  <Modal
    bind:open
    autoclose
    outsideclose
    size="lg"
    placement="center-right"
    class="bg-gray-50 rounded-3xl ring-1 ring-gray-800 right-40"
  >
    <div class="px-2 pb-5">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-4xl font-bold text-gray-900 dark:text-white">
          {claim.id}
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left column -->
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="claimant-name" class="text-sm font-medium"
              >Claimant Name</Label
            >
            <Input
              id="claimant-name"
              value={claim.name}
              readonly
              class="bg-white dark:bg-gray-800 text-gray-600"
            />
          </div>

          <!-- Date filed & phone -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="date-filed" class="text-sm font-medium"
                >Date Filed</Label
              >
              <DatePicker disabled={true} value={new Date(claim.dateFiled)} />
            </div>
            <div class="space-y-2">
              <Label for="phone" class="text-sm font-medium">Phone</Label>
              <Input
                id="phone"
                value={claim.phone}
                readonly
                class="bg-white dark:bg-gray-800 text-gray-600"
              />
            </div>
          </div>

          <!-- Facebook -->
          <div class="space-y-2">
            <Label for="facebook" class="text-sm font-medium">Facebook</Label>
            <Input
              id="facebook"
              value={claim.facebook}
              readonly
              class="bg-white dark:bg-gray-800 text-gray-600"
            />
          </div>

          <!-- Requested item -->
          <div class="space-y-2">
            <Label for="item-requested" class="text-sm font-medium"
              >Item Requested</Label
            >
            <Input
              id="item-requested"
              value={claim.itemRequested}
              readonly
              class="bg-white dark:bg-gray-800 text-gray-600"
            />
          </div>
        </div>

        <!-- Right column -->
        <div class="flex flex-col h-full">
          <div class="grid grid-cols-2 gap-4 flex-grow">
            <!-- Proof photo -->
            <div class="space-y-2 flex flex-col">
              <Label class="text-sm font-medium">Ownership Proof Image</Label>
              <div
                class="border-2 border-dashed border-gray-300 flex items-center justify-center flex-grow bg-white rounded-xl"
              >
                {#if claim.hasImage}
                  <img
                    src="src/assets/me.png"
                    alt="Ownership Proof"
                    class="w-40 h-40 object-cover"
                  />
                {:else}
                  <Placeholder />
                  <span class="text-xs text-gray-500 mt-1"
                    >NO PHOTO AVAILABLE</span
                  >
                {/if}
              </div>
            </div>

            <!-- Lost photo -->
            <div class="space-y-2 flex flex-col">
              <Label class="text-sm font-medium">Lost Item Image</Label>
              <div
                class="border-2 border-dashed border-gray-300 flex items-center justify-center flex-grow bg-white rounded-xl"
              >
                {#if claim.hasImage}
                  <img
                    src="src/assets/lost.jpg"
                    alt="Lost Item"
                    class="w-40 h-40 object-cover"
                  />
                {:else}
                  <Placeholder />
                  <span class="text-xs text-gray-500 mt-1"
                    >NO PHOTO AVAILABLE</span
                  >
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
{/if}
