<script lang="ts">
  import toasts from "$lib/stores/toasts";
  import Alert from "$lib/ui/alert.svelte";
  import "../app.css";
  let { children } = $props();
</script>

{@render children?.()}

<div class="toast toast-top">
  {#each $toasts as toast}
    <Alert {...toast} />
  {/each}
</div>
