export function uniq(array: any[]): any[]

export function toCamelCase(text: string): string

export function $(
  element: HTMLElement | Document | string,
  selectors?: string
): HTMLElement

export function querySelector(
  element: HTMLElement | Document | string,
  selectors?: string
): HTMLElement

export function $$(
  element: HTMLElement | Document | string,
  selectors?: string
): HTMLElement[]

export function querySelectorAll(
  element: HTMLElement | Document | string,
  selectors?: string
): HTMLElement[]

export function createElement(tagName: string): HTMLElement

export function addEventListener(
  element: HTMLElement | Document | EventTarget,
  type: string | Record<string, unknown>,
  listener?
): void

export function getAttribute(element: HTMLElement, name: string): string

export function setAttribute(
  element: HTMLElement,
  name: string,
  value: string
): void

export function setStyle(
  element: HTMLElement,
  style: string | Record<string, unknown>,
  overwrite?: boolean
): void

export function toStyleMap(styleText: string): Record<string, string>

export function noStyleSpace(text: string): string

export function createSetStyle(styleText: string): setStyle

export function isUrl(text: string): boolean
