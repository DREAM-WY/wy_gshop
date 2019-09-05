// 基于state的getter计算属性对象
export default {
  totalCount (state) {
    return state.cartFoods.reduce((totle, food) => totle + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((totle, food) => totle + food.count * food.price, 0)
  },
  positiveSize (state) {
    return state.shopRatings.reduce((totle, rating) => totle + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
