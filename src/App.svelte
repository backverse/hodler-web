<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Modal from 'svelte-simple-modal'
  import Layout from './components/Layout.svelte'
  import { Theme } from './constant'
  import Portfolio from './views/Portfolio.svelte'
  import Insight from './views/Insight.svelte'
  import Overview from './views/Overview.svelte'
  import { getBasePrices } from './client'
  import { basePrice, basePrices, exchangeId } from './store'

  const theme = localStorage.getItem('prefer-scheme')
  if (!theme) localStorage.setItem('prefer-scheme', Theme.DARK)
  document.body.classList.add(theme || Theme.DARK)

  getBasePrices().then((prices) => {
    $basePrices.push(...prices)
    basePrice.set($basePrices[$exchangeId].ask_price)
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
