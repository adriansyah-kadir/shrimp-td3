<script lang="ts">
  import CustomChart from "./custom-chart.svelte";

  const {
    states,
    loading,
    error,
  }: {
    states: Record<string, any>[];
    loading?: boolean;
    error?: boolean;
  } = $props();

  const values = $derived(states.map((e, i) => ({ ...e, i })));

  let chart: CustomChart | undefined = $state();
  let colors: string[] = $state([]);

  $effect(() => {
    colors = chart?.defaultColors ?? colors;
  });
</script>

<div class="card card-border bg-base-100">
  <div class="card-body">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="card-title">
          {#if loading}
            <span class="loading loading-spinner"></span>
          {/if}
          Parameter Kualitas Air
        </h2>
        <span class="text-muted-foreground text-sm"
          >{new Date(values[0]["timestamp"]).toLocaleString("id")} ~ {new Date(
            values.at(-1)!["timestamp"],
          ).toLocaleString("id")}</span
        >
      </div>
      {#if chart}
        <div class="flex flex-wrap gap-5">
          {#each chart.keys as key, i}
            {@const value = values.at(-1)![
              key as keyof (typeof values)[0]
            ] as number}
            <div class="flex flex-col gap-0">
              <div class="flex items-center gap-1">
                <div
                  style="background-color: {colors[i % colors.length]};"
                  class="w-2 h-2 text-sm"
                ></div>
                <h6 class="leading-4">{key}</h6>
              </div>
              <div class:skeleton={loading}>
                <small class="text-muted-foreground" class:opacity-0={loading}
                  >{value.toFixed(2)}</small
                >
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    <div class="my-5">
      <CustomChart
        bind:this={chart}
        {values}
        x="i"
        label={(i) => new Date(values[i]["timestamp"]).toLocaleTimeString("id")}
      />
    </div>
    <div class="flex flex-col gap-6">
      <div class="leading-none font-semibold">Keterangan Parameter</div>
      <div data-slot="card-content">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-red-500 rounded"></div>
            <span class="text-sm">Suhu (°C) - Ideal: 28°C</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-blue-500 rounded"></div>
            <span class="text-sm">Salinitas (ppt) - Ideal: 26</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-cyan-500 rounded"></div>
            <span class="text-sm">Turbidity (NTU) - Ideal: 28</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-gray-500 rounded"></div>
            <span class="text-sm">pH - Ideal: 7.5-8.5</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-green-500 rounded"></div>
            <span class="text-sm">Oksigen (mg/L) - Ideal: 5</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-yellow-500 rounded"></div>
            <span class="text-sm">Ammonia (mg/L) - Ideal: &lt;0.1</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
