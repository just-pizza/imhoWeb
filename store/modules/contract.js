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
    actions: {

        nuxtServerInit({ commit }, { req }) {
            try {
                // 서버 사이드에서 초기 데이터를 가져와서 상태에 설정
                // const data = await fetchDataFromServer(req)
                commit('setContractStore', contractObject)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    }
}

export default contractStore
