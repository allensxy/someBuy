<template>
    <div class="el-row">
        <div class="el-col el-col-24">
            <div class="comp">
                <div class="tmpl routeanimate">
                    <div class="section">
                        <div class="location">
                            <span>当前位置：</span>
                            <a href="/index.html">首页</a> &gt;
                            <router-link to="/vipcenter">会员中心 &gt;</router-link>
                            <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                        </div>
                    </div>
                    <div class="section clearfix">
                        <div class="left-260">
                            <div class="bg-wrap">
                                <div class="avatar-box">
                                    <a href="/user/center/avatar.html" class="img-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </a>
                                    <h3>

                                        allen

                                    </h3>
                                </div>
                                <div class="center-nav">
                                    <ul>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-order"></i>
                                                <span>订单管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <router-link to="/orderlist"><i class="iconfont icon-arrow-right"></i>交易订单</router-link>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-user"></i>
                                                <span>账户管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                </p>
                                                <p>
                                                    <a href="javascript:void(0)">
                                                        <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="right-auto">
                            <div class="bg-wrap" style="min-height: 765px;">
                                <div class="sub-tit">
                                    <ul>
                                        <li class="selected">
                                            <a href="/user/order-list.html">交易订单</a>
                                        </li>
                                    </ul>
                                </div>
                                <el-pagination
                                    @size-change="sizeChange"
                                    @current-change="currentChange"
                                    :current-page="pageIndex"
                                    :page-sizes="[5, 10, 20, 33]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="totalcount">
                                </el-pagination>
                                <div class="table-wrap">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                        <tbody>
                                            <tr>
                                                <th width="16%" align="left">订单号</th>
                                                <th width="10%">姓名</th>
                                                <th width="12%">订单金额</th>
                                                <th width="11%">下单时间</th>
                                                <th width="10%">状态</th>
                                                <th width="12%">操作</th>
                                            </tr>
                                            <tr v-for="item in orderlist" :key="item.id">
                                                <td>{{item.order_no}}</td>
                                                <td align="left">{{item.accept_name ==""?'匿名用户':item.accept_name}}</td>
                                                <td align="left">
                                                    <strong style="color: red;">￥{{item.real_amount}}</strong>
                                                    <br> {{item.paymentTitle}}
                                                </td>
                                                <td align="left">{{item.express_time | formatDate('YYYY-MM-DD HH:mm:ss')}}</td>
                                                <td align="left">
                                                    {{item.statusName}}
                                                </td>
                                                <td align="left" style="display:flex;flex-direction:column;justify-content: center;">
                                                    <router-link :to="'/orderdetail/'+item.id">查看订单</router-link>
                                                    <router-link v-if="item.status==1" :to="'/payorder/'+item.id">去付款</router-link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="page-foot">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name:'orderlist',
    data(){
        return{
            pageIndex:1,
            pageSize:10,
            totalcount:0,//总条数
            orderlist:[]
        }
    },
    methods:{
        // 获取交易订单详情
        getOrderList(){
            this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(response=>{
                // console.log(response);
                // 列表信息
                this.orderlist = response.data.message;
                // 总条数
                this.totalcount = response.data.totalcount;
            })
        },
        // 点击当前页
        currentChange(index){
            // console.log(index);
            this.pageIndex = index; 
            this.getOrderList();
        },
        // 一页显示多少条
        sizeChange(size){
            // 页码重置为 1
            this.pageIndex = 1;
            this.pageSize = size; 
            this.getOrderList();
        }
    },
    created() {
        // 钩子函数---加载订单信息
        this.getOrderList();
    },

}
</script>
<style>
.sub-tit{
    padding-top:0;
}
.el-pagination{
    margin-left: 50px;
}
td {
  height: 60px;
}
</style>
