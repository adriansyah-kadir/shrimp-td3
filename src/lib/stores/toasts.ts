import type { Component } from "svelte";
import { writable } from "svelte/store";

export type AlertProps = {
  title: string;
  desc?: string;
  Icon?: Component;
  color?: "info" | "success" | "warning" | "error";
  style?: "soft" | "outline" | "dash";
  cancel?: () => void;
  confirm?: () => void;
};

const toasts = writable<AlertProps[]>([])

export default toasts
