<template>
  <div>
    <div class="row-span-1">
      <div class="col flex justify-between">
        <div class="text-4xl font-semibold text text-yellow-500">
          All Post
        </div>

        <div>
          <button
            class=" bg-yellow-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            @click="onPostCreate"
          >
            Create Post
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
            <tr v-for="(post, index) in postList" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <h4>{{ post.name }}</h4>
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3"
              >
                <span
                  type="button"
                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  @click="onView(post)"
                  >View</span
                >
                <span
                  type="button"
                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  @click="onEdit(post)"
                  >Edit</span
                >
                <span
                  type="button"
                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  @click="onDelete(post)"
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
      :currentPost="currentPost"
      :showModal="showModal"
      :toggleModal="toggleModal"
    ></modal>
    <view-post-modal
      :currentPost="currentPost"
      :showModal="showViewModal"
      :toggleModal="toggleViewModal"
    ></view-post-modal>
  </div>
</template>

<script>
import Modal from "./PostModal.vue";
import ViewPostModal from "./ViewPostModal.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    Modal,
    ViewPostModal,
  },

  setup() {
    const store = useStore();
    const isCreating = ref(true);
    const showModal = ref(false);
    const showViewModal = ref(false);
    const currentPost = ref({});
    const postList = computed(function() {
      return store.state.postList;
    });
    function onPostCreate() {
      isCreating.value = true;
      currentPost.value = {};
      toggleModal();
    }
    function toggleModal() {
      showModal.value = !showModal.value;
    }
    function toggleViewModal() {
      showViewModal.value = !showViewModal.value;
    }
    function onView(post) {
      currentPost.value = { ...post };
      toggleViewModal();
    }
    function onEdit(post) {
      isCreating.value = false;
      currentPost.value = { ...post };
      toggleModal();
    }
    function onDelete(post) {
      store.commit("removePost", post);
    }
    return {
      isCreating,
      showModal,
      showViewModal,
      currentPost,
      onPostCreate,
      toggleModal,
      toggleViewModal,
      onView,
      onEdit,
      onDelete,
      postList,
    };
  },
};
</script>

<style></style>
