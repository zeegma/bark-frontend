<script lang="ts">
  export let text: string;
</script>

<div class="group relative">
  <slot />
  <div
    class="absolute w-full z-10 px-6 py-6 bg-[#800000] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full mb-4 left-1/2 transform -translate-x-1/2 pointer-events-none group-hover:pointer-events-auto shadow-xl shadow-stone-800/50"
  >
    {@html text}
    <div
      class="absolute w-full h-8 left-1/2 transform -translate-x-1/2 translate-y-4"
    ></div>
    <div
      class="absolute left-1/2 bottom-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#800000] transform - translate-x-24 translate-y-full"
    ></div>
  </div>
</div>
