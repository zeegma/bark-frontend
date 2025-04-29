<script lang="ts">
  import { onMount } from "svelte";

  let time: Date = $state(new Date());

  let hours = $derived(time.getHours());
  let minutes = $derived(time.getMinutes());

  // AM/PM
  let period = $derived(hours >= 12 ? "PM" : "AM");

  // Convert to 12-hour format
  let displayHours = $derived(hours % 12 || 12);

  // Format time as H:MM AM/PM (without leading zero for hour)
  let formattedTime = $derived(
    `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`,
  );

  // Format: Month Day, Year
  let formattedDate = $derived(
    time.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  );

  // Combined date and time
  let dateTimeDisplay = $derived(`As of ${formattedDate}, ${formattedTime}`);

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<h3 class="text-gray-500 mb-6">{dateTimeDisplay}</h3>
