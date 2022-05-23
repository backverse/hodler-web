<script lang="ts">
  import { onMount } from 'svelte'
  import Header from '../components/Header.svelte'

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

{#if oracle}
  <main>
    <Header
      header="Insight"
      subheader={oracle?.symbol.toUpperCase()}
      subheaderImg="https://s2.coinmarketcap.com/static/img/coins/32x32/{oracle?.icon_id}.png"
    />

    <div class="insight-blocks">
      <div class="insight-block">
        <div class="label">Average Price</div>
        <div>
          <div>
            <span class="type">Ask</span>
            <span class="value">{oracle.ask_avg_price.toFixed(8)}</span>
          </div>
          <div>
            <span class="type">Bid</span>
            <span class="value">{oracle.bid_avg_price.toFixed(8)}</span>
          </div>
        </div>
      </div>
      <div class="insight-block">
        <div class="label">Best Price</div>
        <div>
          <div>
            <span class="type">Ask</span>
            <span class="value">{oracle.ask_best_price.toFixed(8)}</span>
          </div>
          <div>
            <span class="type">Bid</span>
            <span class="value">{oracle.bid_best_price.toFixed(8)}</span>
          </div>
        </div>
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
                ? 'text-center pnl loss'
                : price.ask_premium < -0.005
                ? 'text-center pnl profit'
                : 'text-center pnl neutral'}
            >
              {(price.ask_premium * 100).toFixed(2)}%
            </td>
            <td
              class={price.bid_premium > 0.005
                ? 'text-end pnl profit'
                : price.bid_premium < -0.005
                ? 'text-end pnl loss'
                : 'text-end pnl neutral'}
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
          <th scope="col" class="text-center">Best Routes</th>
          <th scope="col" class="text-end">PnL</th>
        </tr>
      </thead>
      <tbody>
        {#each oracle.prices as price}
          <tr>
            <td class="text-start">{price.exchange.toUpperCase()} </td>
            <td class="text-center">{oracle.bid_best_exchange.toUpperCase()}</td>
            <td
              class={price.arbitrage > 0.005
                ? 'text-end pnl profit'
                : price.arbitrage < -0.005
                ? 'text-end pnl loss'
                : 'text-end pnl neutral'}
            >
              {(price.arbitrage * 100).toFixed(2)}%
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </main>
{/if}

<style>
  div.insight-blocks + h2,
  .table + h2 {
    margin-top: 2rem;
  }

  div.insight-blocks {
    background: var(--background-secondary);
    border-radius: 0.5rem;
  }

  div.insight-block {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    align-items: center;
  }

  div.insight-block + div.insight-block {
    border-top: var(--border-primary);
  }

  div.insight-block .label {
    color: var(--default-secondary);
    font-weight: var(--bold);
  }

  div.insight-block .type {
    color: var(--default-secondary);
    font-size: 0.875rem;
    font-weight: var(--regular);
  }

  div.insight-block .value {
    font-size: 1.125rem;
    font-weight: var(--bold);
  }
</style>
