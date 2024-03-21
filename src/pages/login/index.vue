<template>
  <view class="normal-login-container">
    <view class="logo-content align-center justify-center flex">
      <!-- <image style="width: 100rpx;height: 100rpx;" :src="'/static/logo.png'" mode="widthFix">
      </image> -->
			<!-- <u-image src="/static/logo.jpeg" width="66" height="66"></u-image> -->
      <text class="title">货运门移动端登录</text>
    </view>
    <view class="img-wrap">
      <image style="width: 476rpx;height: 312rpx;" :src="'/static/bg.png'" mode="widthFix">
      </image>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon"></view>
        <input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon"></view>
        <input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <view class="input-item flex align-center" style="width: 60%;margin: 0rpx;" v-if="captchaEnabled">
        <view class="iconfont icon-code icon"></view>
        <input v-model="loginForm.code" type="number" class="input" placeholder="请输入验证码" maxlength="4" />
        <view class="login-code"> 
          <image :src="codeUrl" @click="getCode" class="login-code-img"></image>
        </view  >
      </view>
      <view class="action-btn">
        <button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
      </view>
    </view>

    <!-- <view class="xieyi text-center">
      <text class="text-grey1">登录即代表同意</text>
      <text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
      <text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
    </view> -->
  </view>
</template>

<script>
  import { getCodeImg } from '@/api/login'
  import { encrypt } from '@/utils/rsaEncrypt'
  export default {
    data() {
      return {
        codeUrl: "",
        captchaEnabled: true,
        globalConfig: getApp().globalData.config,
        loginForm: {
          username: "",
          password: "",
          code: "",
          uuid: ''
        }
      }
    },
    onLoad() {
      this.getCode()
    },
    methods: {
      // 隐私协议
      // handlePrivacy() {
      //   let site = this.globalConfig.appInfo.agreements[0]
      //   this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      // },
      // // 用户协议
      // handleUserAgrement() {
      //   let site = this.globalConfig.appInfo.agreements[1]
      //   this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      // },
      // 获取图形验证码
      getCode() {
        getCodeImg().then(res => {
          console.log(res, 'res3434');
          this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
          if (this.captchaEnabled) {
            // this.codeUrl = 'data:image/gif;base64,' + res.img
            this.codeUrl = res.img
            this.loginForm.uuid = res.uuid
          }
        })
      },
      test() {
        console.log('3434341121');
      },
      // 登录方法
      async handleLogin() {
        console.log('3434');
        if (this.loginForm.username === "") {
          this.$modal.msgError("请输入您的账号")
        } else if (this.loginForm.password === "") {
          this.$modal.msgError("请输入您的密码")
        } else if (this.loginForm.code === "" && this.captchaEnabled) {
          this.$modal.msgError("请输入验证码")
        } else {
          this.$modal.loading("登录中，请耐心等待...")
          this.pwdLogin()
        }
      },
      // 密码登录
      async pwdLogin() {
        this.loginForm.password = encrypt(this.loginForm.password)
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.$modal.closeLoading()
          this.loginSuccess()
        }).catch(() => {
          if (this.captchaEnabled) {
            this.getCode()
          }
        })
      },
      // 登录成功后，处理函数
      loginSuccess(result) {
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
          this.$tab.reLaunch('/pages/preRegisterApply/index')
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .normal-login-container {
    width: 100%;
		background-color: #ffffff;
    .logo-content {
      width: 100%;
      font-size: 42rpx;
      text-align: center;
      padding-top: 15%;
      margin-bottom: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

      image {
        border-radius: 8rpx;
      }

      .title {
        margin-left: 20rpx;
      }
    }

    .img-wrap {
      display: flex;
      justify-content: center;
    }

    .login-form-content {
      text-align: center;
      margin: 40rpx auto;
      // margin-top: 15%;
      width: 80%;

      .input-item {
        margin: 40rpx auto;
        background-color: #f5f6f7;
        height: 90rpx;
        line-height: 90rpx;
        border-radius: 40rpx;
				display: flex;
				align-items: center;

        .icon {
          font-size: 76rrpx;
          margin-left: 20rpx;
          color: #999;
        }

        .input {
          width: 100%;
          font-size: 28rpx;
          line-height: 40rpx;
          text-align: left;
          padding-left: 30rpx;
        }

      }

      .login-btn {
        margin-top: 80rpx;
        height: 90rpx;
				background-color: #4B8AFF;
    		color: #ffffff;
      }

      .xieyi {
        color: #333;
        margin-top: 40rpx;
      }
      
      .login-code {
        height: 76rpx;
        float: right;
      
        .login-code-img {
          height: 76rpx;
          position: absolute;
          margin-left: 20rpx;
          width: 208rpx;
        }
      }
    }
  }

</style>
