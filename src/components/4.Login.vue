<template>
<div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/login.html">会员登录</a>
        </div>
    </div>
    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <div class="nav-tit">
                    <a class="selected" href="javascript:;">账户登录</a>
                    <i>|</i>
                    <a href="/register.html">免费注册</a>
                </div>

                <div id="loginform" name="loginform" class="login-box">
                    <el-input placeholder="用户名/手机/邮箱" type="text" name="name" v-model="name" maxlength="50" clearable></el-input>
                    <br>
                    <br>
                    <el-input placeholder="输入登录密码" type="password" name="password" v-model="password" minlength="6" maxlength="16" clearable></el-input>
                    <br>
                    <br>
                    <div class="btn-box">
                        <input id="btnSubmit" name="btnSubmit" type="submit" @click="nowLogin" value="立即登录">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            name:"admin",
            password:"123"
        }
    },
    methods:{
        // 登录
        nowLogin(){
            // 进度条
            this.$Loading.config({  //配置信息
                color: '#5cb85c',
                failedColor: '#f0ad4e',
                height: 5
            });
            // 显示进度条
            this.$Loading.start();
            this.$axios.post('site/account/login',{
                user_name:this.name,
                password:this.password
            }).then(response=>{
                // console.log(response);
                if(response.data.status == 1){
                    this.$Message.error('用户名或密码错误')
                }else if(response.data.status == 0){
                    // console.log("成功！");
                    // 提交载荷 --- 拿到 vuex 里面的方法，传参对 islogin 进行修改
                    this.$store.commit('changeLoginStatus',true);
                    // 登录成功后回到上一个页面 --- 用编程式的导航 - 找到上一个页面的地址
                    // console.log(this.$store.state.fromPath);
                    // this.$router.push(this.$store.state.fromPath);

                    // 方式二：编程式导航中的 go 方法 回到上一个页面
                    this.$router.go(-1);    // 后退一步记录，等同于 history.back()

                }
                // 提示完成
                this.$Loading.finish();
            }).catch(error=>{
                this.$Loading.error();
            })
        },

    }
}
</script>
<style>

</style>

