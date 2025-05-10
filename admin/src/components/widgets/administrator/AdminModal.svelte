<script lang="ts">
  import { Modal, Input, Label } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { getAdminDetail } from "../../../lib/api/admin";
  import { accessToken, admin } from "../../../stores/authStore";
  import { get } from "svelte/store";
  import DeleteAdmin from "./DeleteAdmin.svelte";
  import { formatDate } from "../../../lib/formatDateTime";
  import { UserCircleSolid } from "flowbite-svelte-icons";

  export let showModal: boolean;
  export let closeModal: () => void;

  let showDeleteModal = false;
  let adminDetails: any = null;
  let loading = false;
  let error: string | null = null;
  let dropdownOpen = false;

  onMount(async () => {
    try {
      loading = true;
      const currentAdmin = get(admin);
      const token = get(accessToken);
      adminDetails = await getAdminDetail(currentAdmin.id, token!);
      console.log("Fetched Admin Details:", adminDetails);
    } catch (err: any) {
      console.error(err);
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const handleDeleteClick = () => {
    showDeleteModal = true;
    console.log("Delete account button clicked.");
  };

  const onDeleteModalClose = () => {
    showDeleteModal = false;
    console.log("DeleteAdmin modal closed.");
  };
</script>

<Modal
  size="sm"
  bind:open={showModal}
  on:close={() => {
    closeModal();
    dropdownOpen = false;
  }}
  class={showDeleteModal ? "opacity-0 pointer-events-none" : ""}
>
  <svelte:fragment slot="header">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Admin Details</h1>
    </div>
  </svelte:fragment>

  <div class="px-4 pb-4">
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {:else if adminDetails}
      <div class="space-y-4 text-md">
        <div class="flex justify-center">
          <UserCircleSolid class="w-20 h-20 text-red-800" />
        </div>
        <div>
          <Label for="name" class="font-semibold mb-1">Name</Label>
          <Input id="name" value={adminDetails.name} disabled />
        </div>

        <div>
          <Label for="email" class="font-semibold mb-1">Email</Label>
          <Input id="email" value={adminDetails.email} disabled />
        </div>

        <div>
          <Label for="number" class="font-semibold mb-1">Number</Label>
          <Input id="number" value={adminDetails.number} disabled />
        </div>

        <div>
          <Label for="last_login" class="font-semibold mb-1">Last Login</Label>
          <Input
            id="last_login"
            value={formatDate(adminDetails.last_login) || "N/A"}
            disabled
          />
        </div>
      </div>

      <div class="mt-8 flex justify-end">
        <button
          on:click={handleDeleteClick}
          class="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900"
        >
          Delete Account
        </button>
      </div>
    {/if}
  </div>
</Modal>

{#if showDeleteModal}
  <DeleteAdmin
    bind:open={showDeleteModal}
    adminId={adminDetails.id}
    on:close={onDeleteModalClose}
  />
{/if}
