import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return { is_authenticated: false }
    },

    actions: {
        setAuth(new_value) {
            this.is_authenticated = new_value;
        },
    },
    persist: true
})