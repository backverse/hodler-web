<script lang="ts">
  import { onMount } from 'svelte'

  export let currentRoute: Record<string, any>
  const symbol: string = currentRoute.namedParams.symbol

  class Price {
    arbitrage: number
    ask_original: number
    ask_premium: number
    ask_price: number
    bid_original: number
    bid_premium: number
    bid_price: number
    exchange: string
    symbol: string
  }

  class Oracle {
    symbol: string
    ask_avg_price: number
    ask_best_exchange: string
    ask_best_price: number
    ask_best_symbol: string
    bid_avg_price: number
    bid_best_exchange: string
    bid_best_original: number
    bid_best_price: number
    bid_best_symbol: string
    prices: Price[]
    arbitrage: number
    icon_id: string
  }

  let oracle: Oracle

  onMount(async () => {
    oracle = await fetch('https://hodler-signal.backverse.dev/oracles')
      .then<Oracle[]>((response) => response.json())
      .then((oracles) => oracles.find((oracle) => RegExp(oracle.symbol, 'i')?.test(symbol)))
  })
</script>

<main>
  <div class="insight-header">
    <h1>Insight</h1>
    | {oracle?.symbol.toUpperCase() || ''}
    <img
      src="https://s2.coinmarketcap.com/static/img/coins/32x32/{oracle?.icon_id}.png"
      alt={symbol}
    />
  </div>

  {#if oracle}
    <div class="insight-block">
      <div class="label">Average Price</div>
      <div class="value">
        <div><span>Ask</span> {oracle.ask_avg_price.toFixed(8)}</div>
        <div><span>Bid</span> {oracle.bid_avg_price.toFixed(8)}</div>
      </div>
    </div>
    <div class="insight-block">
      <div class="label">Best Price</div>
      <div class="value">
        <div><span>Ask</span> {oracle.ask_best_price.toFixed(8)}</div>
        <div><span>Bid</span> {oracle.bid_best_price.toFixed(8)}</div>
      </div>
    </div>

    <h2>Premium</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="text-start">Exchange</th>
          <th scope="col" class="text-center">Ask Premium</th>
          <th scope="col" class="text-end">Bid Premium</th>
        </tr>
      </thead>
      <tbody>
        {#each oracle.prices as price}
          <tr>
            <td class="text-start">{price.exchange.toUpperCase()} </td>
            <td
              class={price.ask_premium > 0.005
                ? 'text-center negative'
                : price.ask_premium < -0.005
                ? 'text-center positive'
                : 'text-center neutral'}
            >
              {(price.ask_premium * 100).toFixed(2)}%
            </td>
            <td
              class={price.bid_premium > 0.005
                ? 'text-end positive'
                : price.bid_premium < -0.005
                ? 'text-end negative'
                : 'text-end neutral'}
            >
              {(price.bid_premium * 100).toFixed(2)}%
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <h2>Arbitrage</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="text-start">Exchange</th>
          <th scope="col" class="text-center">Best Route</th>
          <th scope="col" class="text-end">Rate</th>
        </tr>
      </thead>
      <tbody>
        {#each oracle.prices as price}
          <tr>
            <td class="text-start">{price.exchange.toUpperCase()} </td>
            <td class="best-route"> -> {oracle.bid_best_exchange.toUpperCase()} </td>
            <td
              class={price.arbitrage > 0.005
                ? 'text-end positive'
                : price.arbitrage < -0.005
                ? 'text-end negative'
                : 'text-end neutral'}
            >
              {(price.arbitrage * 100).toFixed(2)}%
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>

<style>
  div.insight-header {
    display: flex;
    font-weight: 400;
    align-items: center;
  }

  div.insight-header h1 {
    margin-right: 1rem;
  }

  div.insight-header img {
    margin-left: 0.5rem;
    height: 1.5rem;
  }

  div.insight-block {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
  }

  div.insight-block + div.insight-block {
    border-top: 1px solid lightgray;
  }

  div.insight-block .label {
    font-weight: 400;
    font-size: 0.75rem;
  }

  div.insight-block .value span {
    font-weight: 300;
    font-size: 0.75rem;
  }

  div.insight-block .value {
    font-weight: 700;
    font-size: 0.875rem;
  }

  .best-route {
    font-size: 0.75rem;
  }
</style>
