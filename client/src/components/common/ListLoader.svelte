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
  <div class="grid">
    {#each Array(12) as _, i}
      <div class="flex flex-row gap-4 p-4 pb-0 md:pb-6 md:p-6 rounded-lg bg-white">
        <div class="h-10 md:h-14 w-24 md:w-56 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-10 md:h-14 w-full bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-10 md:h-14 w-full md:block hidden flex-1/2 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-10 md:h-14 w-full md:block hidden flex-1/2 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-10 md:h-14 w-16 md:w-full bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="h-10 md:h-14 w-full flex-1/2 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    {/each}
  </div>
</div>
