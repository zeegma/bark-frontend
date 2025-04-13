<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import SortDropdown from "../components/common/SortDropdown.svelte";
  import DatePicker from "../components/common/DatePicker.svelte";
</script>

<Layout title="Claimants">
  <div class="p-2">
    <!-- Filter section -->
    <div class="flex gap-4">
      <SortDropdown />
      <DatePicker />
    </div>
  </div>
</Layout>
