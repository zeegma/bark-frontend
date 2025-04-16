<script lang="ts">
  import { onMount } from "svelte";
  import { getQueryParameter } from "../lib/utils/queryParser";
  import { fetchItemDetails } from "../lib/api/fetch";
  import Header from "../components/layout/Header.svelte";
  import ItemDetails from "../components/common/ItemDetails.svelte";
  import ClaimForm from "../components/common/ClaimForm.svelte";

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
  <div class="flex flex-col px-24 mt-4 font-[Poppins]">
    <!-- Header -->
    <div
      class="flex border h-[48px] rounded-tl-2xl rounded-tr-2xl border-stone-300"
    >
      <a
        href="/"
        class="flex h-full items-center gap-2 px-6 border-r-1 border-stone-300 text-sm text-[#9A4444] font-medium"
      >
        <svg
          class="w-6 h-6 text-[#9A4444]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
        Return
      </a>
      <h1
        class="flex flex-grow justify-center items-center pr-32 text-sm text-[#9A4444] font-medium"
      >
        {itemDetails.name}
      </h1>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 border rounded-bl-2xl rounded-br-2xl border-stone-300 border-t-0"
    >
      <!-- Item Details -->
      <ItemDetails item={itemDetails} />

      <!-- Claim Form -->
      <ClaimForm itemId={itemId ?? ""} />
    </div>
  </div>
{/if}
