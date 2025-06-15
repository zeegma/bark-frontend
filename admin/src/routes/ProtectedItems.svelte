<!-- ProtectedItems.svelte -->
<script lang="ts">
  import ProtectedRoute from "./ProtectedRoute.svelte";
  import Items from "./Items.svelte";
</script>

<ProtectedRoute component={Items} />
