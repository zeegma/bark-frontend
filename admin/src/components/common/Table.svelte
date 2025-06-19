<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
  } from "flowbite-svelte";
  import {
    InfoCircleOutline,
    TrashBinSolid,
    FileZipSolid,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { fetchClaimants } from "../../lib/api";
  import type { ClaimantResponse, ClaimItem } from "../../lib/types";
  import ViewModal from "../widgets/claimants/ViewModal.svelte";
  import DeleteModal from "../widgets/claimants/DeleteModal.svelte";
  import EmptyFallback from "./EmptyFallback.svelte";
  import SkeletonLoader from "./SkeletonLoader.svelte";
  import { sortStore, type SortOptions } from "../../stores/sortStore";
  import { searchStore } from "../../stores/searchStore";
  import {
    selectionStore,
    selectionActions,
  } from "../../stores/selectionStore";
  import {
    dateFilterStore,
    type DateFilterOptions,
  } from "../../stores/dateFilterStore";

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
  let filteredClaims: ClaimItem[] = [];
  let currentSortOptions: SortOptions;
  let currentDateFilter: DateFilterOptions;
  let selectedIds: Set<string>;
  let isAllSelected: boolean;
  let allClaimsData: ClaimItem[] = [];
  let isFilteredEmpty = false;

  let currentSearchTerm = "";
  let isSearchActive = false;

  sortStore.subscribe((options) => {
    currentSortOptions = options;
    applyFiltersAndSorting();
  });

  dateFilterStore.subscribe((options) => {
    currentDateFilter = options;
    applyFiltersAndSorting();
  });

  selectionStore.subscribe((state) => {
    selectedIds = state.selectedIds;
    isAllSelected = state.isAllSelected;
  });

  searchStore.subscribe((term) => {
    currentSearchTerm = term;
    isSearchActive = term.length > 0;
    applyFiltersAndSorting();
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

  // Function to apply date filters
  function applyDateFilter(items: ClaimItem[]): ClaimItem[] {
    if (
      !currentDateFilter.isActive ||
      (!currentDateFilter.startDate && !currentDateFilter.endDate)
    ) {
      // Return all items if no filter is active
      return items;
    }

    return items.filter((item) => {
      // Parse the dateFiled string to a Date object
      const itemDate = new Date(item.dateFiled);

      // Single date filter case (when only startDate is set)
      if (currentDateFilter.startDate && !currentDateFilter.endDate) {
        const filterDate = new Date(currentDateFilter.startDate);
        return (
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate()
        );
      }

      // Date range case
      const startDate = currentDateFilter.startDate
        ? new Date(currentDateFilter.startDate.setHours(0, 0, 0, 0))
        : null;

      const endDate = currentDateFilter.endDate
        ? new Date(currentDateFilter.endDate.setHours(23, 59, 59, 999))
        : null;

      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;

      return isAfterStart && isBeforeEnd;
    });
  }

  // Function to apply all filters and sorting
  function applyFiltersAndSorting() {
    if (!allClaimsData.length) return;

    // First apply date filters
    filteredClaims = applyDateFilter(allClaimsData);

    // Then apply search filter
    if (currentSearchTerm) {
      const searchTermLower = currentSearchTerm.toLowerCase();
      filteredClaims = filteredClaims.filter((claim) =>
        claim.name.toLowerCase().includes(searchTermLower),
      );
    }

    // Then apply sorting
    filteredClaims = [...filteredClaims].sort((a: ClaimItem, b: ClaimItem) => {
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
          const dateA = new Date(a.dateFiled).getTime();
          const dateB = new Date(b.dateFiled).getTime();
          return (dateA - dateB) * multiplier;
        case "id":
          return (parseInt(a.id) - parseInt(b.id)) * multiplier;
        default:
          return 0;
      }
    });

    // Update the claims variable used for rendering
    claims = filteredClaims;

    // Determine if empty is due to filtering
    isFilteredEmpty =
      claims.length === 0 &&
      allClaimsData.length > 0 &&
      currentDateFilter.isActive &&
      !isSearchActive;
  }

  // Handle select all checkbox
  function handleSelectAll() {
    selectionActions.toggleSelectAll(claims.map((claim) => claim.id));
  }

  // Handle individual item selection
  function handleSelectItem(id: string) {
    selectionActions.toggleSelection(id);
  }

  function handleDeletionComplete(event: DeleteCompleteEvent) {
    const { deletedIds } = event.detail;
    // Remove deleted items from the claims array
    allClaimsData = allClaimsData.filter(
      (claim) => !deletedIds.includes(claim.id),
    );
    claims = claims.filter((claim) => !deletedIds.includes(claim.id));
    applyFiltersAndSorting();

    // Clear selection if needed
    if (deletedIds.length > 0) {
      selectionActions.clearSelection();
    }
  }

  // Fetch data on component mount
  onMount(() => {
    const fetchData = async () => {
      try {
        const claimantData = await fetchClaimants();
        allClaimsData = transformClaimantData(claimantData);
        applyFiltersAndSorting();
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

    // Return cleanup function
    return () => {
      document.removeEventListener("deletecomplete", handleDeleteEvent);
    };
  });
</script>

{#if loading}
  <div class="flex justify-center items-center h-full pb-10">
    <SkeletonLoader type="table" count={6} />
  </div>
{:else if error}
  <div class="flex justify-center items-center h-full flex-col text-gray-800">
    <FileZipSolid class="w-20 h-20 mb-4 text-[#800000]" />
    <p>Error loading data: {error}</p>
    <button
      class="mt-4 px-4 py-2 bg-[#800000] text-white rounded"
      on:click={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
{:else if claims.length === 0}
  <EmptyFallback type="claimants" />
{:else}
  <Table hoverable={true} class="w-full table-fixed text-center overflow-auto">
    <TableHead>
      <TableHeadCell class="p-4 w-12">
        <Checkbox
          checked={isAllSelected}
          on:change={handleSelectAll}
          color="red"
          class="cursor-pointer"
        />
      </TableHeadCell>
      <TableHeadCell class="p-4">Claimant ID</TableHeadCell>
      <TableHeadCell class="p-4">Claimant Name</TableHeadCell>
      <TableHeadCell class="p-4">Phone Number</TableHeadCell>
      <TableHeadCell class="p-4">Facebook</TableHeadCell>
      <TableHeadCell class="p-4">Date Filed</TableHeadCell>
      <TableHeadCell class="p-4 w-20">Item ID</TableHeadCell>
      <TableHeadCell class="p-4">Item Requested</TableHeadCell>
      <TableHeadCell class="p-4 w-24">
        <span class="sr-only">Actions</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each claims as claim}
        <TableBodyRow
          class={selectedIds.has(claim.id)
            ? "h-16 bg-red-100 hover:bg-red-200"
            : "h-16"}
        >
          <TableBodyCell class="p-4">
            <Checkbox
              checked={selectedIds.has(claim.id)}
              on:change={() => handleSelectItem(claim.id)}
              color="red"
              class="cursor-pointer"
            />
          </TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600">{claim.id}</TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 truncate"
            >{claim.name}</TableBodyCell
          >
          <TableBodyCell class="p-2 text-gray-600">{claim.phone}</TableBodyCell>
          <TableBodyCell class="p-2 text-gray-600 truncate"
            >{claim.facebook}</TableBodyCell
          >
          <TableBodyCell class="p-2 text-gray-600"
            >{claim.dateFiled}</TableBodyCell
          >
          <TableBodyCell class="p-2 text-gray-600">{claim.itemId}</TableBodyCell
          >
          <TableBodyCell class="p-2 text-gray-600 truncate"
            >{claim.itemRequested}</TableBodyCell
          >
          <TableBodyCell class="p-4 flex gap-2 justify-center">
            <button
              class="text-gray-900 hover:text-red-900 dark:text-gray-200 dark:hover:text-red-400"
              on:click={() => {
                viewModal = true;
                selectedClaim = claim;
              }}
            >
              <InfoCircleOutline size="lg" />
              <span class="sr-only">View</span>
            </button>
            <button
              class="text-gray-900 hover:text-red-900 dark:text-gray-200 dark:hover:text-red-400"
              on:click={() => {
                deleteModal = true;
                selectedClaim = claim;
              }}
            >
              <TrashBinSolid size="lg" />
              <span class="sr-only">Delete</span>
            </button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  <ViewModal bind:open={viewModal} claim={selectedClaim} />
  <DeleteModal
    bind:open={deleteModal}
    claim={selectedClaim}
    idsToDelete={bulkDeleteIds}
  />
{/if}
