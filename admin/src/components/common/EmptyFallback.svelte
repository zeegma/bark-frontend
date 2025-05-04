<script lang="ts">
  import { UsersGroupSolid, DropboxSolid } from "flowbite-svelte-icons";

  export let type: "items" | "claimants" = "items";
</script>

<div class="flex flex-col justify-center items-center h-full p-8 text-gray-800">
  {#if type === "claimants"}
    <UsersGroupSolid class="w-16 h-16 mb-4 text-red-500" />
    <p class="text-lg font-semibold">No claimants at the moment.</p>
    <p class="text-sm text-gray-400">
      Looks like nobody has requested a claim yet.
    </p>
  {:else}
    <DropboxSolid class="w-16 h-16 mb-4 text-red-500" />
    <p class="text-lg font-semibold">No items at the moment.</p>
    <p class="text-sm text-gray-400">
      Looks like nobody has reported a lost item yet.
    </p>
  {/if}
</div>
