<script lang="ts">
  import { getContext } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Settings from '../modals/Settings.svelte'
  import { baseCode, basePrice } from '../store'

  const toHome = () => {
    navigateTo('/')
  }

  const { open } = getContext('simple-modal')
  const openSettingsModal = () => {
    open(Settings)
  }
</script>

<div>
  <img class="logo" src="/favicon.png" alt="hodler" on:click={toHome} />
  <div>
    <span class="currency-label">
      {$basePrice?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || ''}
      {$baseCode || ''}
      = 1 BTC
    </span>
    <span class="material-symbols-outlined icon-settings" on:click={openSettingsModal}>
      settings
    </span>
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

  span.icon-settings {
    cursor: pointer;
  }

  .currency-label {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: var(--black);
    background: var(--background-secondary);
    border-radius: 1rem;
    margin-right: 1rem;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  img.logo {
    height: 1.75rem;
    cursor: pointer;
  }
</style>
