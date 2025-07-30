import { defineStore } from 'pinia'
import type { Account } from '../types/account'

export const useStore = defineStore('accountStore', {
  state: () => {
    const savedState = localStorage.getItem('accountStore')
    return {
      accounts: savedState ? (JSON.parse(savedState) as Account[]) : [],
    }
  },
  actions: {
    updateAccounts(accounts: Account[]) {
      this.accounts = accounts
      localStorage.setItem('accountStore', JSON.stringify(accounts))
    },
  },
})
