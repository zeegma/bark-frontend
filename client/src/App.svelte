<script lang="ts">
  import Router from "svelte-spa-router";
  import Items from "./routes/Items.svelte";
  import Claim from "./routes/Claim.svelte";
  import Fallback from "./routes/Fallback.svelte";

  const routes = {
    "/": Items,
    "/claim": Claim,
    "*": Fallback,
  }

</script>

<Router {routes} />
