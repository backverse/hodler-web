<script lang="ts">
  import { Route } from 'svelte-router-spa'
  import type { CurrentRoute } from 'svelte-router-spa/types/components/route'
  import HeaderBar from './HeaderBar.svelte'
  import Navigator from './Navigator.svelte'

  export let currentRoute: CurrentRoute & { childRoute: CurrentRoute }
</script>

<HeaderBar />
<Route bind:currentRoute />
<Navigator bind:currentRoute />
