<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import HeaderBar from './components/HeaderBar.svelte'
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

<HeaderBar />
<Router {routes} />
