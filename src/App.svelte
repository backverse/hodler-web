<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Layout from './components/Layout.svelte'
  import Portfolio from './views/Portfolio.svelte'
  import Insight from './views/Insight.svelte'
  import Overview from './views/Overview.svelte'

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

<Router {routes} />
