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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名：" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货地址" prop="">
                                        <!-- 省市区联动插件 -->
                                        <v-distpicker 
                                            @selected="selected"
                                            :province="orderForm.area.province.value" 
                                            :city="orderForm.area.city.value" 
                                            :area="orderForm.area.area.value">
                                        </v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话：">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱：" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio><em>手续费：0.00元</em>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <el-radio v-model="orderForm.express_id" @change="expressChange(20)" label="1">顺丰快递（费用:20元）</el-radio>
                                    <el-radio v-model="orderForm.express_id" @change="expressChange(10)" label="2">中通快递（费用:10元）</el-radio>
                                    <el-radio v-model="orderForm.express_id" @change="expressChange(8)" label="3">圆通快递（费用:8元）</el-radio>
                                    <!-- <li>
                                        <label>
                                            <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                            <input name="express_price" type="hidden" value="20.00">顺丰快递
                                            <em>费用：20.00元</em>
                                            <span class="Validform_checktip"></span>
                                        </label>
                                    </li> -->
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in orderList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <el-input
                                                type="textarea"
                                                :rows="4"
                                                placeholder="请输入内容"
                                                v-model="orderForm.message"
                                                resize="none"
                                                style="width:500px">
                                            </el-input>
                                            <!-- <dd>
                                                <textarea name="message" class="input" style="height:35px;"></textarea>
                                            </dd> -->
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    name:'order',
    // 导入联动插件模板
    components: { VDistpicker },
    data(){
        // 自定义规则 --- 手机号码
        var checkMobile = (rule, value, callback) => {
            let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            setTimeout(() => {
                if (exec.test(value) == true) {
                    callback();
                } else {
                    callback(new Error('手机号码输入错误！'));
                }
            }, 1000);
        }
        // 自定义规则 --- 邮箱
        var checkEmail = (rule, value, callback) => {
            if (value.trim().length != 0) {
                let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if(exec.test(value.trim())){
                    callback();
                }else{
                    callback(new Error('邮箱格式错误！'));
                }
            } else {
               callback();
            }
        }
        // 自定义规则 --- 邮编
        var checkPostCode = (rule, value, callback) => {
            if (value.trim().length != 0) {
                let exec = /^[1-9]\d{5}(?!\d)$/;
                if(exec.test(value.trim())){
                    callback();
                }else{
                    callback(new Error('邮编格式错误！'));
                }
            } else {
               callback();
            }
        }
        return{
            orderForm:{
                goodsAmount:0,//商品总额
                expressMoment:20,//快递费
                accept_name: 'Allen',//收货人
                address: '灵芝地铁站',//收货地址
                mobile: '18788888888',//收货人手机号码
                email: '123@qq.com',//邮箱
                post_code: '456456',//邮编
                payment_id:'6',//支付方式
                express_id:'1',//快递方式
                message:"跳楼大甩卖",//订单备注信息
                goodsids:1,//购买商品的id
                cargoodsobj:{},//购买商品对象
                area:{
                    "province":{code: "440000",value:"广东省" },
                    "city":{code: "440300",value:"深圳市" },
                    "area":{code: "440306",value:"宝安区"}
                },// 省市区
                phone: '6668888',//收货人的联系电话，非必填
            },
            orderList:[],//订单信息
            rules: {
                // 收货人
                accept_name: [
                    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'change' }
                ],
                // 收货地址
                address: [
                    { required: true, message: '请输入地址,没有我送给谁呀', trigger: 'blur' }
                ],
                // 手机号码
                mobile: [
                    {  required: true, validator: checkMobile, trigger: 'change' }
                ],
                // 邮箱
                email: [
                    {  validator: checkEmail, trigger: 'change' }
                ],
                // 邮编
                post_code: [
                    { validator: checkPostCode, trigger: 'change' }
                ],
            },
        }
    },
    methods:{
        selected(value){    // 选择后的省市区信息
            this.orderForm.area = value;
            // this.orderForm.area.province = value.province.value;
            // this.orderForm.area.city = value.city.value;
            // this.orderForm.area.area = value.area.value;
        },
        expressChange(price){   //点击快递获取对象的快递费
            this.orderForm.expressMoment = price;
        },
        sureOrder(){    //确定提交订单信息
            this.$axios.post('site/validate/order/setorder',this.orderForm).then(response=>{
                // console.log(response);
                if(response.data.status==0){
                    // 编程式导航 --- 支付中心页面
                    this.$router.push('/payorder/'+response.data.message.orderid);
                    // 删除购物车数据 删除购物车中 提交订单的数据
                    this.orderList.forEach(v=>{
                        this.$store.commit('deteleCart',v.id);
                    })
                   
                }
            })
        }
    },
    created() { 
        // 直接获取 路由信息里面的 id
        this.orderForm.goodsids = this.$route.params.id;//购买商品的 id ,格式为：88,89

        // 根据商品id字符串，获取商品数据
        this.$axios.get(`site/validate/order/getgoodslist/${this.$route.params.id}`).then(response=>{
            // console.log(response);
            let total = 0;//商品金额
            let cargoodsobj = {};//购买商品对象 格式为：{87:2,89:1}
            // 循环计算商品金额
            response.data.message.forEach(v=>{
                // 根据 id 获取 vuex 里面的数量，在组装赋值
                v.buycount = this.$store.state.cartCount[v.id];
                // 商品总额
                v.totalamount = v.buycount * v.sell_price;
                // 多件商品累计总金额
                total += v.totalamount;
                // 注意：这里获取值的方式是以 [] 的形式进行添加 键 / 值  获取购买商品对象
                cargoodsobj[v.id] = v.buycount;
            });
            this.orderList = response.data.message; //商品信息
            
            // 多件商品累计总金额 赋值
            this.orderForm.goodsAmount = total;
            // 购买商品对象 赋值
            this.orderForm.cargoodsobj = cargoodsobj;
        })
    },
    // 计算属性
    computed:{
        // 总数量
        totalCount(){
            let count = 0;
            this.orderList.forEach(v=>{
                count += v.buycount;
            })
            return count;
        }
    }
};
</script>
<style>
</style>
