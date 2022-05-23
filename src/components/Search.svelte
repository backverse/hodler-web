<script lang="ts">
  export let value: string
</script>

<section>
  <span class="material-symbols-outlined"> search </span>
  <input class="search-payload" spellcheck="false" bind:value />
</section>

<style>
  section {
    background: var(--background-secondary);
  }

  section {
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;
  }

  .material-symbols-outlined {
    margin: 0 0.5rem 0 1rem;
    font-size: 1.25rem;
  }

  input {
    width: 100%;
    margin: 0;
    border: 0;
    margin-right: 1rem;
  }

  input:focus-visible {
    outline: 0;
  }
</style>
