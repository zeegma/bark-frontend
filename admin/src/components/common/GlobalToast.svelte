<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
  import {
    toastVisible,
    toastMessage,
    toastType,
    toastCounter,
  } from "../../stores/toastStore";

  let visible = false;
  let message = "";
  let type: "success" | "error" = "success";
  let counter = 5;

  // Subscribe to the store values
  toastVisible.subscribe((value) => (visible = value));
  toastMessage.subscribe((value) => (message = value));
  toastType.subscribe((value) => (type = value));
  toastCounter.subscribe((value) => (counter = value));
</script>

{#if visible}
  <Toast
    color={type === "success" ? "green" : "red"}
    position="bottom-right"
    class="z-50"
  >
    <svelte:fragment slot="icon">
      {#if type === "success"}
        <CheckCircleSolid class="w-5 h-5" />
        <span class="sr-only">Success icon</span>
      {:else}
        <CloseCircleSolid class="w-5 h-5" />
        <span class="sr-only">Error icon</span>
      {/if}
    </svelte:fragment>
    <div class="text-sm font-normal">
      {message} - Autohide in {counter}s.
    </div>
  </Toast>
{/if}
