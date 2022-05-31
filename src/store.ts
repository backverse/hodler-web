import { writable } from 'svelte/store'
import type { Currency } from './client'

export const currency = writable<Currency>()
export const exchangeId = writable<number>(Number(localStorage.getItem('base-exchange-id')) || 0)
