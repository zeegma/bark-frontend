<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Items from "./routes/Items.svelte";
  import Claimants from "./routes/Claimants.svelte";
  import Fallback from "./routes/Fallback.svelte";
  import Register from "./routes/Register.svelte";
  import Unauthorized from "./routes/Unauthorized.svelte";
  import ProtectedDashboard from "./routes/ProtectedDashboard.svelte";
  import ProtectedItems from "./routes/ProtectedItems.svelte";
  import ProtectedClaimants from "./routes/ProtectedClaimants.svelte";

  const routes = {
    "/": Login,
    "/register": Register,
    "/dashboard": ProtectedDashboard,
    "/items": ProtectedItems,
    "/claimants": ProtectedClaimants,
    "/unauthorized": Unauthorized,
    "*": Fallback,
  };
</script>

<main class="w-full h-full text-[#1E1E1E]">
  <Router {routes} />
</main>
