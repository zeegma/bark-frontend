<script lang="ts">
  import Card from "./Card.svelte";
  import ViewModal from "../widgets/claimants/ViewModal.svelte";
  import { Checkbox } from "flowbite-svelte";
  import { claimsData } from "../../lib/mockData";
  import { sortStore, type SortOptions } from "../../stores/sortStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";

  let viewModal: boolean = false;
  let selectedClaim: ClaimItem | null = null;

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
  let isAllSelected: boolean;
  let selectedIds: Set<string>;

  // Sample mapping for images
  const hasImageMap: Record<string, boolean> = {
    CLM0001: true,
    CLM0003: true,
    CLM0004: true,
    CLM0005: true,
  };

  // Function to determine if claim has photo
  function shouldShowImage(id: string): boolean {
    return hasImageMap[id] || false;
  }

  sortStore.subscribe((options) => {
    currentSortOptions = options;
    applySorting();
  });

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
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

  // Handle select all function
  function handleSelectAll() {
    selectionActions.toggleSelectAll(claims.map((claim) => claim.id));
  }

  function handleCardDoubleClick(claim: ClaimItem) {
    selectedClaim = claim;
    viewModal = true;
  }

  // Initial sort
  applySorting();
</script>

<div>
  <!-- Select all -->
  <div class="sticky top-0 z-10 bg-white pb-3 pl-1 flex items-center">
    <Checkbox
      checked={isAllSelected}
      on:change={handleSelectAll}
      color="red"
      class="cursor-pointer"
    />
    <span class="ml-2 text-sm text-gray-700">Select All</span>
  </div>

  <!-- Main content grid -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    {#each claims as claim (claim.id)}
      <Card
        {claim}
        id={claim.id}
        name={claim.name}
        phone={claim.phone}
        dateFiled={claim.dateFiled}
        hasImage={shouldShowImage(claim.id)}
        onDoubleClick={handleCardDoubleClick}
      />
    {/each}
  </div>
</div>
<ViewModal bind:open={viewModal} claim={selectedClaim} />
