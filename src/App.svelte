<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Header from './components/Header.svelte'
  import Insight from './views/Insight.svelte'
  import Overview from './views/Overview.svelte'

  const routes: Route[] = [
    {
      name: '/',
      component: Overview,
    },
    {
      name: 'insight/:symbol',
      component: Insight,
    },
  ]
</script>

<Header />
<Router {routes} />
