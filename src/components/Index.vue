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
                        <!-- <li>
                            <a href="#/site/goodsinfo/88" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200059017695.jpg">
                                </div>
                                <div class="info">
                                    <h3>苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</h3>
                                    <p class="price">
                                        <b>5780</b>元</p>
                                    <p>
                                        <strong>库存 198</strong>
                                        <span>市场价：
                                            <s>6388</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/89" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200119256512.jpg">
                                </div>
                                <div class="info">
                                    <h3>小米（Mi）小米Note 16G双网通版</h3>
                                    <p class="price">
                                        <b>2299</b>元</p>
                                    <p>
                                        <strong>库存 59</strong>
                                        <span>市场价：
                                            <s>2699</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/90" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200154277661.jpg">
                                </div>
                                <div class="info">
                                    <h3>佳能（Canon） EOS 700D 单反套机</h3>
                                    <p class="price">
                                        <b>4799</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>5099</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/91" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200214471783.jpg">
                                </div>
                                <div class="info">
                                    <h3>尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h3>
                                    <p class="price">
                                        <b>3180</b>元</p>
                                    <p>
                                        <strong>库存 10</strong>
                                        <span>市场价：
                                            <s>3150</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="section">
            <div class="main-tit">
                <h2>电脑办公</h2>
                <p>
                    <a href="/goods/43.html">电脑整机</a>
                    <a href="/goods/43.html">外设产品</a>
                    <a href="/goods/43.html">办公打印</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li>
                            <a href="#/site/goodsinfo/92" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200225107390.jpg">
                                </div>
                                <div class="info">
                                    <h3>联想（Lenovo） G510AM 15.6英寸笔记本电脑</h3>
                                    <p class="price">
                                        <b>2999</b>元</p>
                                    <p>
                                        <strong>库存 99</strong>
                                        <span>市场价：
                                            <s>4599</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/93" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/201504200341260763.jpg">
                                </div>
                                <div class="info">
                                    <h3>Apple iMac MF883CH/A 21.5英寸一体机电脑</h3>
                                    <p class="price">
                                        <b>7200</b>元</p>
                                    <p>
                                        <strong>库存 10</strong>
                                        <span>市场价：
                                            <s>7988</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/94" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200239192345.jpg">
                                </div>
                                <div class="info">
                                    <h3>金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</h3>
                                    <p class="price">
                                        <b>79</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>99</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/95" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200242250674.jpg">
                                </div>
                                <div class="info">
                                    <h3>惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</h3>
                                    <p class="price">
                                        <b>1899</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>2099</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/96" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200253026047.jpg">
                                </div>
                                <div class="info">
                                    <h3>惠普(HP) Officejet Pro 8610商用彩色喷墨一体机</h3>
                                    <p class="price">
                                        <b>1999</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>2099</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="main-tit">
                <h2>影音娱乐</h2>
                <p>
                    <a href="/goods/43.html">平板电视</a>
                    <a href="/goods/43.html">音响DVD</a>
                    <a href="/goods/43.html">影音配件</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li>
                            <a href="#/site/goodsinfo/97" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200258403759.jpg">
                                </div>
                                <div class="info">
                                    <h3>三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</h3>
                                    <p class="price">
                                        <b>3299</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>3599</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/98" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg">
                                </div>
                                <div class="info">
                                    <h3>奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</h3>
                                    <p class="price">
                                        <b>4880</b>元</p>
                                    <p>
                                        <strong>库存 10</strong>
                                        <span>市场价：
                                            <s>5880</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/99" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200318534459.jpg">
                                </div>
                                <div class="info">
                                    <h3>飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器</h3>
                                    <p class="price">
                                        <b>399</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>499</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/100" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/imgs/FTuX2MTGiwOZjK-rjeZi4tls.jpg">
                                </div>
                                <div class="info">
                                    <h3>飞利浦（PHILIPS）55PUF6092/T3 55英寸</h3>
                                    <p class="price">
                                        <b>2999</b>元</p>
                                    <p>
                                        <strong>库存 49</strong>
                                        <span>市场价：
                                            <s>2999</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/101" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200333240710.jpg">
                                </div>
                                <div class="info">
                                    <h3>Shinco/新科 S2300 无线麦克风 无线手持话筒 双手麦 KTV 舞台</h3>
                                    <p class="price">
                                        <b>199</b>元</p>
                                    <p>
                                        <strong>库存 20</strong>
                                        <span>市场价：
                                            <s>269</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="main-tit">
                <h2>服装类</h2>
                <p>
                    <a href="/goods/43.html">男装</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li>
                            <a href="#/site/goodsinfo/102" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg">
                                </div>
                                <div class="info">
                                    <h3>Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣</h3>
                                    <p class="price">
                                        <b>800</b>元</p>
                                    <p>
                                        <strong>库存 200</strong>
                                        <span>市场价：
                                            <s>1000</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/103" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg">
                                </div>
                                <div class="info">
                                    <h3>骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫衣</h3>
                                    <p class="price">
                                        <b>198</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>297</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    // 导入 axios 包
    import axios from 'axios';
    // 导入日期格式化包
    import moment from 'moment'
    export default {
        name: "index",
        data: function() {
            return {
                catelist: [], //商品列表
                sliderlist: [], //轮播图
                toplist: [], //排行榜
                categrouplist: [], //商品分类列表
                cateTitleArr: []
            }
        },
        // 生命周期函数
        created() {
            // 配置API接口地址
            let root = 'http://47.106.148.205:8899/';
            // 获取商品首页顶部的 轮播图，置顶，分类导航数据
            axios.get(root + 'site/goods/gettopdata/goods')
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
            axios.get(root + 'site/goods/getgoodsgroup')
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