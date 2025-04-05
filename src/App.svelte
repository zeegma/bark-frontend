<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main class="text-center p-4">
  <div class="flex justify-center items-center">
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img
        src={viteLogo}
        alt="Vite Logo"
        class="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
      />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img
        src={svelteLogo}
        alt="Svelte Logo"
        class="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#ff3e00aa]"
      />
    </a>
  </div>

  <h1 class="text-4xl font-bold my-4">Test main app w/ tailwind (Ugly AF)</h1>

  <div class="my-6 p-6 bg-white rounded-xl shadow-sm inline-block">
    <Counter />
  </div>

  <p class="my-4">
    Check out
    <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer"
      class="text-blue-500 underline hover:text-blue-700"
    >
      SvelteKit
    </a>
    , the official Svelte app framework powered by Vite!
  </p>

  <p class="text-gray-500">Click on the Vite and Svelte logos to learn more</p>
</main>
