<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Overview from './views/Overview.svelte'

  const routes: Route[] = [
    {
      name: '/',
      component: Overview,
    },
  ]
</script>

<Router {routes} />
