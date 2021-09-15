<template>
  <div>
    <div class="row-span-1">
      <div class="col flex justify-between">
        <div class="text-4xl font-semibold text text-yellow-500">
          All Category
        </div>

        <div>
          <button
            class=" bg-yellow-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            @click="onCategoryCreate"
          >
            Create Category
          </button>
        </div>
      </div>
      <div class="col p-10">
        <!-- table start from here -->
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>

              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(category, index) in categoryList" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <h4>{{ category.name }}</h4>
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3"
              >
                <span
                  type="button"
                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  @click="onEdit(category)"
                  >Edit</span
                >
                <span
                  type="button"
                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  @click="onDelete(category)"
                  >Delete</span
                >
              </td>
            </tr>

            <!-- More people... -->
          </tbody>
        </table>
      </div>
    </div>

    <modal
      :isCreating="isCreating"
      :currentCategory="currentCategory"
      :showModal="showModal"
      :toggleModal="toggleModal"
    ></modal>
  </div>
</template>

<script>
import Modal from "./CategoryModal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      isCreating: true,
      showModal: false,
      currentCategory: {},
    };
  },
  methods: {
    onCategoryCreate() {
      this.isCreating = true;
      this.currentCategory = {};
      this.toggleModal();
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    onEdit(category) {
      this.isCreating = false;
      this.currentCategory = { ...category };
      this.toggleModal();
    },
    onDelete(category) {
      console.log("delete");
      this.$store.commit("removeCategory", category);
    },
  },
  computed: {
    categoryList: function() {
      return this.$store.state.categoryModule.categoryList;
    },
  },
};
</script>

<style></style>
