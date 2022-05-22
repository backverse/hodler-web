<script lang="ts">
  import Search from '../components/Search.svelte'

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
  }

  const getOracles = fetch('https://hodler-signal.backverse.dev/oracles')
    .then<Oracle[]>((response) => response.json())
    .then((oracles) => oracles.sort((a, b) => a.symbol.localeCompare(b.symbol)))
    .then((oracles) => {
      oracles.forEach((oracle) => {
        oracle.prices.forEach(({ arbitrage }) => {
          if (!oracle.arbitrage) oracle.arbitrage = arbitrage
          else oracle.arbitrage = oracle.arbitrage > arbitrage ? oracle.arbitrage : arbitrage
        })
      })
      return oracles
    })
    .catch<Oracle[]>((error: unknown) => {
      console.error(error)
      return []
    })
</script>

<main>
  <h1>Overview</h1>

  <Search />

  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="text-start">Ticker</th>
        <th scope="col" class="text-center">Price</th>
        <th scope="col" class="text-end">Arbitrage</th>
      </tr>
    </thead>
    <tbody>
      {#await getOracles then oracles}
        {#each oracles as oracle}
          <tr>
            <td class="text-start">{oracle.symbol.toUpperCase()}</td>
            <td class="text-center">{oracle.ask_avg_price.toFixed(8)}</td>
            <td class="text-end">
              <div
                class={oracle.arbitrage > 0.005
                  ? 'positive'
                  : oracle.arbitrage < -0.005
                  ? 'negative'
                  : 'neutral'}
              >
                {(oracle.arbitrage * 100).toFixed(2)}%
              </div>
            </td>
          </tr>
        {/each}
      {/await}
    </tbody>
  </table>
</main>

<style>
  main {
    padding-bottom: 1rem;
  }

  .positive {
    color: rgb(0, 151, 0);
  }

  .negative {
    color: red;
  }

  .neutral {
    color: grey;
  }

  .table {
    width: 100%;
    margin-top: 1rem;
    border-radius: 0.5rem;
    background: #f0f0f0;
    font-size: 0.9rem;
  }

  td {
    padding: 1.5rem 0.75rem;
  }

  tbody td {
    border-top: 1px solid #fff;
  }

  th {
    padding: 1rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #666666;
  }

  .text-start {
    text-align: start;
  }

  td.text-start {
    font-weight: 700;
  }

  .text-center {
    text-align: center;
  }

  .text-end {
    text-align: end;
  }

  td.text-end {
    font-weight: 700;
  }
</style>
