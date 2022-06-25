<script lang="ts">
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import { getOverviews, Overview } from '../client'
  import Header from '../components/Header.svelte'
  import Search from '../components/Search.svelte'
  import { currency } from '../store'

  let cryptoToFilter = ''
  let overviews: Overview[] = []

  const cryptoClicked = (symbol: string) => () => {
    navigateTo(`insights/${symbol}`)
  }

  onMount(async () => {
    overviews = await getOverviews()
  })
</script>

<main>
  <Header header="Overview" />

  <Search bind:value={cryptoToFilter} />

  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="text-start">Ticker</th>
        <th scope="col" class="text-end">Price / 24h Change</th>
        <th scope="col" class="text-end">Arbitrage</th>
      </tr>
    </thead>
    <tbody>
      {#each overviews.filter( (overview) => RegExp(cryptoToFilter, 'i').test(overview.symbol), ) as overview}
        <tr on:click={cryptoClicked(overview.symbol)}>
          <td class="text-start">
            <div>
              <img
                class="symbol-img"
                src="https://s2.coinmarketcap.com/static/img/coins/32x32/{overview.icon_id}.png"
                alt={overview.symbol}
              />
              {overview.symbol.toUpperCase()}
            </div>
          </td>
          <td class="text-end">
            <div>
              {(overview.average_ask_price * $currency.ask_price).toLocaleString(undefined, {
                minimumFractionDigits: $currency.fraction_digits,
                maximumFractionDigits: $currency.fraction_digits,
              })}
            </div>
            <div
              class={overview.percent_change > 0.5
                ? 'pnl profit'
                : overview.percent_change < -0.5
                ? 'pnl loss'
                : 'pnl neutral'}
            >
              {overview.percent_change.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}%
            </div>
          </td>
          <td class="text-end">
            <div
              class={overview.best_arbitrage > 0.5
                ? 'pnl profit'
                : overview.best_arbitrage < -0.5
                ? 'pnl loss'
                : 'pnl neutral'}
            >
              {overview.best_arbitrage.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}%
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
