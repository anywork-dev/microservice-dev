import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { goto } from "$app/navigation";
import { api, type User, RestService } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number]
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (
    style: Record<string, number | string | undefined>
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};

export const copyIfExists = (
  a: { [key: string]: any },
  b: { [key: string]: any }
): { [key: string]: any } => {
  return Object.fromEntries(
    Object.keys(a)
      .map((i: string) => [i, b[i]])
  );
};

const open = "/ /login /signup /recovery /new_password /sigup/confirm_required".split(" ")

// TODO: redirect page using goto from $app/navigation
// redirect to login page if no session found
export async function auth(): Promise<{[index: string]: any} | null> {
  const is_open = open.find(i => i == window.location.pathname)
  const session = RestService.session()
  if (!session && !is_open) {
    await goto("/login");
    return null;
  } else if (session){
    if (!session.user.confirmation){
      await goto("/signup/confirm_required");
      return session;
    }
  }
  
  return session;
}

export function calculate_margin_searchbar(){
  return (window.screen.height - window.innerHeight) / 2
}