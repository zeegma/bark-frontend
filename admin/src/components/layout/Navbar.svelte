<script lang="ts">
  import { push, location } from "svelte-spa-router";

  // Nav links metadata
  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/items", label: "Items" },
    { path: "/claimants", label: "Claimants" },
  ];

  // Active route check
  function isActive(path: string): boolean {
    return $location === path || $location.startsWith(path + "/");
  }
</script>

<aside>
  <div
    class="h-full min-h-screen w-70 bg-[#800000] text-white font-[Poppins] flex flex-col p-10"
  >
    <!-- Logo and App Name -->
    <div class="pt-10 px-6 flex flex-col items-start gap-1">
      <div class="bg-white rounded-lg p-2 mb-2">
        <img
          src="/src/assets/svelte.svg"
          alt="PUP-BARK Logo"
          class="h-12 w-12"
        />
      </div>
      <div>
        <h1 class="text-2xl font-bold">PUP-BARK</h1>
        <p class="text-sm text-gray-300 pt-3">What the fuck is this</p>
      </div>
    </div>

    <!-- Navigation Items -->
    <div class="flex-1 flex items-center">
      <nav class="flex flex-col gap-4 w-full">
        {#each navItems as item}
          <a
            href="/#${item.path}"
            class="block px-6 py-3 text-lg hover:font-[600] {isActive(item.path)
              ? 'opacity-100 font-[600]'
              : 'opacity-80'}"
            on:click|preventDefault={() => push(item.path)}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  </div>
</aside>
