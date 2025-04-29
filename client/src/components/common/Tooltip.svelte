<script lang="ts">
  import { onClickOutside } from "../../lib/utils/onClickOutside";

  export let text: string;
  export let position: "top" | "left" | "bottom" = "top";

  let showTooltip = false;
  function toggleTooltip() {
    showTooltip = !showTooltip;
  }

  function closeTooltip() {
    showTooltip = false;
  }
</script>

<div
  class="group relative"
  role="button"
  tabindex="0"
  on:click={toggleTooltip}
  on:keydown={(e) =>
    e.key === "Enter" || e.key === " " ? toggleTooltip() : null}
  use:onClickOutside={closeTooltip}
>
  <slot />
  <!-- Tooltip -->
  <div
    class={`absolute z-10 p-4 md:p-6 bg-[#800000] rounded-lg ${
      showTooltip
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    } transition-opacity duration-300 ${
      position === "top"
        ? "w-46 sm:w-full bottom-full mb-4 left-1/2 transform -translate-x-1/2"
        : position === "left"
          ? "w-52 md:w-72 -left-56 md:-left-76 mr-52 top-1/2 transform -translate-y-1/2"
          : position === "bottom"
            ? "w-44 top-full mt-3 right-0"
            : ""
    } shadow-xl shadow-stone-800/50`}
  >
    {@html text}
    <!-- Safe Area -->
    <div
      class={`${
        position === "top"
          ? "absolute w-full h-8 left-1/2 transform -translate-x-1/2 translate-y-4"
          : position === "left"
            ? "absolute h-1/2 top-0 left-full w-8 transform translate-y-1/2"
            : position === "bottom"
              ? "hidden"
              : ""
      }`}
    ></div>
    <!-- Arrow -->
    <div
      class={`absolute w-0 h-0 ${
        position === "top"
          ? "right-16 bottom-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#800000] transform translate-y-full"
          : position === "left"
            ? "left-full border-t-[6px] border-b-[6px] border-l-[6px] border-l-[#800000] border-b-transparent border-t-transparent transform -translate-y-22 md:-translate-y-16"
            : position === "bottom"
              ? "bottom-full right-0 -translate-x-2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#800000]"
              : ""
      }`}
    ></div>
  </div>
</div>
