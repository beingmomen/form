<template>
  <div class="flex justify-center mt-20">
    <form class="w-6/12">
      <FormVSelect
        label="Categories"
        place-holder="Select Category"
        list-data="categories"
        store-key="category"
        change
      />
      <FormVSelect
        label="Sub Category"
        place-holder="Select Sub Category"
        list-data="subCategories"
        store-key="subCategory"
        change
      />
      <FormVSelect
        v-if="subCategory"
        label="Process Type"
        place-holder="Select Process Type"
        list-data="processTypeList"
        store-key="processType"
        change
      />
      <input
        v-if="processType?.name == 'Other'"
        type="text"
        placeholder="From User"
        class="input w-full border-solid border-2 border-gray-300"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios, store }) {
    const { data } = await $axios.$get('/get_all_cats')
    // console.warn('data', data.categories);
    store.commit('categories', data.categories)
    // store.dispatch('categories/getAllDataFromApi', data)
    return {}
  },
  data() {
    return {
      category: null,
    }
  },
  computed: {
    subCategory() {
      return this.$store.getters.subCategory
    },
    processType() {
      return this.$store.getters.processType
    },
  },
  methods: {
    changeData() {},
  },
}
</script>
