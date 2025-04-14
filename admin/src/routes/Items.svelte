<script lang="ts">
  import Layout from "../components/layout/Layout.svelte";
  import Modal from "../components/widgets/ItemModal.svelte";
</script>

<Layout title="Items">
  <div class="p-2">
    <!-- use "edit" for edit item and "view" for view item-->
    <Modal mode="add" />
    <Modal mode="edit" />
    <Modal mode="view" />
    <br />
  </div>
</Layout>
