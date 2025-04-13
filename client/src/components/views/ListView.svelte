<script lang="ts">
  import { categoryOptions } from "../../lib/constants/filters";

  export let items: any[];
</script>

<section>
  {#each items as item (item.id)}
    <div class="flex">
      <div class="row-auto">
        <img
          src={categoryOptions.find((opt) => opt.value === item.category)
            ?.icon}
          alt={item.name}
        />
      </div>
    </div>
  {/each}
</section>