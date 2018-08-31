<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch
                                            v-model="item.selected"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" width="70px" alt="">
                                    </td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- 如果要保留 原始的形参，额外增加一个自定义的实参， $event 保留事件参数 -->
                                        <el-input-number size="mini" :min='0' v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <el-button type="danger" @click="delOne(item.id)" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr v-if="message.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物</router-link>
                                                    吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{productCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{productPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index" tag="button" class="button">继续购物</router-link>
                            <!-- <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button> -->
                            <button class="submit"  @click="checkAndSubmit" >立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "shoppingcart",
  data() {
    return {
      message: []
    };
  },
  created() {
    //钩子函数
    // 拿到购物车的数据--- 我们需要的数据格式：id1,id2,id3
    let cartDate = this.$store.state.cartCount;
    // console.log(cartDate);
    // 判断是否为空对象。空对象表示清空了购物车，就停止后面的代码
    if(JSON.stringify(cartDate) == "{}"){
        return;
    }
    // 定义拼接的数据
    let ids = "";
    // 遍历对象数据，获取购买的数量
    for (const key in cartDate) {
      ids += key + ",";
    }
    // console.log(ids);
    // 删除最后一个逗号
    ids = ids.slice(0, -1);
    // console.log(ids);
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      //   console.log(response);
      // 因为服务器返回的数据 没有购买数量 他们也不知道
      // 我们自行拼接个数
      response.data.message.forEach(value => {
        value.buycount = cartDate[value.id];
        // 增加一个值，用来判断是否被选中
        value.selected = true;
      });
      // 组装好的数据在赋值给 message 数组
      this.message = response.data.message;
    });
  },
  computed: {
    //计算属性
    // 计算商品总件数
    productCount() {
      let num = 0;
      // 遍历数组，累加
      this.message.forEach(v => {
          if(v.selected){
            num += parseInt(v.buycount);
          }
      });
      return num;
    },
    // 计算商品总金额
    productPrice() {
      let money = 0;
      this.message.forEach((v, i) => {
          if(v.selected){
              money += parseInt(v.buycount) * v.sell_price;
          }
      });
      return money;
    }
  },
  methods: {
    // 更新
    numChange(num, id) {
      // 调用仓库的方法 (提交载荷)
      this.$store.commit("updateCart", {
        productId: id,
        goodsNum: num
      });
    },
    // 删除
    delOne(id) {
      // 调用仓库的删除方法 (提交载荷)
      this.$store.commit("deteleCart", id);

      // 删除当前页码的数组数据
      this.message.forEach((v, i) => {
        if (v.id == id) {
          this.message.splice(i, 1);
        }
      });
    },
    // 点击 结算按钮跳转到 订单页面，在这之前如果还没有登录叫跳转到登录页面，
    // 这一步交给 main.js 中的 路由守卫 去处理
    checkAndSubmit() {
        let ids = "";
        // 遍历数组数据
        this.message.forEach((v, i) => {
            if(v.selected){
                ids += v.id + ",";
            }
        });
        ids = ids.slice(0, -1);
        // console.log(ids);
        if (ids == "") {
            // 一个都没选
            this.$Message.warning("哥们,你起码选一个呀!!!");
            return;
        }
        // 跳转到订单信息页码
        this.$router.push(`/order/${ids}`);
    }
  }
};
</script>
<style>
</style>

