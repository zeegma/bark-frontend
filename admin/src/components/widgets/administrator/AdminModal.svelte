<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { getAdminDetail, deleteAdminAccount } from "../../../lib/api/admin";
  import { accessToken, admin, logout } from "../../../stores/authStore";
  import { logoutAdmin } from "../../../lib/api/admin";
  import { get } from "svelte/store";
  import { push } from "svelte-spa-router";
  import DeleteAdmin from "./DeleteAdmin.svelte";

  export let showModal: boolean;
  export let closeModal: () => void;

  let showDeleteModal = false;
  let adminDetails: any = null;
  let loading = false;
  let error: string | null = null;
  let refreshToken: string | null = localStorage.getItem("refreshToken");

  onMount(async () => {
    try {
      loading = true;
      const currentAdmin = get(admin);
      const token = get(accessToken);
      adminDetails = await getAdminDetail(currentAdmin.id, token!);
    } catch (err: any) {
      console.error(err);
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutAdmin(refreshToken);
      }
      logout();
      closeModal();
      push("/").then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
  size="lg"
  bind:open={showModal}
  on:close={closeModal}
  class={showDeleteModal ? "opacity-0 pointer-events-none" : ""}
>
  <div class="p-4">
    <h3 class="text-xl font-bold mb-2">Admin Details</h3>

    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {:else if adminDetails}
      <div class="space-y-2 text-sm">
        <p><strong>Name:</strong> {adminDetails.name}</p>
        <p><strong>Email:</strong> {adminDetails.email}</p>
        <p><strong>Number:</strong> {adminDetails.number}</p>
        <p><strong>Last Login:</strong> {adminDetails.last_login || "N/A"}</p>
      </div>

      <div class="mt-6 flex gap-4">
        <button
          on:click={handleLogout}
          class="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900"
        >
          Logout
        </button>
        <button
          on:click={handleDeleteClick}
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
