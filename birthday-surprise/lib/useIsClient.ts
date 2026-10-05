import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True in the browser, false while rendering on the server (safe for portals). */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
