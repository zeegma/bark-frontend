<script lang="ts">
  import Card from "./Card.svelte";
  import { claimsData } from "../../lib/mockData";

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

  export let claims: ClaimItem[] = claimsData;

  // Sample sample
  const hasImageMap: Record<string, boolean> = {
    CLM0001: true,
    CLM0003: true,
    CLM0004: true,
    CLM0005: true,
  };

  // Function to determine if claim has photo or nah
  const shouldShowImage = (id: string): boolean => {
    return hasImageMap[id] || false;
  };
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
