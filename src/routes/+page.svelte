<script lang="ts">
  import Navigation from "./navigation.svelte";
  import Brand from "./brand.svelte";
  import GithubButton from "./github-button.svelte";
  import Hero from "./hero.svelte";
  import AiRecomendation from "./ai-recomendation.svelte";
  import SystemArchitecture from "./system-architecture.svelte";
  import ChartStates from "./chart-states.svelte";
  import ChartActions from "./chart-actions.svelte";
  import { onMount } from "svelte";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";

  type Action = {
    temp: number;
    sal: number;
    turb: number;
    pH: number;
    DO: number;
    nh3: number;
  };

  type State = {
    timestamp: number;
    temp: number;
    sal: number;
    turb: number;
    pH: number;
    DO: number;
    nh3: number;
  };

  const placeholder = { temp: 0, sal: 0, turb: 0, pH: 0, DO: 0, nh3: 0 };

  let actions: Action[] = $state([]);
  let states: State[] = $state([]);
  let loading = $state(true);
  let error = $state(false);

  const lastAction = $derived(actions.at(-1) ?? placeholder);

  async function stateFetch(): Promise<State[]> {
    return fetch(PUBLIC_BACKEND_URL + "/states").then((r) => r.json());
  }

  async function actionFetch(states: State[]): Promise<Action[]> {
    return fetch(PUBLIC_BACKEND_URL + "/actions", {
      method: "POST",
      body: JSON.stringify(states),
    }).then((r) => r.json());
  }

  async function fetchAll() {
    states = await stateFetch();
    actions = await actionFetch(states);
  }

  function update() {
    fetchAll()
      .then(
        () => setTimeout(update, 1000),
        (err) => {
          if (err instanceof TypeError) alert("Gagal Koneksi ke Backend");
          error = true;
        },
      )
      .finally(() => {
        loading = false;
      });
  }

  onMount(update);

  $inspect(states.at(-1));
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
      <AiRecomendation {loading} {error} actions={lastAction} />
      <SystemArchitecture />
    </div>
  </div>
</section>

<section>
  <ChartStates
    {error}
    {loading}
    states={states.length ? states : [{ timestamp: 0, ...placeholder }]}
  />
  <hr class="my-5 border-2" />
  <ChartActions {loading} actions={actions.length ? actions : [placeholder]} />
</section>

<footer class="bg-[#1E2532] dark text-foreground p-10">
  <p>Copyright (c) 2025 Author. All Rights Reserved.</p>
</footer>
