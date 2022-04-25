import { createStore } from "vuex";
import VuexPersist from "vuex-persist";


const VuexLocal = new VuexPersist({
    storage:window.localStorage,
});

export default createStore({
    state:{},
    mutations:{},
    getters:{},

    plugins:[VuexLocal.plugin],//插件对象
})