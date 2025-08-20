import { browser } from "$app/environment";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { PageLoad } from "./$types";

// export const load: PageLoad = async ev => {
//   const states = ev.fetch(PUBLIC_BACKEND_URL + "/states")
//     .then(r => r.json(), err => {
//       if (browser) alert("Gagal Koneksi ke Backend")
//       else console.error(err)
//     }) as Promise<{ timestamp: number, temp: number, sal: number, turb: number, pH: number, DO: number, nh3: number }[]>
//   const actions = states.then(r => ev.fetch(PUBLIC_BACKEND_URL + "/actions", {
//     method: "POST",
//     body: JSON.stringify(r)
//   }).then(r => r.json(), err => {
//     if (browser) alert("Gagal Mendapatkan Rekomendasi Aksi")
//     else console.error(err)
//   }) as Promise<{ timestamp: number, temp: number, sal: number, turb: number, pH: number, DO: number, nh3: number }[]>)
//   return { states, actions }
// }
