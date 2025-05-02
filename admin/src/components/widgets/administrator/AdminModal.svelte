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
    } catch (err) {
      error = "Failed to load admin details.";
    } finally {
      loading = false;
    }
  });

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutAdmin(refreshToken);
      }
      console.log("Logging out with refreshToken:", refreshToken);
      // Clear auth state and redirecting
      logout();
      closeModal();
      push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const currentAdmin = get(admin);
      const token = get(accessToken);
      await deleteAdminAccount(currentAdmin.id);
      logout();
      closeModal();
      location.reload();
    } catch (err) {
      alert("Failed to delete account.");
    }
  };
</script>

<Modal size="lg" bind:open={showModal} on:close={closeModal}>
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
          on:click={() => (showDeleteModal = true)}
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    {/if}
  </div>
</Modal>

{#if showDeleteModal}
  <DeleteAdmin bind:open={showDeleteModal} adminId={adminDetails.id} />
{/if}
