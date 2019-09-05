// 间接更新
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-type'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogOut,
  reqGetInfo,
  reqGetRatings,
  reqGetGoods,
  reqShopLists
} from '../api'
export default {
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  async getcategorys ({commit}) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  async getshops ({commit, state}) {
    const result = await reqShops(state.latitude, state.longitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步退出登录
  async logout ({commit}) {
    const result = await reqLogOut()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqGetInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, {shopInfo})
    }
  },
  async getShopGoods ({commit}, cb) {
    const result = await reqGetGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS, {shopGoods})
      cb && cb()
    }
  },
  async getShopRatings ({commit}, cb) {
    const result = await reqGetRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})
      cb && cb()
    }
  },
  // 同步更新food中的count数量
  updataFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 清除购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 搜索商家
  async getSearchShops ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqShopLists(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
