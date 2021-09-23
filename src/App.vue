<template>
  <div id="app" class="container  p-12">
    <tabs></tabs>
  </div>
</template>

<script>
import "tailwindcss/tailwind.css";
import Tabs from "./components/Tabs.vue";

export default {
  name: "App",
  components: {
    tabs: Tabs,
  },
  data: function() {
    return {
      post: true,
      a: "",
      b: "",
    };
  },
  mounted() {
    if (localStorage.categoryList) {
      this.$store.commit(
        "copyCategoryFromLocal",
        JSON.parse(localStorage.getItem("categoryList"))
      );
    }
    if (localStorage.postList) {
      this.$store.commit(
        "copyPostFromLocal",
        JSON.parse(localStorage.getItem("postList"))
      );
    }
  },
  computed: {
    postList: function() {
      return this.$store.state.postList;
    },
    categoryList: function() {
      return this.$store.state.categoryModule.categoryList;
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
