<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <router-link
            to="/post"
            class=" cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            v-on:click="toggleTabs(1)"
            v-bind:class="{
              'text-yellow-500 bg-white': openTab !== 1,
              'text-white bg-yellow-500': openTab === 1,
            }"
          >
            Post
          </router-link>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <router-link
            to="/category"
            class=" cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            v-on:click="toggleTabs(2)"
            v-bind:class="{
              'text-yellow-500 bg-white': openTab !== 2,
              'text-white bg-yellow-500': openTab === 2,
            }"
          >
            Category
          </router-link>
        </li>
      </ul>
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <!-- <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <post></post>
            </div>
            <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <category></category>
            </div> -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Category from "./Category.vue";
// import Post from "./Post.vue";
export default {
  name: "tabs",
  // components: {
  //   category: Category,
  //   post: Post,
  // },
  data() {
    return {
      openTab: 1,
    };
  },
  methods: {
    toggleTabs: function(tabNumber) {
      this.openTab = tabNumber;
    },
  },
};
</script>
