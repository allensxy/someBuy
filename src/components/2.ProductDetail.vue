<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜插件 -->
                                <!-- <ProductZoomer  />
                                    设置使用 images 而这个变量 默认内部是没有数据的
                                    有图片的时候 才生成 才创建
                                 -->
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <el-input-number v-model="buyCount" @change="buyCountChange" :min="0" :max="goodsinfo.stock_quantity" size="small" label="描述文字"></el-input-number>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- tab切换区域 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 内容显示区域 -->
                            <div class="tab-content entry" v-show="!showDiscuss" v-html="goodsinfo.content">
                            </div>
                            <!-- 评论显示区域 -->
                            <div class="tab-content" v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentInfo" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="discuss.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in discuss" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | formatDate}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page 
                                            :total="totalCount"
                                            show-elevator
                                            show-total
                                            show-sizer
                                            :page-size-opts="[5,8,10,15,20,30,40]"
                                            :page-size="8"
                                            placement="top"
                                            @on-change="pageChange"
                                            @on-page-size-change="pageSizeChange"
                                              />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">
                                                <img :src="item.img_url">
                                            </a> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                           
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | formatDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ivew 回到顶部 -->
        <BackTop></BackTop>
        <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" style="display:none" :src="imglist[0].original_path" alt="">   
    </div>
</template>
<script>
// 导入jq
import $ from "jquery";
export default {
  data() {
    return {
      productId: undefined, //商品id
      goodsinfo: {}, //商品信息
      hotgoodslist: [], //热卖列表
      imglist: [], //图片列表
      buyCount: "", //购买数量
      showDiscuss: false,// 是否显示评论 默认为false  默认显示 商品内容,
      zoomerOptions: {
        zoomFactor: 3,
        pane: "pane",
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true,
        scroll_items: 7,
        choosed_thumb_border_color: "#dd2c00"
      },
      // 轮播图用的图片 默认的数据格式 不支持
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      },
      discuss: [], //评论数据
      pageNum:1,//当前页码
      pageSize:8,//页容量
      totalCount:0,  //总条数
      commentInfo:''// 评论内容 双向数据绑定
    };
  },
  methods: {
    buyCountChange() {
      console.log("改变啦！");
    },
    getProductDetail(){ //根据id获取商品详情
        this.productId = this.$route.params.id;
        // 根据商品id获取商品详情数据
        this.$axios
        .get(`site/goods/getgoodsinfo/${this.productId}`)
        .then(response => {
            this.goodsinfo = response.data.message.goodsinfo;
            this.hotgoodslist = response.data.message.hotgoodslist;
            this.imglist = response.data.message.imglist;

            // 处理 放大镜数据
            let temArr = [];
            // 循环添加
            this.imglist.forEach(v => {
            temArr.push({
                id: v.id,
                url: v.original_path
            });
            });
            // 存在 data 的数组里面
            this.images.normal_size = temArr;
        });
    },
    getComments(){  //获取评论数据
         // 评论接口
        this.$axios.get(`site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`)
        .then(response => {
            // console.log(response);
            this.discuss = response.data.message;
            this.totalCount = response.data.totalcount;
        });
    },
    pageChange(val){    //页码改变的回调，返回改变后的页码
        this.pageNum = val;
        // 页码改变时 重新获取数据即可
        this.getComments();
    },
    pageSizeChange(val){ //切换每页条数时的回调，返回切换后的每页条数	
        this.pageSize = val;
        // 当前页面为1时：它不会主动触发调用，需要重新调用
        if(this.pageNum == 1){
            this.getComments();//评论数据
        }
    },
    submitComment(){
        if(this.commentInfo == ''){
            this.$Message.error('请输入内容哦！');
            return;
        }
        this.$axios.post(`site/validate/comment/post/goods/${this.productId}`,{
            "commenttxt":this.commentInfo
        }).then(response=>{
            // console.log(response);
            if(response.data.status == 0){
                // 提示用户添加成功
                this.$Message.success(response.data.message);
                // 局部刷新
                this.getComments();
                // 清空评论
                this.commentInfo = '';
            }
        })
    },
    // 加入购物车的逻辑
    // 使用jq来实现
    cartAdd(){
        if(this.buyCount ==0){
            this.$Message.error("数量不能为零，点击加一条数量呗！");
            return;
        }
        // 获取加入购物车位置
        let cartOffset = $('.add').offset();
        // console.log(cartOffset);
        // 获取购物车位置
        let targetOffset = $('.icon-cart').offset();
        // 使用动画的方式 移动图片
        // 移动到按钮位置 显示出来 动画移动到目标位置
        $('.moveImg').stop().show().addClass('move').css(cartOffset).animate(targetOffset,1000,function(){
            $(this).hide().removeClass('move');
        });

        // 动画完结以后
        // 	隐藏图片
        // 	增加购物车中的显示内容

        // 测试添加数据 通过 this.$store.commit() 方法来调用，里面有两个参数
        // 参数一：方法的名字
        // 参数二：自定义修改的数据
        // this.$store.commit('increment', 10); 

        // 直接修改购物车商品数据---提交载荷（Payload）
        this.$store.commit('addCart', {
            productId: this.productId,
            goodsNum:this.buyCount
        });
        
    }
  },
  // 生命周期函数
  // 当前这个Vue组件还没有实例化出来 那些data methods 都是没有的
  created() {
    this.getProductDetail();//商品详情数据
    this.getComments();//评论数据
  },
  watch:{
        //   监听路由
        $route(val,oldVal){
            // 人为让他 强制生成 v-if 数组长度 
            // 数组长度为0 直接销毁 
            this.images.normal_size = [];
            // 重新调用获取数据函数
            this.getProductDetail();
        }
  }
};
</script>
<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
#zoomer-pane-container {
  top: 10px !important;
  left: 400px !important;
}
/* 右侧显示商品 */
.goods-spec {
  margin-left: 400px;
}

// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
//   display: block;
  // top:0;
  // left:0;
}
.moveImg.move{
    transition: transform 1s;
    transform: rotate(720deg);
}
</style>
