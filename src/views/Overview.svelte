<script lang="ts">
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Header from '../components/Header.svelte'
  import Search from '../components/Search.svelte'
  import { basePrice } from '../store'
  import { getOverview, Overview } from '../client'

  let cryptoToFilter = ''
  let overviews: Overview[] = []

  const cryptoClicked = (symbol: string) => () => {
    navigateTo(`insights/${symbol}`)
  }

  onMount(async () => {
    overviews = await getOverview()
  })
</script>

<main>
  <Header header="Overview" />

  <Search bind:value={cryptoToFilter} />

  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="text-start">Ticker</th>
        <th scope="col" class="text-center">Price</th>
        <th scope="col" class="text-end">24h Change</th>
      </tr>
    </thead>
    <tbody>
      {#each overviews.filter( (oracle) => RegExp(cryptoToFilter, 'i').test(oracle.symbol), ) as oracle}
        <tr on:click={cryptoClicked(oracle.symbol)}>
          <td class="text-start">
            <div>
              <img
                class="symbol-img"
                src="https://s2.coinmarketcap.com/static/img/coins/32x32/{oracle.icon_id}.png"
                alt={oracle.symbol}
              />
              {oracle.symbol.toUpperCase()}
            </div>
          </td>
          <td class="text-center">{(oracle.average_ask_price * $basePrice).toFixed(2)}</td>
          <td class="text-end">
            <div
              class={oracle.percent_change > 0.5
                ? 'pnl profit'
                : oracle.percent_change < -0.5
                ? 'pnl loss'
                : 'pnl neutral'}
            >
              {oracle.percent_change.toFixed(2)}%
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
