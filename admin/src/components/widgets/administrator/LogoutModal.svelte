<script lang="ts">
  import { Modal, Button, Spinner } from "flowbite-svelte";
  import { logoutAdmin } from "../../../lib/api/admin";
  import { logout } from "../../../stores/authStore";
  import { push } from "svelte-spa-router";
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";

  export let showModal: boolean;
  export let closeModal: () => void;
  let loggingOut = false;

  let loading = false;
  let error: string | null = null;
  let refreshToken: string | null = localStorage.getItem("refreshToken");

  const handleLogout = async () => {
    try {
      loading = true;
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
    } catch (err: any) {
      console.error("Logout failed:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  };
</script>

<Modal
  size="xs"
  bind:open={showModal}
  on:close={closeModal}
  class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg flex flex-col text-center"
  placement="center"
  autoclose={false}
>
  <svelte:fragment slot="header">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Log out</h1>
    </div>
  </svelte:fragment>

  <div class="flex justify-center">
    <ArrowRightToBracketOutline
      class="text-red-700 w-24 h-24 dark:text-gray-200"
    />
  </div>

  <div class="p-4">
    <h3 class="text-lg font-normal text-gray-800 dark:text-gray-400">
      Are you sure you want to log out?
    </h3>

    {#if error}
      <p class="text-red-500 mt-2">{error}</p>
    {/if}
  </div>

  <div class="mb-3 flex gap-3 justify-center">
    <Button
      color="alternative"
      class="hover:text-red-800 border-red-800 text-[#800000]"
      on:click={closeModal}
    >
      No, cancel
    </Button>

    <Button color="red" on:click={handleLogout}>
      {#if loggingOut}
        <div class="flex items-center gap-x-2">
          <Spinner color="white" size={5} />
          Logging out
        </div>
      {:else}
        Yes, I'm sure
      {/if}
    </Button>
  </div>
</Modal>
