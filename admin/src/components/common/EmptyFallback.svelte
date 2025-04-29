<script lang="ts">
  import { UsersGroupSolid } from "flowbite-svelte-icons";

  let { message, subMessage } = $props();
</script>

<div class="flex flex-col justify-center items-center h-full p-8 text-gray-800">
  <UsersGroupSolid class="w-16 h-16 mb-4 text-red-500" />
  <p class="text-lg font-semibold">{message}</p>
  <p class="text-sm text-gray-400">
    {subMessage}
  </p>
</div>
