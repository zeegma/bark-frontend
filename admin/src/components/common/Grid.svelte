<script lang="ts">
  import Card from "./Card.svelte";
  import ViewModal from "../widgets/claimants/ViewModal.svelte";
  import DeleteModal from "../widgets/claimants/DeleteModal.svelte";
  import EmptyFallback from "./EmptyFallback.svelte";
  import { Checkbox, Spinner } from "flowbite-svelte";
  import { fetchClaimants } from "../../lib/api";
  import { onMount } from "svelte";
  import type { ClaimantResponse, ClaimItem } from "../../lib/types";
  import { dropdownActions } from "../../stores/dropdownStore";
  import { sortStore, type SortOptions } from "../../stores/sortStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";

  type DeleteCompleteEvent = CustomEvent<{ deletedIds: string[] }>;

  // For view modal
  let viewModal: boolean = false;

  // For delete modal
  let deleteModal: boolean = false;

  // For bulk delete
  let bulkDeleteIds: string[] = [];

  let selectedClaim: ClaimItem | null = null;
  let loading: boolean = true;
  let error: string | null = null;

  // Create a local copy of the claims data to sort
  let claims: ClaimItem[] = [];
  let currentSortOptions: SortOptions;
  let selectedIds: Set<string>;
  let isAllSelected: boolean;

  sortStore.subscribe((options) => {
    currentSortOptions = options;
    applySorting();
  });

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
  });

  // Function to transform API response to internal format
  function transformClaimantData(apiData: ClaimantResponse[]): ClaimItem[] {
    return apiData.map((item) => ({
      id: item.id.toString(),
      name: item.name,
      phone: item.number,
      facebook: item.media,
      dateFiled: item.request_date,
      itemId: item.item_id.toString(),
      itemRequested: item.item_name,
      itemPhoto: item.item_image_url,
      detailedDescription: item.detailed_description,
      ownershipProofPhoto: item.ownership_photo,
      hasImage: !!item.ownership_photo,
    }));
  }

  // Function to sort the claims data
  function applySorting() {
    if (!claims.length) return;

    claims = [...claims].sort((a: ClaimItem, b: ClaimItem) => {
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
          return (parseInt(a.id) - parseInt(b.id)) * multiplier;
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

  function handleViewClick(claim: ClaimItem) {
    selectedClaim = claim;
    viewModal = true;
  }

  function handleDeleteClick(claim: ClaimItem) {
    selectedClaim = claim;
    deleteModal = true;
  }

  function handleDeletionComplete(event: DeleteCompleteEvent) {
    const { deletedIds } = event.detail;
    // Remove deleted items from the claims array
    claims = claims.filter((claim) => !deletedIds.includes(claim.id));

    // Clear selection if needed
    if (deletedIds.length > 0) {
      selectionActions.clearSelection();
    }
  }

  // Global click handler: close dropdowns when clicking outside
  onMount(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const clickedOnDropdown = (event.target as Element).closest(
        "[role='dialog']",
      );
      const clickedOnMenu = (event.target as Element).closest(
        "[class^='dots-menu-']",
      );
      if (!clickedOnDropdown && !clickedOnMenu) {
        dropdownActions.closeAll();
      }
    };

    const handleScroll = () => {
      dropdownActions.closeAll();
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("scroll", handleScroll, true);

    // Define and call async fetch logic inside
    const fetchData = async () => {
      try {
        const claimantData = await fetchClaimants();
        claims = transformClaimantData(claimantData);
        applySorting();
      } catch (e) {
        error = e instanceof Error ? e.message : "Failed to fetch data";
        console.error(error);
      } finally {
        loading = false;
      }
    };

    fetchData();

    const handleDeleteEvent = ((e: Event) =>
      handleDeletionComplete(e as DeleteCompleteEvent)) as EventListener;
    document.addEventListener("deletecomplete", handleDeleteEvent);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("deletecomplete", handleDeleteEvent);
    };
  });

  // Initial sort
  applySorting();
</script>

{#if loading}
  <div class="flex justify-center items-center h-full pb-10">
    <Spinner color="red" size={20} />
  </div>
{:else if error}
  <div
    class="flex justify-center items-center h-full flex-col p-8 text-[#800000]"
  >
    <p>Error loading data: {error}</p>
    <button
      class="mt-4 px-4 py-2 bg-[#800000] text-white rounded"
      on:click={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
{:else if claims.length === 0}
  <EmptyFallback />
{:else}
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
      {#each claims as claim, index (claim.id)}
        <Card
          {index}
          {claim}
          id={claim.id}
          onDoubleClick={handleCardDoubleClick}
          onViewClick={handleViewClick}
          onDeleteClick={handleDeleteClick}
        />
      {/each}
    </div>
  </div>
  <ViewModal bind:open={viewModal} claim={selectedClaim} />
  <DeleteModal
    bind:open={deleteModal}
    claim={selectedClaim}
    idsToDelete={bulkDeleteIds}
  />
{/if}
