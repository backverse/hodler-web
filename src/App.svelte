<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Modal from 'svelte-simple-modal'
  import { getCurrencies } from './client'
  import Layout from './components/Layout.svelte'
  import { currency, exchange, getTheme } from './store'
  import Insight from './views/Insight.svelte'
  import Overview from './views/Overview.svelte'
  import Portfolio from './views/Portfolio.svelte'

  document.body.classList.add(getTheme())

  getCurrencies().then((currencies) => {
    currency.set(currencies.find((c) => c.exchange === $exchange))
  })

  const routes: Route[] = [
    {
      name: '/',
      component: Overview,
      layout: Layout,
    },
    {
      name: 'insights/:symbol',
      component: Insight,
      layout: Layout,
    },
    {
      name: 'portfolio',
      component: Portfolio,
      layout: Layout,
    },
  ]
</script>

<Modal
  closeButton={false}
  styleWindow={{
    background: 'var(--background-primary)',
    color: 'var(--default-primary)',
  }}
>
  <Router {routes} />
</Modal>

<style>
</style>
