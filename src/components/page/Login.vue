<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">自动化测试平台</div>
            <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="loginForm.password"
                            @keyup.enter.native="login"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="danger" @click="register" style="margin-left: 0px;">注册</el-button>
                </div>
                <el-alert
                        v-if="showMessage"
                        @close="closeMessage"
                        :title="errorMessage"
                        type="error"
                        center
                        show-icon>
                </el-alert>

                <p class="login-tips">Tips : 请填写用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {loginRequest, registerRequest} from "../../api/users";
    export default {

        props:{},
        data: function() {
            return {
                showMessage: false,
                errorMessage: "错误",
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            closeMessage(){
                this.showMessage = false;

            },
            login(){
                console.log(this.$refs.loginFormRef);
                this.$refs.loginFormRef.validate(valid => {
                    if (valid) {

                        loginRequest(this.loginForm).then(data => {
                            console.log(data);
                            if (true === data.data.success){
                                this.$message.success('登录成功');
                                localStorage.setItem('ms_username', this.loginForm.username);
                                localStorage.setItem('last_login', data.data.data.last_login);
                                this.$router.push('/');
                            }else {
                                this.showMessage = true;
                                this.errorMessage = data.data.error.message;
                            }
                        }).catch(data =>{
                            console.log(data)
                        })

                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            register(){
                this.$refs.loginFormRef.validate(valid => {
                    if (valid) {

                        registerRequest(this.loginForm).then(data => {
                            console.log(data);
                            if (true === data.data.success){
                                this.$message.success('注册成功');
                            }else {
                                this.showMessage = true;
                                this.errorMessage = data.data.error.message;
                            }
                        }).catch(data =>{
                            console.log(data)
                        })

                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });


            },

        },
        created() {
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>