<script lang="ts">
  import { onMount } from 'svelte'
  import { Currency, getCurrencies } from '../client'
  import { Theme } from '../constant'
  import { currency, exchange, getTheme, setExchange, setTheme } from '../store'

  let currencies: Currency[] = []
  let isDarkMode = getTheme() === Theme.DARK

  const toggleTheme = () => {
    isDarkMode = document.body.classList.toggle(Theme.DARK)
    document.body.classList.toggle(Theme.LIGHT)
    setTheme(isDarkMode ? Theme.DARK : Theme.LIGHT)
  }

  const updateExchange = (exchange: string) => async () => {
    $currency = currencies.find((c) => c.exchange === exchange)
    setExchange(exchange)
  }

  onMount(async () => {
    currencies = await getCurrencies()
  })
</script>

<div class="container">
  <h2>Settings</h2>

  <h4>Theme</h4>
  <div class="settings-item">
    <div class="settings-label">
      <span>Tap the icon to switch between dark and light mode</span>
    </div>
    <span class="material-symbols-outlined" on:click={toggleTheme}>
      {isDarkMode ? 'dark_mode' : 'light_mode'}
    </span>
  </div>

  <h4>Currency</h4>
  <div class="settings-item">
    <div class="settings-label">
      <span>Tap the icon to change base currency </span>
      <div class="currency-options">
        {#each currencies as currency}
          <div
            class="currency-option"
            class:active={$exchange === currency.exchange}
            on:click={updateExchange(currency.exchange)}
          >
            <div class="material-symbols-outlined">
              {currency.symbol}
            </div>
            {currency.code}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    padding: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .settings-item {
    display: flex;
    justify-content: space-between;
  }

  .settings-label {
    padding: 0.5rem 2.5rem 0.5rem 0;
  }

  h4 {
    margin: 1.5rem 0 0.25rem;
  }

  .settings-label span {
    color: var(--default-secondary);
    font-size: 0.8rem;
  }

  .material-symbols-outlined {
    font-size: 1.5rem;
    cursor: pointer;
  }

  .currency-options {
    display: flex;
  }

  .currency-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    background: var(--background-secondary);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    margin: 0.5rem 0.5rem 0 0;
    color: var(--default-secondary);
  }

  .currency-option.active {
    color: var(--default-primary);
    font-weight: var(--bold);
  }

  .currency-option .material-symbols-outlined {
    font-size: 1.25rem;
    width: 1.5rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
