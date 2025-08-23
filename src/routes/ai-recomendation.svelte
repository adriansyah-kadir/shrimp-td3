<script lang="ts">
  import states from "$lib/stores/states";
  import { IconBrain } from "@tabler/icons-svelte";

  const lastAction: Record<string, number> = $derived(
    $states.actions.at(-1) ?? {
      temp: 0,
      sal: 0,
      turb: 0,
      pH: 0,
      DO: 0,
      nh3: 0,
    },
  );
  const loading = $derived($states.actions.length < 1);

  const ActionMaper: Record<string, (n: number) => string | undefined> = {
    temp: (v: number) => {
      if (v > 0) return "Hidupkan Pemanas";
      else return "Matikan Pemanas";
    },
    sal: (v: number) => {
      if (v > 0) return "Tambah Air Asin";
      else return "Tambah Air Tawar";
    },
    turb: (v: number) => {
      if (v > 0) return "Tambah Air Keruh";
      else return "Aktifkan Filter Air";
    },
    pH: (v: number) => {
      if (v > 0) return "Tambah Zat Asam";
      else return "Tambah Zat Basa";
    },
    DO: (v: number) => {
      if (v > 0) return "Hidupkan Aerator";
      else return "Matikan Aerator";
    },
    nh3: (v: number) => {
      if (v > 0) return "Tambah Beban Organik";
      else return "Aerasi/Nitrifikasi";
    },
  };

  function getRecomendation(percentage: number) {
    if (percentage >= 0.6) return "Tinggi";
    if (percentage >= 0.3) return "Sedang";
    return "Rendah";
  }
</script>

{#snippet Action(label: string, action: number)}
  {@const percentage = Math.abs(action)}
  {@const recomendation = getRecomendation(percentage)}
  <div
    class={[
      "bg-white/10 rounded-lg p-3 flex flex-col justify-between",
      { "[&>*]:hidden": loading },
    ]}
    class:skeleton={loading}
  >
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-blue-100">{label}</span><span
        data-slot="badge"
        class={[
          "inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&amp;]:hover:bg-primary/90 text-xs text-white",
          {
            "bg-red-500": recomendation === "Tinggi",
            "bg-yellow-500": recomendation === "Sedang",
            "bg-green-500": recomendation === "Rendah",
          },
        ]}
      >
        {recomendation}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <div
        aria-valuemax="100"
        aria-valuemin="0"
        role="progressbar"
        data-state="indeterminate"
        data-max="100"
        data-slot="progress"
        class="bg-primary/20 relative w-full overflow-hidden rounded-full h-2 flex-1"
      >
        <div
          data-state="indeterminate"
          data-max="100"
          data-slot="progress-indicator"
          class="bg-primary h-full w-full flex-1 transition-all"
          style="transform: translateX(-{(1 - percentage) * 100}%);"
        ></div>
      </div>
      <span class="text-xs text-blue-200">{(percentage * 100).toFixed(2)}%</span
      >
    </div>
  </div>
{/snippet}

<div class="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col">
  <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
    <IconBrain size={25} />
    Rekomendasi AI Saat Ini
  </h2>
  <div class="grid sm:grid-cols-2 gap-4 mb-6 flex-grow">
    {#each Object.keys(lastAction) as key}
      {@const mapped = ActionMaper[key](lastAction[key])}
      {@render Action(mapped ?? key, lastAction[key])}
    {/each}
  </div>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
    <div class="text-center bg-white/10 rounded-lg p-3">
      <div class="text-2xl font-bold text-green-300">94.2%</div>
      <div class="text-xs text-blue-200">Akurasi Rekomendasi</div>
    </div>
    <div class="text-center bg-white/10 rounded-lg p-3">
      <div class="text-2xl font-bold text-green-300">24/7</div>
      <div class="text-xs text-blue-200">Monitoring Otomatis</div>
    </div>
    <div class="text-center bg-white/10 rounded-lg p-3">
      <div class="text-2xl font-bold text-green-300">6</div>
      <div class="text-xs text-blue-200">Parameter Terpantau</div>
    </div>
    <div class="text-center bg-white/10 rounded-lg p-3">
      <div class="text-2xl font-bold text-green-300">30%</div>
      <div class="text-xs text-blue-200">Peningkatan Hasil</div>
    </div>
  </div>
</div>
