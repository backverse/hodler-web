<script lang="ts">
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
  }

  const getOracles = fetch('https://hodler-signal.backverse.dev/oracles')
    .then<Oracle[]>((response) => response.json())
    .then((oracles) => oracles.sort((a, b) => a.symbol.localeCompare(b.symbol)))
    .catch<Oracle[]>((error: unknown) => {
      console.error(error)
      return []
    })
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Fira Code" rel="stylesheet" />
</svelte:head>

<main>
  <h1>Arbitrage</h1>

  {#await getOracles then oracles}
    {#each oracles as oracle}
      <h2>{oracle.symbol}</h2>

      <p>
        Average Ask: {oracle.ask_avg_price.toFixed(8)}
        <br />
        Average Bid: {oracle.bid_avg_price.toFixed(8)}
      </p>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Exchange</th>
            <th scope="col">Ask Price</th>
            <th scope="col">Ask Premium</th>
            <th scope="col">Bid Price</th>
            <th scope="col">Bid Premium</th>
            <th scope="col">Arbitrage</th>
          </tr>
        </thead>
        <tbody>
          {#each oracle.prices as price}
            <tr>
              <th scope="row">{price.exchange.toUpperCase()}</th>
              <td>{price.ask_price.toFixed(8)}</td>
              <td>{(price.ask_premium * 100).toFixed(2)}</td>
              <td>{price.bid_price.toFixed(8)}</td>
              <td>{(price.bid_premium * 100).toFixed(2)}</td>
              <td>
                <div
                  class={price.arbitrage > 0
                    ? 'positive'
                    : price.arbitrage < 0
                    ? 'negative'
                    : 'neutral'}
                >
                  {(price.arbitrage * 100).toFixed(2)}
                </div>
                <div class="arbitrage-flow">
                  {price.exchange.toUpperCase()} -> {oracle.bid_best_exchange.toUpperCase()}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <hr />
    {/each}
  {/await}
</main>

<style>
  main {
    font-family: 'Fira Code';
    font-weight: 300;
    text-align: center;
    padding: 2em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 700;
  }

  hr {
    border-color: grey;
    margin: 4em;
  }

  table {
    width: 100%;
  }

  th {
    padding: 0.5em;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }

  .neutral {
    color: grey;
  }

  .arbitrage-flow {
    font-size: 0.75em;
    font-weight: 700;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
