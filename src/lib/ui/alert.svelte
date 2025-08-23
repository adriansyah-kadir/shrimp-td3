<script module lang="ts">
  export type AlertProps = {
    title: string;
    desc?: string;
    Icon?: Component;
    color?: "info" | "success" | "warning" | "error";
    style?: "soft" | "outline" | "dash";
    cancel?: () => void;
    confirm?: () => void;
  };
</script>

<script lang="ts">
  import type { Component } from "svelte";
  const { title, desc, Icon, color, style, cancel, confirm }: AlertProps =
    $props();
</script>

<div
  role="alert"
  class={[
    "alert alert-vertical sm:alert-horizontal",
    {
      "alert-info": color == "info",
      "alert-success": color == "success",
      "alert-warning": color == "warning",
      "alert-error": color == "error",
      "alert-soft": style == "soft",
      "alert-outline": style == "outline",
      "alert-dash": style == "dash",
    },
  ]}
>
  {#if Icon}
    <Icon />
  {/if}
  <div>
    <h3 class="font-bold">{title}</h3>
    {#if desc}
      <div class="text-xs">{desc}</div>
    {/if}
  </div>
  <div>
    {#if cancel}
      <button onclick={cancel} class="btn btn-sm">Cancel</button>
    {/if}
    {#if confirm}
      <button onclick={confirm} class="btn btn-sm btn-primary">Confirm</button>
    {/if}
  </div>
</div>
