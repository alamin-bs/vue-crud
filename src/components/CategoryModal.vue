<template>
  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-2xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class=" flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-yellow-600"
          >
            <h3 class="text-3xl font-semibold text-white">
              Create Category
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div class="mb-3 pt-0">
              <label class="required" for="input">Name</label>
              <input
                id="input"
                type="text"
                placeholder="you must provide a category"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                v-model="name"
              />
              <p class="text-red-600 text-xs" v-if="isFieldEmpty">
                please provide a category
              </p>
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
              v-on:click="isCreating ? onCategoryCreate() : onCategoryUpdate()"
            >
              {{ isCreating ? "Create" : "Update" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      id: 0,
      name: "",
      isFieldEmpty: false,
    };
  },
  props: {
    isCreating: Boolean,
    showModal: Boolean,
    toggleModal: Function,
    currentCategory: Object,
  },
  methods: {
    toggle: function() {
      this.toggleModal();
    },
    onCategoryCreate: function() {
      if (this.name) {
        store.commit("addCategory", { id: ++this.id, name: this.name });
        this.isFieldEmpty = false;
        this.toggleModal();
        this.name = "";
      } else this.isFieldEmpty = true;
    },
    onCategoryUpdate: function() {
      store.commit("editCategory", {
        ...this.currentCategory,
        name: this.name,
      });
      this.toggleModal();
      this.name = "";
    },
  },
  watch: {
    currentCategory() {
      console.log("watcher");
      if (!this.isCreating) this.name = this.currentCategory.name;
      else this.name = "";
    },
  },
};
</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}
</style>
