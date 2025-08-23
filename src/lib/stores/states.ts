import { browser } from "$app/environment";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { readable } from "svelte/store";
import toasts from "./toasts";
import { IconAlertCircle } from "@tabler/icons-svelte";

export type State = {
  timestamp: number;
  temp: number;
  sal: number;
  turb: number;
  pH: number;
  DO: number;
  nh3: number;
};


export type Action = {
  temp: number;
  sal: number;
  turb: number;
  pH: number;
  DO: number;
  nh3: number;
};


export async function actionFetch(states: State[]): Promise<Action[]> {
  return fetch(PUBLIC_BACKEND_URL + "/actions", {
    method: "POST",
    body: JSON.stringify(states),
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((r) => r.json());
}


export async function stateFetch(): Promise<State[]> {
  return fetch(PUBLIC_BACKEND_URL + "/states", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((r) => r.json());
}

async function fetchAll() {
  const states = await stateFetch()
  const actions = await actionFetch(states)
  return { states, actions }
}

const states = readable<{ actions: Action[], states: State[] }>({ actions: [], states: [] }, (set) => {
  function update() {
    fetchAll().then(({ states, actions }) => {
      set({ states, actions })
      setTimeout(update, 1000)
    }, () => {
      toasts.update(p => [...p, {
        title: "Gagal Koneksi ke Backend", color: "error", Icon: IconAlertCircle, confirm() {
          location.reload()
        },
      }])
    });
  }

  if (browser) update();
})

export default states
