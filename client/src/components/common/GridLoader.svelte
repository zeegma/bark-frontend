<script lang="ts"></script>

<!-- Skeleton Loader -->
<div class="flex flex-col gap-4 p-4 -mt-4 px-2 md:px-12 xl:px-24 bg-gray-100">
  <!-- Header Skeleton -->
  <div class="flex flex-row gap-4 py-4 px-4 rounded-lg bg-white">
    <div class="h-10 w-full flex-1/6 bg-gray-300 rounded-lg animate-pulse"></div>
    <div class="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>
    <div class="h-10 w-full flex-1/6 bg-gray-300 rounded-lg animate-pulse"></div>
  </div>
  <!-- Content Skeleton -->
  <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {#each Array(8) as _, i}
      <div class="bg-white p-6 rounded-2xl space-y-4 animate-pulse">
        <div class="h-8 bg-gray-300 rounded-lg w-full"></div>
        <div class="h-48 bg-gray-300 rounded-xl"></div>
        <div class="h-6 bg-gray-300 rounded-lg w-3/4"></div>
        <div class="h-6 bg-gray-300 rounded-lg w-1/2"></div>
        <div class="h-12 bg-gray-300 rounded-lg w-full"></div>
      </div>
    {/each}
  </div>
</div>
