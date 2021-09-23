
import { createStore } from "vuex";




const categoryModule = {
  state: {
      categoryList:[]
  },
  mutations: {
      addCategory(state, payload){
          state.categoryList.push(payload)
          console.log('payload ',payload)
      },
      editCategory(state,payload){
        const index = state.categoryList.findIndex(
          (item) => item.id === payload.id
        );
        state.categoryList.splice(index, 1, {...payload});
      },
      removeCategory(state,payload){
        const index = state.categoryList.findIndex(
          (item) => item.id === payload.id
        );
        state.categoryList.splice(index, 1);
      },
      copyCategoryFromLocal(state,payload){
        state.categoryList.push(...payload)
      }
  },
  getters: {
      
  },
  actions: {
      
  }
}
const store = createStore({
  modules:{
    categoryModule
  },
  state: {
    postList: []
  },
  mutations: {
    addPost(state, payload){
      state.postList.push(payload)
     
  },
  editPost(state,payload){
    const index = state.postList.findIndex(
      (item) => item.id === payload.id
    );
    state.postList.splice(index, 1, {...payload});
  },
  removePost(state, payload){
    const index = state.postList.findIndex(
      (item) => item.id === payload.id
    );
    state.postList.splice(index, 1);
  },
  copyPostFromLocal(state,payload){
    state.postList.push(...payload)
  }
  },
  
})
export default  store;
