<script>
  export let header = ''
  export let subheader = ''
  export let subheaderImg = ''
</script>

<div class="header-container">
  <h1>{header}</h1>

  {#if subheader}
    <span class="seperator">|</span>
    <span class="subheader">{subheader}</span>
    <img class="subheader-img" src={subheaderImg} alt={subheader} />
  {/if}
</div>

<style>
  div.header-container {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
  }

  span {
    color: var(--default-secondary);
  }

  .seperator {
    margin: 0 1rem 0 1.5rem;
  }

  .subheader {
    font-size: 1.25rem;
  }

  .subheader-img {
    border-radius: 50%;
    height: 1.25rem;
    margin-left: 1rem;
  }
</style>
