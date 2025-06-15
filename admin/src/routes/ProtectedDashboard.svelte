<!-- ProtectedDashboard.svelte -->
<script lang="ts">
  import ProtectedRoute from "./ProtectedRoute.svelte";
  import Dashboard from "./Dashboard.svelte";
</script>

<ProtectedRoute component={Dashboard} />
