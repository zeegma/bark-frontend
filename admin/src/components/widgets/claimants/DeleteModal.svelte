<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";

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

<Modal
  bind:open
  size="sm"
  autoclose
  outsideclose
  class="bg-gray-50 rounded-3xl ring-1 ring-gray-800"
>
  {#if claim}
    <div class="text-center">
      <ExclamationCircleOutline
        class="mx-auto mb-6 text-red-700 w-24 h-24  dark:text-gray-200"
      />
      <h1 class="mb-2 text-4xl font-semibold text-gray-800">Delete Claimant</h1>
      <h3 class="mb-8 text-lg font-normal text-gray-800 dark:text-gray-400">
        Are you sure you want to delete claim {claim.id}?
      </h3>
      <div class="mb-3 flex gap-3 justify-center">
        <Button
          color="alternative"
          class="hover:text-red-800 border-red-800 text-[#800000]"
          >No, cancel</Button
        >
        <Button color="red">Yes, I'm sure</Button>
      </div>
    </div>
  {:else}
    <p>No claim selected</p>
  {/if}
</Modal>
