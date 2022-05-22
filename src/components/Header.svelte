<script lang="ts">
  import { navigateTo } from 'svelte-router-spa'

  const toHome = () => {
    navigateTo('/')
  }
</script>

<div>
  <img src="/favicon.png" alt="hodler" on:click={toHome} />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    height: 4rem;
    background: #f4f4f4;
    border-bottom: 1px solid #fff;
    position: sticky;
    top: 0;
    padding: 0 0.75rem;
  }

  img {
    height: 2rem;
  }
</style>
