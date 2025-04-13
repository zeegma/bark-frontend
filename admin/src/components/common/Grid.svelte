<script lang="ts">
  import Card from "./Card.svelte";
  import { claimsData } from "../../lib/mockData";
  import { sortStore, type SortOptions } from "../../stores/sortStore";

  type ClaimItem = {
    id: string;
    name: string;
    phone: string;
    facebook: string;
    dateFiled: string;
    itemId: string;
    itemRequested: string;
    hasImage?: boolean;
  };

  export let claims: ClaimItem[] = [...claimsData];
  let currentSortOptions: SortOptions;

  // Sample mapping for images
  const hasImageMap: Record<string, boolean> = {
    CLM0001: true,
    CLM0003: true,
    CLM0004: true,
    CLM0005: true,
  };

  // Function to determine if claim has photo
  const shouldShowImage = (id: string): boolean => {
    return hasImageMap[id] || false;
  };

  sortStore.subscribe((options) => {
    currentSortOptions = options;
    applySorting();
  });

  // Function to sort the claims data
  function applySorting() {
    claims = [...claimsData].sort((a: ClaimItem, b: ClaimItem) => {
      const { sortBy, sortOrder } = currentSortOptions;
      const multiplier = sortOrder === "Ascending" ? 1 : -1;

      // Handle diff field types for sorting
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name) * multiplier;
        case "itemRequested":
          return a.itemRequested.localeCompare(b.itemRequested) * multiplier;
        case "facebook":
          return a.facebook.localeCompare(b.facebook) * multiplier;
        case "dateFiled":
          return a.dateFiled.localeCompare(b.dateFiled) * multiplier;
        case "id":
          return a.id.localeCompare(b.id) * multiplier;
        default:
          return 0;
      }
    });
  }

  // Initial sort
  applySorting();
</script>

<div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    {#each claims as claim (claim.id)}
      <Card
        id={claim.id}
        name={claim.name}
        dateFiled={claim.dateFiled}
        phone={claim.phone}
        hasImage={shouldShowImage(claim.id)}
      />
    {/each}
  </div>
</div>
