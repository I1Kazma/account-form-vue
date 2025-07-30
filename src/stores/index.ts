import { defineStore } from 'pinia'

export const useStore = defineStore('accountStore', {
  state: () => {
    const savedState = localStorage.getItem('accountStore')
    return {
      accounts: savedState ? JSON.parse(savedState) : [],
    }
  },
  actions: {
    updateAccounts(accounts: any[]) {
      this.accounts = accounts
      localStorage.setItem('accountStore', JSON.stringify(accounts))
    },
  },
})
