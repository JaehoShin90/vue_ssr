const store = {
    state: {
        ssrRenderData: {}
    },
    setState(newState) {
        this.state = {...this.state, ...newState};
    }
}

module.exports = store;