<script lang="ts">
  import { navigateTo } from 'svelte-router-spa'
  import { BasePrice, getBasePrices } from '../client'
  import { basePrice } from '../store'

  const basePrices: BasePrice[] = []
  let exchangeId = Number(localStorage.getItem('base-exchange-id')) || 0

  const updateExchangeId = () => {
    if (++exchangeId >= basePrices.length) exchangeId = 0
    basePrice.set(basePrices[exchangeId].ask_price)
    localStorage.setItem('base-exchange-id', exchangeId.toString())
  }

  getBasePrices().then((prices) => {
    basePrices.push(...prices)
    basePrice.set(basePrices[exchangeId].ask_price)
  })

  const toHome = () => {
    navigateTo('/')
  }

  const DARK_THEME = 'dark-theme'
  const LIGHT_THEME = 'light-theme'
  const toggleTheme = () => {
    document.body.classList.toggle(DARK_THEME) && localStorage.setItem('prefer-scheme', DARK_THEME)
    document.body.classList.toggle(LIGHT_THEME) &&
      localStorage.setItem('prefer-scheme', LIGHT_THEME)
  }

  const theme = localStorage.getItem('prefer-scheme')
  if (!theme) localStorage.setItem('prefer-scheme', DARK_THEME)
  document.body.classList.add(theme || DARK_THEME)
</script>

<div>
  <img class="logo" src="/favicon.png" alt="hodler" on:click={toHome} />
  <div>
    <span class="symbol-value">{$basePrice?.toFixed(2)}</span>
    <img
      class="symbol-icon"
      src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png"
      alt="base price"
      on:click={updateExchangeId}
    />
    <span class="seperator">|</span>
    <span class="material-symbols-outlined" on:click={toggleTheme}> dark_mode </span>
  </div>
</div>

<style>
  div {
    background: var(--background-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    border-bottom: var(--border-primary);
    position: sticky;
    top: 0;
    padding: 0 0.75rem;
  }

  span.symbol-value,
  span.seperator {
    padding: 1rem;
  }

  img.logo {
    height: 1.75rem;
    cursor: pointer;
  }

  img.symbol-icon {
    height: 1.25rem;
    cursor: pointer;
  }
</style>
