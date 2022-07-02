/* eslint-disable camelcase */

export class Currency {
  exchange: string
  ask_price: number
  bid_price: number
  code: string
  symbol: string
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
  icon: string
}

export const getOverviews = () =>
  fetch('https://hodler-signal.backverse.dev/overviews')
    .then<Overview[]>((response) => response.json())
    .catch<Overview[]>((error: unknown) => {
      console.error(error)
      return []
    })

export class Arbitrage {
  buy_low_exchange: string
  buy_low_price: number
  sell_high_exchange: string
  sell_high_price: number
  rate: number
}

export class Summary {
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
  best_ask_premium: number
  best_bid_premium: number
  icon: string
}

export class Premium {
  exchange: string
  ask_premium: number
  ask_price: number
  bid_premium: number
  bid_price: number
}

export class Insight {
  arbitrages: Arbitrage[]
  premiums: Premium[]
  summary: Summary
}

export const getInsight = (symbol: string) =>
  fetch(`https://hodler-signal.backverse.dev/insights?symbol=${symbol}`)
    .then<Insight>((response) => response.json())
    .catch<Insight>((error: unknown) => {
      console.error(error)
      return { arbitrages: [], summary: {} as any, premiums: [] }
    })
