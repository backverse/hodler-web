<script lang="ts">
  import { onMount } from 'svelte'
  import { getInsight, type Arbitrage, type Premium, type Summary } from '../client'
  import Header from '../components/Header.svelte'
  import { currency } from '../store'

  export let currentRoute: Record<string, any>
  const symbol: string = currentRoute.namedParams.symbol

  let arbitrages: Arbitrage[]
  let summary: Summary
  let premiums: Premium[]

  onMount(async () => {
    await getInsight(symbol).then((response) => {
      arbitrages = response.arbitrages
      summary = response.summary
      premiums = response.premiums
    })
  })
</script>

{#if summary}
  <main>
    <Header
      header="Insight"
      subheader={summary?.symbol.toUpperCase()}
      subheaderImg="https://s2.coinmarketcap.com/static/img/coins/32x32/{summary.symbol_id}.png"
    />

    <div class="insight-blocks">
      <div class="insight-block">
        <div class="label">Change</div>
        <div>
          <div>
            <span
              class={summary.percent_change > 0.5
                ? 'value pnl profit'
                : summary.percent_change < -0.5
                ? 'value pnl loss'
                : 'value pnl neutral'}
              >{summary.percent_change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div class="insight-block">
        <div class="label">Volume</div>
        <div>
          <div>
            <span class="value"
              >{(summary.volume * summary.average_ask_price * $currency.ask_price).toLocaleString(
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
              >{(summary.average_ask_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
              {$currency.code}</span
            >
          </div>
          <div>
            <span class="type">Bid</span>
            <span class="value"
              >{(summary.average_bid_price * $currency.ask_price).toLocaleString(undefined, {
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
              >{(summary.best_ask_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
              {$currency.code}</span
            >
          </div>
          <div>
            <span class="type">Bid</span>
            <span class="value"
              >{(summary.best_bid_price * $currency.ask_price).toLocaleString(undefined, {
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
            <td class="text-end">
              <div>
                {(premium.ask_price * $currency.ask_price).toLocaleString(undefined, {
                  minimumFractionDigits: $currency.fraction_digits,
                  maximumFractionDigits: $currency.fraction_digits,
                })}
              </div>
              <div
                class={premium.ask_premium > 0.5
                  ? 'pnl loss'
                  : premium.ask_premium < -0.5
                  ? 'pnl profit'
                  : 'pnl neutral'}
              >
                {premium.ask_premium.toFixed(2)}%
              </div>
            </td>
            <td class="text-end">
              <div>
                {(premium.bid_price * $currency.ask_price).toLocaleString(undefined, {
                  minimumFractionDigits: $currency.fraction_digits,
                  maximumFractionDigits: $currency.fraction_digits,
                })}
              </div>
              <div
                class={premium.bid_premium > 0.5
                  ? 'pnl profit'
                  : premium.bid_premium < -0.5
                  ? 'pnl loss'
                  : 'pnl neutral'}
              >
                {premium.bid_premium.toFixed(2)}%
              </div>
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
    border-top: 1px solid var(--border-primary);
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
