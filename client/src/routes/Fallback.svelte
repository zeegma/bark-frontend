<script lang="ts">
  import fallbark from "/icons/fallbark.svg";
</script>

<div class="flex flex-col items-center justify-center h-dvh px-4">
  <img
    src={fallbark}
    alt="Fallen bark"
    class="w-48 md:w-72 mb-6 md:mb-8"
  />
  <h1
    class="font-[Poppins] font-medium text-center text-xl md:text-3xl text-[#800000] mb-2 md:mb-3"
  >
    Oops! Something went wrong...
  </h1>
  <p
    class="font-[Poppins] font-medium text-sm md:text-lg text-center text-red-400 max-w-72 md:max-w-96"
  >
    We couldn't load the requested content. Please try again later or check your
    connection.
  </p>
</div>
