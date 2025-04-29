<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Items from "./routes/Items.svelte";
  import Claimants from "./routes/Claimants.svelte";
  import Fallback from "./routes/Fallback.svelte";
  import Register from "./routes/Register.svelte";

  const routes = {
    "/": Login,
    "/register": Register,
    "/dashboard": Dashboard,
    "/items": Items,
    "/claimants": Claimants,
    "*": Fallback,
  };
</script>

<!-- Iwan ko muna as white yung bg para visible yung nav -->
<main class="w-full h-full text-[#1E1E1E]">
  <Router {routes} />
</main>
