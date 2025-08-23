<script lang="ts">
  import Navigation from "./navigation.svelte";
  import Brand from "./brand.svelte";
  import GithubButton from "./github-button.svelte";
  import Hero from "./hero.svelte";
  import AiRecomendation from "./ai-recomendation.svelte";
  import SystemArchitecture from "./system-architecture.svelte";
  import ChartStates from "./chart-states.svelte";
  import ChartActions from "./chart-actions.svelte";
</script>

<section class="border-b px-3 py-1 bg-[#1E2532] dark text-foreground">
  <header class="flex items-center justify-between">
    <Brand />
    <Navigation />
    <GithubButton />
  </header>
  <div class="py-5">
    <Hero />
    <div class="flex flex-col lg:flex-row gap-8 items-stretch">
      <AiRecomendation />
      <SystemArchitecture />
    </div>
  </div>
</section>

<section id="charts">
  <ChartStates />
  <hr class="my-5 border-2" />
  <ChartActions />
</section>

<footer id="contacts" class="bg-[#1E2532] dark text-foreground p-10">
  <p>Copyright (c) 2025 Author. All Rights Reserved.</p>
</footer>
