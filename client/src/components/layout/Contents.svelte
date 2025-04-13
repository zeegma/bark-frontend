<script lang="ts">
  import GridView from "../views/GridView.svelte";
  import ListView from "../views/ListView.svelte";

  export let items: any[];
  export let view: string;
</script>

<div class="font-[Poppins] xl:px-24">
  {#if view === "grid"}
    <GridView {items} />
  {:else}
    <ListView {items} />
  {/if}
</div>