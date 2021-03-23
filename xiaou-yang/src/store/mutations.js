export const state={
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
    cartList:[],//购物车列表数据
    }
export const mutations={
changeUser(state,user){
    state.user= user;
    if(user){
sessionStorage.setItem('user',JSON.stringify(user))
    }else{
        sessionStorage.removeItem('user') 
    }
},
changeCartList(state,arr){
    state.cartList = arr
  }
}


export const getters={
    user(state){
        return state.user
      },
      cartList(state){
        return state.cartList
      },
      // 求总价
  sumAcount(state){
    let sum = 0;
    if(state.cartList !== null){
      state.cartList.map(item=>{
        sum += item.price*item.num
      })
    }
    return sum*100
  },
  total(state){
    let total = 0;
    if(state.cartList !== null) {
      state.cartList.map(item=>{
        total += item.num
      })
    }
    return total
  }
}