<template>
    <div id="app">
        <!-- 头部 -->
        <div class="header">
                <!-- 1.0 导航栏头部 -->
                <div class="head-top">
                    <div class="section">
                        <div class="left-box">
                            <span>buy买买买</span>
                            <a target="_blank" href="#"></a>
                            <a target="_blank" href="#"></a>
                        </div>
                        <div id="menu" class="right-box">
                            <!-- <span style="display: none;"> -->
                            <span v-show="$store.state.islogin==false">
                                <!-- <a href="" class="">登录</a> -->
                                <router-link to="/login">登录</router-link>
                                <strong>|</strong>
                                <a href="" class="">注册</a>
                                <strong>|</strong>
                            </span>
                            <span v-show="$store.state.islogin==true">
                                <router-link to="/vipcenter">会员中心</router-link>
                                <strong>|</strong>
                                <a @click="outlogin">退出</a>
                                <strong>|</strong>
                            </span>
                            <router-link to="/cart">
                            <!-- <a href="" class=""> -->
                                <i class="iconfont icon-cart"></i>购物车(
                                <span id="shoppingCartCount">
                                    <!-- 通过 $store 获取 Vuex 的数据 -->
                                    <span>{{$store.getters.goodsCount}}</span>
                                </span>
                            <!-- </a> -->
                            )</router-link>
                        </div>
                    </div>
                </div>
        
                <!-- 2.0 导航条 -->
                <div class="head-nav">
                    <div class="section">
                        <div id="menu2" class="nav-box menuhd">
                            <ul>
                                <li class="index">
                                    <!-- <a href="#" class="">
                                        <span class="out" style="top: 0px;">123</span>
                                    </a> -->
                                    <router-link to="/index" tag="a">
                                        <span class="out" style="top: 0px;">首页</span>
                                    </router-link>
                                </li>
                                <li class="news">
                                    <a href="#" class="">
                                        <span class="out" style="top: 0px;">每日精选</span>
                                    </a>
                                </li>
                                <li class="photo">
                                    <a href="#" class="">
                                        <span class="out" style="top: 0px;">秒杀专区</span>
                                    </a>
                                </li>
                                <li class="video">
                                    <a href="#" class="">
                                        <span class="out" style="top: 0px;">超市</span>
                                    </a>
                                </li>
                                <li class="down">
                                    <a href="#" class="">
                                        <span class="out" style="top: 0px;">会员权益</span>
                                    </a>
                                </li>
                                <li class="goods">
                                    <a href="" class="">
                                        <span class="out" style="top: 0px;">购物商城</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="search-box">
                            <div class="input-box">
                                <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                            </div>
                            <a href="javascript:;">
                                <i class="iconfont icon-search"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- 路由出口 -->
                <!-- 路由匹配到的组件将渲染在这里 -->
                <router-view></router-view>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 买买买 </p>
                        <p>公司地址：ccccc 联系电话：12345678</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 退出的提示层 -->
        <Modal v-model="isShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>确定要退出吗？</span>
            </p>
            <div style="text-align:center">
                <p>退出了，只能重新登录哦！！！</p>
            </div>
            <div slot="footer" style="display:flex;justify-content: center">
                <Button type="success" size="large" @click="sureExit">确定</Button>
                <Button type="error" size="large" @click="isShow=false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // 导入jq
    import $ from 'jquery';

    export default {
        // 修改后 devtool 插件的控制台中，会有不同的名字，利于我们查找元素
        name: 'container',
        data(){
            return{
                isShow:false
            }
        },
        methods:{
            // 退出登录操作
            outlogin(){
                // 根据模态框的提示 决定是否调用接口
                this.isShow = true;
            },
            sureExit(){
                // 关闭模态框
                this.isShow = false;
                this.$axios.get(`site/account/logout`).then(response=>{
                    console.log(response);
                    if(response.data.status == 0){
                        // 拿到 vuex 里面的 islogin
                        this.$store.commit('changeLoginStatus',false);
                        // 登出成功后 默认 回到首页
                        this.$router.push('/index');
                    }else if(response.data.status == 1){
                        this.$Message.error('服务器异常！！！');
                    }
                })
            }
        }
    }
    $(document).ready(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function() {
            $(".out", this).stop().animate({
                'top': '48px'
            }, 300); // move down - hide
            $(".over", this).stop().animate({
                'top': '0px'
            }, 300); // move down - show

        }, function() {
            $(".out", this).stop().animate({
                'top': '0px'
            }, 300); // move up - show
            $(".over", this).stop().animate({
                'top': '-48px'
            }, 300); // move up - hide
        });

    });
</script>

<style>
    /* 导入样式 */
    
    @import url('./assets/statics/site/css/style.css');
    /* 导入 jq 插件样式 */
    
    @import url('./assets/lib/css/style.css');
</style>