import { writable } from 'svelte/store'
import type { Currency } from './client'
import { Theme } from './constant'

// Base Currency
export const currency = writable<Currency>()
export const exchange = writable<string>(localStorage.getItem('exchange') || 'hodler')
export const setExchange = (e: string) => {
  localStorage.setItem('exchange', e)
  exchange.set(e)
}

// Theme
export const getTheme = () => localStorage.getItem('theme') || Theme.DARK
export const setTheme = (t: string) => localStorage.setItem('theme', t)
