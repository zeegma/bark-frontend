<script lang="ts">
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import { Button, Spinner, Modal } from "flowbite-svelte";
  import { deleteAdminAccount } from "../../../lib/api/admin";
  import { logout } from "../../../stores/authStore";
  import { push } from "svelte-spa-router";

  export let adminId: number;
  export let open = false;
  let deleting = false;

  const handleDelete = async () => {
    deleting = true;
    try {
      const success = await deleteAdminAccount(adminId);
      if (success) {
        logout(); // clear tokens
        push("/").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      } else {
        console.error("Failed to delete admin account");
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
    } finally {
      deleting = false;
      open = false;
    }
  };

  const closeModal = () => {
    open = false;
  };
</script>

<Modal
  bind:open
  size="sm"
  class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg flex flex-col text-center"
  placement="center"
  autoclose={false}
>
  <div class="flex justify-center">
    <ExclamationCircleOutline
      class="mx-auto mb-6 text-red-700 w-24 h-24 dark:text-gray-200"
    />
  </div>

  <h1 class="mb-2 text-4xl font-semibold text-gray-800">Delete Account</h1>
  <h3 class="mb-8 text-lg font-normal text-gray-800 dark:text-gray-400">
    Are you sure you want to delete your admin account?
  </h3>

  <div class="mb-3 flex gap-3 justify-center">
    <Button
      color="alternative"
      class="hover:text-red-800 border-red-800 text-[#800000]"
      on:click={closeModal}
    >
      No, cancel
    </Button>

    <Button color="red" on:click={handleDelete}>
      {#if deleting}
        <div class="flex items-center gap-x-2">
          <Spinner color="white" size={5} />
          Deleting
        </div>
      {:else}
        Yes, I'm sure
      {/if}
    </Button>
  </div>
</Modal>
