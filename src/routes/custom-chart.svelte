<script lang="ts">
  import { ChartContainer, ChartTooltip } from "$lib/ui/chart";
  import { LineChart } from "layerchart";

  type Data = Record<string, any>;

  export const defaultColors = [
    "var(--color-red-500)",
    "var(--color-blue-500)",
    "var(--color-cyan-500)",
    "var(--color-gray-500)",
    "var(--color-green-500)",
    "var(--color-yellow-500)",
  ];

  const {
    colors = defaultColors,
    values,
    label,
    yDomain,
    x,
  }: {
    values: Data[];
    x: keyof Data;
    label?: (v: Data[string]) => string;
    colors?: string[];
    yDomain?: number[];
  } = $props();

  export const keys = Object.keys(values.at(0)!)
    .slice(1)
    .filter((e) => e != x) as (keyof Data)[];
  export const series = keys.map((e, i) => ({
    key: e,
    color: colors[i % colors.length],
  }));
</script>

<ChartContainer config={{}} class="aspect-auto h-[250px] w-full">
  <LineChart
    data={values}
    {series}
    {x}
    {yDomain}
    props={{
      spline: {
        overflow: "visible",
      },
      xAxis: {
        format: label,
      },
    }}
    brush
  >
    {#snippet tooltip()}
      <ChartTooltip />
    {/snippet}
  </LineChart>
</ChartContainer>
