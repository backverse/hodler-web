<script lang="ts">
  import { navigateTo } from 'svelte-router-spa'

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
  <img src="/favicon.png" alt="hodler" on:click={toHome} />
  <span class="material-symbols-outlined" on:click={toggleTheme}> dark_mode </span>
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

  img {
    height: 1.75rem;
    cursor: pointer;
  }
</style>
