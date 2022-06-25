<script lang="ts">
  import { navigateTo } from 'svelte-router-spa'
  import type { CurrentRoute } from 'svelte-router-spa/types/components/route'

  export let currentRoute: CurrentRoute & { childRoute: CurrentRoute }

  const to = (dest: string) => () => {
    navigateTo(dest)
  }
</script>

<ul class="navigator-container">
  <li
    class="navigator-item"
    on:click={to('/')}
    class:active={/^(\/|\/insights\/\w+)$/.test(currentRoute.path)}
  >
    <span class="material-symbols-outlined"> trending_up </span>
    OVERVIEW
  </li>
  <li
    class="navigator-item"
    on:click={to('portfolio')}
    class:active={currentRoute.path === '/portfolio'}
  >
    <span class="material-symbols-outlined"> work </span>
    PORTFOLIO
  </li>
</ul>

<style>
  .navigator-container {
    background: var(--background-secondary);
    border-top: 1px solid var(--border-primary);
    height: 3.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .navigator-item {
    color: var(--default-secondary);
    font-size: 0.6875rem;
    font-weight: var(--light);
    display: grid;
    flex: 1 1;
    justify-items: center;
    cursor: pointer;
  }

  .material-symbols-outlined {
    font-size: 1rem;
    cursor: pointer;
  }

  .active {
    color: var(--default-primary);
    font-weight: var(--bold);
  }
</style>
