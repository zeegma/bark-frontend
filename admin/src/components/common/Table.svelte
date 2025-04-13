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
  import { InfoCircleOutline, TrashBinSolid } from "flowbite-svelte-icons";
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

  // Create a local copy of the claims data to sort
  let claims: ClaimItem[] = [...claimsData];
  let currentSortOptions: SortOptions;

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

<Table hoverable={true} class="w-full table-fixed text-center overflow-auto">
  <TableHead>
    <TableHeadCell class="p-4 w-16">
      <Checkbox color="red" />
    </TableHeadCell>
    <TableHeadCell class="p-4">Claimant ID</TableHeadCell>
    <TableHeadCell class="p-4">Claimant Name</TableHeadCell>
    <TableHeadCell class="p-4">Phone Number</TableHeadCell>
    <TableHeadCell class="p-4">Facebook</TableHeadCell>
    <TableHeadCell class="p-4">Date Filed</TableHeadCell>
    <TableHeadCell class="p-4">Item ID</TableHeadCell>
    <TableHeadCell class="p-4">Item Requested</TableHeadCell>
    <TableHeadCell class="p-4 w-24">
      <span class="sr-only">Actions</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each claims as claim}
      <TableBodyRow class="h-16">
        <TableBodyCell class="p-4">
          <Checkbox color="red" />
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
        <TableBodyCell class="p-2 text-gray-600">{claim.itemId}</TableBodyCell>
        <TableBodyCell class="p-2 text-gray-600 truncate"
          >{claim.itemRequested}</TableBodyCell
        >
        <TableBodyCell class="p-4 flex gap-2 justify-center">
          <button
            class="text-gray-900 hover:text-red-900 dark:text-gray-200 dark:hover:text-red-400"
          >
            <InfoCircleOutline size="lg" />
            <span class="sr-only">View</span>
          </button>
          <button
            class="text-gray-900 hover:text-red-900 dark:text-gray-200 dark:hover:text-red-400"
          >
            <TrashBinSolid size="lg" />
            <span class="sr-only">Delete</span>
          </button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
