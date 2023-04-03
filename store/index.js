export const state = () => ({
  categories: [],
  subCategories: [],
  processTypeList: [],

  category: null,
  subCategory: null,
  processType: null,
})

export const getters = {
  categories: (state) => state.categories,
  subCategories: (state) => state.subCategories,
  processTypeList: (state) => state.processTypeList,
  category: (state) => state.category,
  subCategory: (state) => state.subCategory,
  processType: (state) => state.processType,
}

export const actions = {
  async nuxtServerInit({ commit }) {},
  categoryChange({ state, commit }, payload) {
    if (payload) {
      commit('subCategories', payload?.children)
    } else {
      commit('subCategories', [])
      commit('setFieldValue', {
        key: 'subCategory',
        value: null,
      })
    }
  },
  async subCategoryChange({ state, commit }, payload) {
    const id = payload.id
    const { data } = await this.$axios.$get('/v1/properties', {
      params: {
        cat: id,
      },
      headers: {
        'private-key': '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16',
      },
    })
    const allData = [{ id: 0, name: 'Other' }, ...data]
    commit('processTypeList', allData)
  },
  async processTypeChange({ state, commit }, payload) {
    const id = payload?.id
    if(!id) {
      return
    }
    const { data } = await this.$axios.$get(`/v1/get-options-child/${id}`, {
      headers: {
        'private-key': '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16',
      },
    })
    console.warn('data', data);
    // const allData = [data]
    // commit('processTypeList', allData)
  },
}

export const mutations = {
  categories(state, val) {
    state.categories = val
  },
  subCategories(state, val) {
    state.subCategories = val
  },
  processTypeList(state, val) {
    state.processTypeList = val
  },
  setFieldValue(state, { key, value }) {
    state[key] = value
  },
}
