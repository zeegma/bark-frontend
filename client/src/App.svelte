<script lang="ts">
  import Router from "svelte-spa-router";
  import Items from "./routes/Items.svelte";
  import Claim from "./routes/Claim.svelte";

  const routes = {
    "/": Items,
    "/claim": Claim,
  }

</script>

<Router {routes} />
