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
              {{ isCreating ? "Create Post" : "Update Post" }}
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0">
              <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="title"
                    >
                      Title
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="title"
                      type="text"
                      placeholder="type here..."
                      v-model="name"
                    />
                    <p v-if="isFieldEmpty" class="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label class="typo__label">add category</label>
                    <multiselect
                      v-model="value"
                      :options="options"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="select category"
                      label="name"
                      track-by="name"
                    >
                      >
                      <template v-slot:beforeList>
                        <div>
                          <button
                            @click="handleClick"
                            class=" text-xl text font-bold cursor-pointer p-3"
                          >
                            Create New Category
                          </button>
                        </div>
                      </template>
                    </multiselect>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block text-left" style="max-width: 400px;">
                      <span class="text-gray-700">Textarea</span>
                      <textarea
                        v-model="description"
                        class="form-textarea mt-1 block w-full"
                        rows="3"
                        placeholder="enter description."
                      ></textarea>
                    </label>
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
              v-on:click="isCreating ? onPostCreate() : onPostUpdate()"
            >
              {{ isCreating ? "Create" : "Update" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <category-modal
      :isCreating="true"
      :showModal="showCategoryModal"
      :toggleModal="toggleCategoryModal"
    ></category-modal>
  </div>
</template>

<script>
//import store from "../store";
import Multiselect from "vue-multiselect";
//import "vue-multiselect/dist/vue-multiselect.min.css";
import CategoryModal from "./CategoryModal.vue";
export default {
  //name: "regular-modal",
  components: {
    Multiselect,
    "category-modal": CategoryModal,
  },
  data() {
    return {
      id: 0,
      name: "",
      description: "",
      value: [],
      showCategoryModal: false,
      isFieldEmpty: false,
    };
  },
  props: {
    isCreating: Boolean,
    showModal: Boolean,
    toggleModal: Function,
    currentPost: Object,
  },
  methods: {
    handleClick: function(e) {
      e.preventDefault();
      this.toggleCategoryModal();
    },
    toggle: function() {
      this.toggleModal();
    },
    toggleCategoryModal: function() {
      this.showCategoryModal = !this.showCategoryModal;
    },
    onPostCreate: function() {
      if (this.name) {
        this.$store.commit("addPost", {
          id: ++this.id,
          name: this.name,
          description: this.description,
          categoris: this.value,
        });
        this.isFieldEmpty = false;
        this.toggleModal();
        this.name = "";
      } else this.isFieldEmpty = true;
    },
    onPostUpdate: function() {
      this.$store.commit("editPost", {
        id: this.currentPost.id,
        name: this.name,
        categoris: [...this.value],
        description: this.description,
      });
      this.toggleModal();
      //this.name = "";
    },
  },
  watch: {
    currentPost() {
      console.log("watcher");
      if (!this.isCreating) {
        this.name = this.currentPost.name;
        this.value = [...this.currentPost.categoris];
        this.description = this.currentPost.description;
      } else {
        this.name = "";
        this.value = [];
        this.description = "";
      }
    },
  },
  computed: {
    options() {
      return this.$store.state.categoryModule.categoryList;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
