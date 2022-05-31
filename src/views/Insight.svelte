<script lang="ts">
  import { onMount } from 'svelte'
  import Header from '../components/Header.svelte'
  import { currency } from '../store'

  export let currentRoute: Record<string, any>
  const symbol: string = currentRoute.namedParams.symbol

  class Arbitrage {
    exchange: string
    best_routes: string
    rate: number
  }

  class Insight {
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
    symbol_id: string
  }

  class Premium {
    exchange: string
    ask_premium: number
    ask_price: number
    bid_premium: number
    bid_price: number
  }

  let arbitrages: Arbitrage[]
  let insight: Insight
  let premiums: Premium[]

  onMount(async () => {
    await fetch(`https://hodler-signal.backverse.dev/insights?symbol=${symbol}`)
      .then<{ arbitrages: Arbitrage[]; insight: Insight; premiums: Premium[] }>((response) =>
        response.json(),
      )
      .then((response) => {
        arbitrages = response.arbitrages
        insight = response.insight
        premiums = response.premiums
      })
  })
</script>

{#if insight}
  <main>
    <Header
      header="Insight"
      subheader={insight?.symbol.toUpperCase()}
      subheaderImg="https://s2.coinmarketcap.com/static/img/coins/32x32/{insight.symbol_id}.png"
    />

    <div class="insight-blocks">
      <div class="insight-block">
        <div class="label">Change</div>
        <div>
          <div>
            <span
              class={insight.percent_change > 0.5
                ? 'value pnl profit'
                : insight.percent_change < -0.5
                ? 'value pnl loss'
                : 'value pnl neutral'}
              >{insight.percent_change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div class="insight-block">
        <div class="label">Volume</div>
        <div>
          <div>
            <span class="value"
              >{(insight.volume * insight.average_ask_price * $currency.ask_price).toLocaleString(
                undefined,
              )}
              {$currency.code}
            </span>
          </div>
        </div>
      </div>

      <div class="insight-block">
        <div class="label">Average Price</div>
        <div>
          <div>
            <span class="type">Ask</span>
            <span class="value"
              >{(insight.average_ask_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
              {$currency.code}</span
            >
          </div>
          <div>
            <span class="type">Bid</span>
            <span class="value"
              >{(insight.average_bid_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
              {$currency.code}</span
            >
          </div>
        </div>
      </div>

      <div class="insight-block">
        <div class="label">Best Price</div>
        <div>
          <div>
            <span class="type">Ask</span>
            <span class="value"
              >{(insight.best_ask_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
              {$currency.code}</span
            >
          </div>
          <div>
            <span class="type">Bid</span>
            <span class="value"
              >{(insight.best_bid_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
              {$currency.code}</span
            >
          </div>
        </div>
      </div>
    </div>

    <h2>Premium</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="text-start">Exchange</th>
          <th scope="col" class="text-end">Ask Premium</th>
          <th scope="col" class="text-end">Bid Premium</th>
        </tr>
      </thead>
      <tbody>
        {#each premiums as premium}
          <tr>
            <td class="text-start">{premium.exchange.toUpperCase()} </td>
            <td
              class={premium.ask_premium > 0.5
                ? 'text-end pnl loss'
                : premium.ask_premium < -0.5
                ? 'text-end pnl profit'
                : 'text-end pnl neutral'}
            >
              {premium.ask_premium.toFixed(2)}%
            </td>
            <td
              class={premium.bid_premium > 0.5
                ? 'text-end pnl profit'
                : premium.bid_premium < -0.5
                ? 'text-end pnl loss'
                : 'text-end pnl neutral'}
            >
              {premium.bid_premium.toFixed(2)}%
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
          <th scope="col" class="text-start">Best Routes</th>
          <th scope="col" class="text-end">PnL</th>
        </tr>
      </thead>
      <tbody>
        {#each arbitrages as arbitrage}
          <tr>
            <td class="text-start">{arbitrage.exchange.toUpperCase()} </td>
            <td class="text-start">{arbitrage.best_routes.toUpperCase()}</td>
            <td
              class={arbitrage.rate > 0.5
                ? 'text-end pnl profit'
                : arbitrage.rate < -0.5
                ? 'text-end pnl loss'
                : 'text-end pnl neutral'}
            >
              {arbitrage.rate.toFixed(2)}%
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
