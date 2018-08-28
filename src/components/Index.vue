<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt> 
                                            <dd>
                                                <a href="/goods/43.html" v-for="item in catelist" :key="item.id">{{item.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <el-carousel indicator-position="outside">
                                        <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                            
                                            <!-- <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"></li> -->
                                                <a href="/goods.html">
                                                    <img style="width: 100%;height:100%;" :src="item.img_url" draggable="false"> 
                                                </a>
                                            <!-- </li> -->
                                            
                                        </el-carousel-item>
                                    </el-carousel>
                                </ul>

                                <!-- <ul class="slides">
                                    <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                                <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol> -->
                            </div>

                        </div>
                    </div>
                    <!--top排行榜-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- 过滤器 -->
                                    <span>{{item.add_time | formatDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in categrouplist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="catelist in item.level2catelist" :key="catelist.subcateid">{{catelist.subcatetitle}}</a>
                    <!-- <a href="/goods/43.html">摄影摄像</a> -->
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="datas in item.datas" :key="datas.artID">
                            <router-link :to="'/detail/'+datas.artID">
                                <div class="img-box">
                                        <!-- <img :src="datas.img_url"> -->
                                        <!-- 懒加载的图片指令 -->
                                        <img v-lazy="datas.img_url">
                                    </div>
                                    <div class="info">
                                        <h3>{{datas.artTitle}}</h3>
                                        <p class="price">
                                            <b>{{datas.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存 {{datas.stock_quantity}}</strong>
                                            <span>市场价：
                                                <s>{{datas.market_price}}</s>
                                            </span>
                                        </p>
                                    </div>
                            </router-link>
                            <!-- <a href="#/site/goodsinfo/87" class=""></a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "index",
        data: function() {
            return {
                catelist: [], //商品列表
                sliderlist: [], //轮播图
                toplist: [], //排行榜
                categrouplist: [], //商品分类列表
                cateTitleArr: [],
                rootAll: ''
            }
        },
        // 生命周期函数
        created() {
            // 获取商品首页顶部的 轮播图，置顶，分类导航数据
            this.$axios.get('site/goods/gettopdata/goods')
                .then((response) => {
                    //console.log(response);
                    this.catelist = response.data.message.catelist;
                    this.sliderlist = response.data.message.sliderlist;
                    this.toplist = response.data.message.toplist;
                    // console.log(this.catelist);
                })
                // .catch(error => {
                //     console.log(error);
                // });
                // 商品首页按照分类分组获取数据
            this.$axios.get('site/goods/getgoodsgroup')
                .then((response) => {
                    // console.log(response);
                    this.categrouplist = response.data.message;
                })
                // .catch(error => {
                //     console.log(error);
                // })
        },
        // filters: {
        //     formatDate(value) { //格式化时间
        //         return moment(value).format("YYYY年MM月DD日");
        //     }
        // }
    }
</script>
<style>
    .banner-img {
        margin-left: 0px;
    }
    
    .el-carousel__container {
        height: 341px;
    }
</style>