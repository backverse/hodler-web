import { writable } from 'svelte/store'
import type { BasePrice } from './client'

export const basePrices = writable<BasePrice[]>([])
export const baseCode = writable<string>()
export const basePrice = writable<number>()
export const exchangeId = writable<number>(Number(localStorage.getItem('base-exchange-id')) || 0)
