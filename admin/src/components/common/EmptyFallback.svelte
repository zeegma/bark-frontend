<script lang="ts">
  import { UsersGroupSolid, DropboxSolid } from "flowbite-svelte-icons";

  export let type: "items" | "claimants" = "items";
  export let message: string | null = null;
  export let subMessage: string | null = null;
</script>

<div class="flex flex-col justify-center items-center h-full p-8 text-gray-800">
  {#if type === "claimants"}
    <UsersGroupSolid class="w-16 h-16 mb-4 text-red-500" />
  {:else}
    <DropboxSolid class="w-16 h-16 mb-4 text-red-500" />
  {/if}

  {#if message}
    <p class="text-lg font-semibold">{message}</p>
  {/if}
  {#if subMessage}
    <p class="text-sm text-gray-400">{subMessage}</p>
  {/if}
</div>
