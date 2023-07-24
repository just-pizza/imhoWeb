const contractStore = {
    namespaced: true,
    state: {
        contractObject: {}
    },
    getters: {},
    mutations: {
        setContractStore(state, payload) {
            state.contractObject = payload
        }
    },
    actions: {}
}

export default contractStore
