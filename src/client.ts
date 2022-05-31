/* eslint-disable camelcase */

export class BasePrice {
  exchange: string
  ask_price: number
  bid_price: number
  code: string
}

export const getBasePrices = () =>
  fetch('https://hodler-signal.backverse.dev/base-prices')
    .then<BasePrice[]>((response) => response.json())
    .catch<BasePrice[]>((error: unknown) => {
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
  icon_id: string
}

export const getOverview = () =>
  fetch('https://hodler-signal.backverse.dev/overview')
    .then<Overview[]>((response) => response.json())
    .catch<Overview[]>((error: unknown) => {
      console.error(error)
      return []
    })
