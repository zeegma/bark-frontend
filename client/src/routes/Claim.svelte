<script lang="ts">
  import Header from "../components/layout/Header.svelte";
  import { onMount } from "svelte";
  import { getQueryParameter } from "../lib/utils/queryParser";
  import { fetchItemDetails } from "../lib/api/fetch";

  let itemId: string | null = null;
  let itemDetails: any = null;
  let isLoading: boolean = true;

  onMount(() => {
    itemId = getQueryParameter("id");
    if (itemId) {
      fetchItemDetails(itemId)
        .then((data) => {
          itemDetails = data;
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
        })
        .finally(() => {
          isLoading = false;
        });
    } else {
      isLoading = false;
    }
  });
</script>

<Header />

{#if isLoading}
  <p>Loading...</p>
{:else if !itemDetails}
  <p>Item not found.</p>
{:else}
  <p>Item details and Claim Form</p>
{/if}
