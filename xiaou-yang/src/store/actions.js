import { getCart } from "../utils/request"
export default{
    userActions(context,user){
        context.commit('changeUser',user)
    }
    ,
  cartListActions(context,uid){
    // 发起获取购物车列表请求
    getCart({uid}).then(res=>{
      context.commit('changeCartList',res.data.list)
    })
  }

}