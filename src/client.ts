/* eslint-disable camelcase */

export class Currency {
  exchange: string
  ask_price: number
  bid_price: number
  code: string
  fraction_digits: number
}

export const getCurrencies = () =>
  fetch('https://hodler-signal.backverse.dev/currencies')
    .then<Currency[]>((response) => response.json())
    .catch<Currency[]>((error: unknown) => {
      console.error(error)
      return []
    })

export class Overview {
  symbol: string
  volume: number
  percent_change: number
  average_ask_price: number
  average_bid_price: number
  best_ask_exchange: string
  best_ask_price: number
  best_ask_ticker_name: string
  best_bid_exchange: string
  best_bid_price: number
  best_bid_ticker_name: string
  best_arbitrage: number
  icon_id: string
}

export const getOverview = () =>
  fetch('https://hodler-signal.backverse.dev/overview')
    .then<Overview[]>((response) => response.json())
    .catch<Overview[]>((error: unknown) => {
      console.error(error)
      return []
    })
