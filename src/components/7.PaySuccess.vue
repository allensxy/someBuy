<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <router-link to="/index">首页 &gt;</router-link>
                                <!-- <a href="/index.html">首页</a> &gt; -->
                                <a href="javascript:;">支付中心</a>
                            </div>
                        </div>
                        <div class="section">
                            <div class="wrapper">
                                <div class="bg-wrap">
                                    <div class="nav-tit pay">
                                        <a href="javascript:;" class="selected">支付中心</a>
                                    </div>
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！</strong>
                                            <span><em style="color:yellowgreen;font-size:30px">{{num}}</em>秒后跳转到会员页面</span>
                                            <p>您可以点击这里进入
                                                <router-link to="/vipCenter" style="font-size:30px">会员中心</router-link>查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
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
    name: "paySuccess",
    data(){
        return{
            num:5,
            timerId:0
        }
    },
    mounted() {
        // console.log(this.$route.params.id);
        // 倒计时五秒跳转到 订单详情页
        this.timerId = setInterval(()=>{
            this.num--;
            if(this.num == 1){
                // 清除定时器
                clearInterval(this.timerId);
                // 直接跳转到 订单详情页 --- 带上 id 
                this.$router.push('/orderdetail/'+this.$route.params.id);
            }
        },1000);
    },
    // 钩子函数
    destroyed() {
        // 手动清除定时器
        clearInterval(this.timerId);
    }
};
</script>
<style>
</style>