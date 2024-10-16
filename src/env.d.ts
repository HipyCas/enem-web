/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface WalkwayOptions {
  selector: string;
  duration?: `${number}`;
  easing?: (t: number) => number;
}

declare global {
  class Walkway {
    constructor(options: WalkwayOptions);

    draw(): void;
  }
}

export {};
