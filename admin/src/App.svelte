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

<main class="w-full h-full p-6">
  <Router {routes} />
</main>
