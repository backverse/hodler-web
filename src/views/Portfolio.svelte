<script lang="ts">
  import Header from '../components/Header.svelte'
  import { abi as ERC20 } from '@openzeppelin/contracts/build/contracts/ERC20.json'
  import { defaultEvmStores, web3, connected, selectedAccount, chainId } from 'svelte-web3'
  import { contracts, web3Modal } from '../web3'
  import { prettyNumber } from '../utils'
  import Chart from 'chart.js/auto/auto'

  let allocationCanvas: HTMLCanvasElement
  let allocationChart: Chart
  let holdings: {
    name: string
    symbol: string
    displayBalance: string
    balance: number
    decimals: number
  }[] = []

  const connect = async () => {
    const provider = await web3Modal.connect()

    provider.on('accountsChanged', (accounts: string[]) => {
      onAccountChange()
    })

    provider.on('chainChanged', (chainId: number) => {
      onAccountChange()
    })

    provider.on('connect', (info: { chainId: number }) => {
      onAccountChange()
    })

    provider.on('disconnect', (error: { code: number; message: string }) => {
      disconnect()
    })

    await defaultEvmStores.setProvider(provider)
    onAccountChange()
  }

  const onAccountChange = async () => {
    const balance = await new $web3.eth.getBalance($selectedAccount)

    holdings = [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        displayBalance: prettyNumber({ value: balance }),
        balance,
        decimals: 18,
      },
    ]

    const $fetchTokenBalances = (contracts[$chainId] || [])
      .map((addr) => new $web3.eth.Contract(ERC20, addr))
      .map(async (contract) => {
        const [name, symbol, decimals, balance] = await Promise.all([
          contract.methods.name().call(),
          contract.methods.symbol().call(),
          contract.methods.decimals().call(),
          contract.methods.balanceOf($selectedAccount).call(),
        ])

        holdings = [
          ...holdings,
          {
            name,
            symbol,
            displayBalance: prettyNumber({ value: balance, decimals }),
            balance,
            decimals,
          },
        ]
      })

    await Promise.all($fetchTokenBalances)

    const data = {
      labels: holdings.map((holding) => holding.name),
      datasets: [
        {
          label: 'Portfolio',
          data: holdings.map((holding) => holding.balance),
          backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
          borderWidth: 0,
        },
      ],
    }

    allocationChart?.destroy()
    allocationChart = new Chart(allocationCanvas.getContext('2d'), { type: 'pie', data })
  }

  const disconnect = async () => {
    await defaultEvmStores.disconnect()
  }
</script>

<main>
  <div class="connect-wallet-container">
    <Header header="Portfolio" />

    {#if !$connected}
      <div on:click={connect} class="connect-wallet">
        <span class="material-symbols-outlined"> wallet </span> <span>Connect wallet</span>
      </div>
    {:else}
      <div on:click={disconnect} class="connect-wallet">
        <span class="material-symbols-outlined"> link_off </span> <span>Disconnect</span>
      </div>
    {/if}
  </div>

  <br />

  {#if $connected}
    <div style="display: flex;justify-content: center;padding: 2rem 0;">
      <div style="width: 300px;">
        <canvas bind:this={allocationCanvas} width="400" height="300" />
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="text-start">Name</th>
          <th scope="col" class="text-end">Holding</th>
          <th scope="col" class="text-end">Value</th>
        </tr>
      </thead>
      <tbody>
        {#each holdings as holding}
          <tr>
            <td class="text-start">
              {holding.name} ({holding.symbol})
            </td>
            <td class="text-end">
              {holding.displayBalance}
            </td>
            <td class="text-end">
              {holding.displayBalance}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>

<style>
  .connect-wallet-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .connect-wallet {
    display: flex;
    align-items: center;
    padding: 0.2rem 1rem;
    font-size: 0.9rem;
    font-weight: var(--black);
    background: var(--background-secondary);
    border-radius: 1rem;
    cursor: pointer;
  }

  .connect-wallet span {
    cursor: pointer;
  }

  .connect-wallet span + span {
    padding-left: 0.5rem;
  }
</style>
