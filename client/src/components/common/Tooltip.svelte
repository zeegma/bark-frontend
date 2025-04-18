<script lang="ts">
  export let text: string;
  export let position: "top" | "left" = "top";
</script>

<div class="group relative">
  <slot />
  <!-- Tooltip -->
  <div
    class={`absolute z-10 px-6 py-6 bg-[#800000] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
      position === "top"
        ? "w-full bottom-full mb-4 left-1/2 transform -translate-x-1/2"
        : "w-72 right-54 text-left top-1/2 transform -translate-y-1/2"
    } pointer-events-none group-hover:pointer-events-auto shadow-xl shadow-stone-800/50`}
  >
    {@html text}
    <!-- Safe Area -->
    <div
      class={`${
        position === "top"
          ? "absolute w-full h-8 left-1/2 transform -translate-x-1/2 translate-y-4"
          : "absolute h-1/2 top-0 left-full w-8 transform translate-y-1/2"
      }`}
    ></div>
    <!-- Arrow -->
    <div
      class={`absolute w-0 h-0 ${
        position === "top"
          ? "left-1/2 bottom-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#800000] transform - translate-x-24 translate-y-full"
          : "left-full border-t-[6px] border-b-[6px] border-l-[6px] border-l-[#800000] border-b-transparent border-t-transparent transform -translate-y-16"
      }`}
    ></div>
  </div>
</div>
