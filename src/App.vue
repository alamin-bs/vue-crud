<template>
  <div id="app" class="container  p-12">
    <tabs></tabs>
  </div>
</template>

<script>
import "tailwindcss/tailwind.css";
import Tabs from "./components/Tabs.vue";
import store from "./store";
export default {
  name: "App",
  store,
  components: {
    tabs: Tabs,
  },
  mounted() {
    if (localStorage.categoryList) {
      store.commit(
        "copyCategoryFromLocal",
        JSON.parse(localStorage.getItem("categoryList"))
      );
    }
    if (localStorage.postList) {
      store.commit(
        "copyPostFromLocal",
        JSON.parse(localStorage.getItem("postList"))
      );
    }
  },
  computed: {
    postList: function() {
      return store.state.postList;
    },
    categoryList: function() {
      return store.state.categoryModule.categoryList;
    },
  },
  watch: {
    postList: function(newPost) {
      const parsed = JSON.stringify(newPost);
      localStorage.setItem("postList", parsed);
    },
    categoryList: function(newCategory) {
      const parsed = JSON.stringify(newCategory);
      localStorage.setItem("categoryList", parsed);
    },
  },
};
</script>
