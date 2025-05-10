<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Items from "./routes/Items.svelte";
  import Claimants from "./routes/Claimants.svelte";
  import Fallback from "./routes/Fallback.svelte";
  import Register from "./routes/Register.svelte";
  import Unauthorized from "./routes/Unauthorized.svelte";
  import { accessToken } from "./stores/authStore";
  import { get } from "svelte/store";

  const isAuthenticated = () => !!get(accessToken);

  const protectedRoute = (component: any) => {
    if (!isAuthenticated()) {
      return Unauthorized;
    }
    return component;
  };

  const routes = {
    "/": Login,
    "/register": Register,
    "/dashboard": protectedRoute(Dashboard),
    "/items": protectedRoute(Items),
    "/claimants": protectedRoute(Claimants),
    "/unauthorized": Unauthorized,
    "*": Fallback,
  };
</script>

<!-- Iwan ko muna as white yung bg para visible yung nav -->
<main class="w-full h-full text-[#1E1E1E]">
  <Router {routes} />
</main>
