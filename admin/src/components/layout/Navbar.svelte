<script lang="ts">
  import { push, location } from "svelte-spa-router";
  import AdminModal from "../widgets/administrator/AdminModal.svelte";
  import LogoutModal from "../widgets/administrator/LogoutModal.svelte";
  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
    Avatar,
  } from "flowbite-svelte";
  import { admin } from "../../stores/authStore";
  import { onMount } from "svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";

  let showAdminModal = false;
  let showLogoutModal = false;
  let dropdownOpen = false;
  let adminName = "";
  let adminEmail = "";
  let userInitials = "";

  // Nav links metadata
  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/items", label: "Items" },
    { path: "/claimants", label: "Claimants" },
  ];

  onMount(() => {
    if ($admin) {
      adminName = $admin.name || "Admin User";
      adminEmail = $admin.email || "admin@example.com";

      // Generate initials from name
      userInitials = adminName
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("");

      // If we couldn't get initials, use first two letters of name
      if (!userInitials) {
        userInitials = adminName.substring(0, 2).toUpperCase();
      }
    }
  });

  function handleClickOutside(event: any) {
    const dropdown = document.getElementById("dropdownMenu");
    if (dropdown && !dropdown.contains(event.target)) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  // Active route check
  function isActive(path: string): boolean {
    return $location === path || $location.startsWith(path + "/");
  }
</script>

<aside>
  <div
    class="h-full min-h-screen w-70 bg-[#800000] text-white font-[Poppins] flex flex-col p-10"
  >
    <!-- Logo and App Name -->
    <div class="pt-10 px-6 flex flex-col items-start gap-1">
      <div class="bg-white rounded-lg p-2 mb-2">
        <img
          src="/src/assets/svelte.svg"
          alt="PUP-BARK Logo"
          class="h-12 w-12"
        />
      </div>
      <div>
        <h1 class="text-2xl font-bold">PUP-BARK</h1>
        <p class="text-sm text-gray-300 pt-3">What the fuck is this</p>
      </div>
    </div>

    <!-- Navigation Items -->
    <div class="flex-1 flex items-center">
      <nav class="flex flex-col gap-4 w-full">
        {#each navItems as item}
          <a
            href={item.path ? `/#${item.path}` : "#"}
            class="block px-6 py-3 text-lg hover:font-[600] {item.path &&
            isActive(item.path)
              ? 'opacity-100 font-[600]'
              : 'opacity-80'}"
            on:click|preventDefault={() => {
              if (item.path) {
                push(item.path);
              }
            }}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>

    <div class="mt-auto py-4">
      <Button
        color="alternative"
        class="w-full text-[#800000] border-[#800000] hover:text-red-800 focus:text-red-800 active:text-red-800 focus:ring-0 focus:outline-none bg-white shadow-md rounded-lg"
        on:click={() => (dropdownOpen = !dropdownOpen)}
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <Avatar>{userInitials}</Avatar>
            <span class="text-left">Account</span>
          </div>
          <ChevronDownOutline
            class={`h-5 w-5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            style="color: #800000;"
          />
        </div>
      </Button>
      <Dropdown
        id="dropdownMenu"
        class="w-48 bg-white text-gray-800 rounded-xl shadow-lg"
      >
        <DropdownItem
          class="text-gray-800"
          on:click={() => {
            showAdminModal = true;
            dropdownOpen = false;
          }}
        >
          Account Details
        </DropdownItem>
        <DropdownItem
          class="text-gray-800"
          on:click={() => {
            showLogoutModal = true;
            dropdownOpen = false;
          }}
        >
          Log Out
        </DropdownItem>
      </Dropdown>
    </div>
  </div>
</aside>

{#if showAdminModal}
  <AdminModal
    bind:showModal={showAdminModal}
    closeModal={() => {
      showAdminModal = false;
    }}
  />
{/if}

{#if showLogoutModal}
  <LogoutModal
    bind:showModal={showLogoutModal}
    closeModal={() => (showLogoutModal = false)}
  />
{/if}
