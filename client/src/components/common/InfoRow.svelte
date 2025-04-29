<script lang="ts">
  export let label: string;
  export let value: string;
</script>

<div class="flex border border-stone-300 rounded-lg px-5 py-3">
  <p class="text-sm md:text-base font-medium text-stone-400">
    <span class="text-stone-600">{label}:</span>
    {value}
  </p>
</div>
