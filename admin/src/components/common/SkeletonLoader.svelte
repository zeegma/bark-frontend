<script lang="ts">
  export let type: "table" | "grid" = "table";
  export let count: number = 5;
</script>

{#if type === "table"}
  <div class="w-full animate-pulse">
    {#each Array(count) as _, i}
      <div class="flex items-center py-4 px-4 border-b border-gray-200">
        <div class="w-4 h-4 mr-4 bg-gray-200 rounded"></div>
        <div class="w-12 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-36 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-32 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-48 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-24 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-12 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-32 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="w-32 h-5 mr-4 bg-gray-200 rounded"></div>
        <div class="flex ml-auto">
          <div class="w-8 h-8 mr-2 bg-gray-200 rounded-full"></div>
          <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="w-full animate-pulse">
    <!-- Select All skeleton -->
    <div class="sticky top-0 z-10 bg-white pb-3 pl-1 flex items-center">
      <div class="w-4 h-4 bg-gray-200 rounded"></div>
      <div class="ml-2 w-16 h-4 bg-gray-200 rounded"></div>
    </div>

    <!-- Grid skeleton -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {#each Array(count) as _, i}
        <div
          class="bg-white rounded-lg shadow border border-gray-100 overflow-hidden"
        >
          <!-- Card header with checkbox and menu -->
          <div class="p-2 flex justify-between items-center">
            <div class="w-4 h-4 bg-gray-200 rounded"></div>
            <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>

          <!-- Card image area -->
          <div class="mx-3 h-32 bg-gray-200 rounded-lg"></div>

          <!-- Card content -->
          <div class="p-3">
            <div class="flex justify-between items-center mb-2">
              <div class="w-24 h-2 bg-gray-200 rounded"></div>
            </div>

            <div class="flex mb-2">
              <div class="w-10 h-2 bg-gray-200 rounded mr-2"></div>
              <div class="w-16 h-2 bg-gray-200 rounded"></div>
            </div>

            <div class="flex mb-1">
              <div class="w-14 h-2 bg-gray-200 rounded mr-2"></div>
              <div class="w-24 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
