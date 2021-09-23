<template>
  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class=" flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-yellow-600"
          >
            <h3 class="text-3xl font-semibold text-white">
              View Post
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0">
              <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <!-- here -->
                    <h3>
                      TITLE:
                      <span class="text-gray-900 text-2xl">{{
                        currentPost.name
                      }}</span>
                    </h3>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <!-- here -->
                    <h3>
                      description:
                      <span class="text-gray-900 text-2xl">{{
                        currentPost.description
                      }}</span>
                    </h3>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <span v-if="currentPost.categoris.length">
                      CATEGORIS:
                      <p
                        v-for="category in currentPost.categoris"
                        :key="category.id"
                      >
                        {{ category.name }}
                      </p></span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggle()"
            >
              Close
            </button>
            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggle()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    toggleModal: Function,
    currentPost: Object,
  },
  methods: {
    toggle: function() {
      this.toggleModal();
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
