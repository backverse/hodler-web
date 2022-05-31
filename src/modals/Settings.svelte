<script lang="ts">
  import { Theme } from '../constant'
  import { baseCode, basePrice, basePrices, exchangeId } from '../store'

  let isDarkMode = localStorage.getItem('prefer-scheme') === Theme.DARK
  const toggleTheme = () => {
    isDarkMode = document.body.classList.toggle(Theme.DARK)
    document.body.classList.toggle(Theme.LIGHT)
    localStorage.setItem('prefer-scheme', isDarkMode ? Theme.DARK : Theme.LIGHT)
  }

  const updateExchangeId = () => {
    if (++$exchangeId >= $basePrices.length) $exchangeId = 0
    $basePrice = $basePrices[$exchangeId].ask_price
    $baseCode = $basePrices[$exchangeId].code
    localStorage.setItem('base-exchange-id', $exchangeId.toString())
  }
</script>

<div class="container">
  <h2>Settings</h2>

  <div class="settings-item">
    <div class="settings-label">
      <h4>Theme</h4>
      <span>Tap the icon to switch between dark and light mode</span>
    </div>
    <span class="material-symbols-outlined" on:click={toggleTheme}>
      {isDarkMode ? 'dark_mode' : 'light_mode'}
    </span>
  </div>

  <div class="settings-item">
    <div class="settings-label">
      <h4>Currency</h4>
      <span>Tap the icon to switch between ฿THB and $USD </span>
    </div>
    <span class="material-symbols-outlined" on:click={updateExchangeId}> currency_bitcoin </span>
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
    align-items: center;
  }

  .settings-label {
    padding: 0.5rem 0;
  }

  h4 {
    margin: 0.25rem 0;
  }

  .settings-label span {
    color: var(--default-secondary);
    font-size: 0.8rem;
  }

  .material-symbols-outlined {
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
