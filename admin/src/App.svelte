<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Items from "./routes/Items.svelte";
  import Claimants from "./routes/Claimants.svelte";
  import Fallback from "./routes/Fallback.svelte";

  const routes = {
    "/": Login,
    "/dashboard": Dashboard,
    "/items": Items,
    "/claimants": Claimants,
    "*": Fallback,
  };
</script>

<!-- Iwan ko muna as white yung bg para visible yung nav -->
<!-- <main class="w-full h-full bg-[#80000]"> -->
<main class="w-full h-full">
  <Router {routes} />
</main>
