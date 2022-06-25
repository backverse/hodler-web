import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import Web3Modal from 'web3modal'

export const web3Modal = new Web3Modal({
  cacheProvider: false,
  disableInjectedProvider: false,
  theme: {
    background: 'var(--background-primary)',
    main: 'var(--default-primary)',
    secondary: 'var(--default-secondary)',
    border: 'var(--border-primary)',
    hover: 'var(--background-secondary)',
  },
  providerOptions: {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
      },
    },
  },
})

export const contracts: Record<number, string[]> = {
  42: ['0x016750ac630f711882812f24dba6c95b9d35856d'],
}
