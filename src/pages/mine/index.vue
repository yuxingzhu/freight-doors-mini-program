<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
    <view class="header-section">
      <view class="mine-info-wrap" >
        <view class="mine-info">
          <!-- <view v-if="!avatar" class="cu-avatar xl round bg-white">
            <view class="iconfont icon-people text-gray icon"></view>
          </view> -->
          <!-- <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix">
          </image> -->
          <!-- <image v-if="avatar" @click="handleToAvatar" class="cu-avatar xl round" mode="widthFix">
          </image> -->
          <!-- <view v-if="!name" @click="handleToLogin" class="login-tip">
            点击登录
          </view> -->
          <!-- <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">
              用户名：{{ name }}
            </view>
          </view> -->
          <view @click="handleToInfo" class="user-info">
            <view class="u_title">
              欢迎您，{{nickName ? nickName : '--'}}
            </view>
          </view>
        </view>
        <view @click="handleToInfo" class="mine-info-content">
          <text>个人信息</text>
          <view class="iconfont icon-right"></view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <!-- <view class="mine-actions grid col-4 text-center">
        <view class="action-item" @click="handleJiaoLiuQun">
          <view class="iconfont icon-friendfill text-pink icon"></view>
          <text class="text">交流群</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-service text-blue icon"></view>
          <text class="text">在线客服</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-community text-mauve icon"></view>
          <text class="text">反馈社区</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-dianzan text-green icon"></view>
          <text class="text">点赞我们</text>
        </view>
      </view> -->

      <view class="menu-list" :style="'margin-top: 120rpx;'">
        <!-- <view class="list-cell list-cell-arrow" @click="handleToEditInfo">
          <view class="menu-item-box">
            <view class="iconfont icon-user menu-icon"></view>
            <view>编辑资料</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleHelp">
          <view class="menu-item-box">
            <view class="iconfont icon-help menu-icon"></view>
            <view>常见问题</view>
          </view>
        </view> -->
        <!-- <view class="list-cell list-cell-arrow" @click="handleAbout">
          <view class="menu-item-box">
            <view class="iconfont icon-aixin menu-icon"></view>
            <view>关于我们</view>
          </view>
        </view> -->
        <!-- <view class="list-cell list-cell-arrow" @click="handleToSetting">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>应用设置</view>
          </view>
        </view> -->
        <view class="list-cell list-cell-arrow" @click="handleBuilding">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>检查更新</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleBuilding">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>清理缓存</view>
          </view>
        </view>
        <view class="cu-list menu">
          <view class="cu-item item-box">
            <view class="content text-center" @click="handleLogout">
              <text class="text-black">退出登录</text>
            </view>
          </view>
        </view>
        <!-- <view class="list-cell list-cell-arrow" @click="handleToSetting"> -->
        <!-- <view class="list-cell list-cell-arrow" @click="handleLogout">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>退出登录</view>
          </view>
        </view> -->
      </view>

    </view>
  </view>
</template>

<script>
  // import storage from '@/utils/storage'
  // import constant from '@/utils/constant'

  export default {
    data() {
      return {
        // nickName: storage.get(constant.nickName),
        // version: getApp().globalData.config.appInfo.version
      }
    },
    computed: {
      nickName() {
        return this.$store.state.user.nickName
      },
      avatar() {
        return this.$store.state.user.avatar
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      }
    },
    methods: {
      handleToInfo() {
        this.$tab.navigateTo('/pages/mine/info/index')
      },
      handleToEditInfo() {
        this.$tab.navigateTo('/pages/mine/info/edit')
      },
      handleToSetting() {
        this.$tab.navigateTo('/pages/mine/setting/index')
      },
      handleLogout(){
        this.$modal.confirm('确定注销并退出系统吗？').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            console.log('hahdr34')
            this.$tab.navigateTo('/pages/login/index')
            console.log('334343jhfhfd');
          })
        })
      },
      handleToLogin() {
        this.$tab.reLaunch('/pages/login')
      },
      handleToAvatar() {
        this.$tab.navigateTo('/pages/mine/avatar/index')
      },
      handleLogout() {
        this.$modal.confirm('确定注销并退出系统吗？').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$tab.reLaunch('/pages/login/index')
          })
        })
      },
      handleHelp() {
        this.$tab.navigateTo('/pages/mine/help/index')
      },
      handleAbout() {
        this.$tab.navigateTo('/pages/mine/about/index')
      },
      handleJiaoLiuQun() {
        this.$modal.showToast('QQ群：133713780')
      },
      handleBuilding() {
        this.$modal.showToast('敬请期待~')
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f6f7;
  }

  .mine-container {
    width: 100%;
    height: 100%;


    .header-section {
      padding: 15px 15px 45px 15px;
      background-color: #3c96f3;
      color: white;

      .mine-info-wrap {
        display: flex;
        justify-content: space-between;
        .mine-info {
            display: flex;
            align-items: center;
        }
        .mine-info-content {
            display: flex;
            align-items: center;
        }
      }

      .login-tip {
        font-size: 18px;
        margin-left: 10px;
      }

      .cu-avatar {
        border: 2px solid #eaeaea;

        .icon {
          font-size: 40px;
        }
      }

      .user-info {
        margin-left: 15px;

        .u_title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }

    .content-section {
      position: relative;
      top: -50px;

      .mine-actions {
        margin: 15px 15px;
        padding: 20px 0px;
        border-radius: 8px;
        background-color: white;

        .action-item {
          .icon {
            font-size: 28px;
          }

          .text {
            display: block;
            font-size: 13px;
            margin: 8px 0px;
          }
        }
      }
    }
  }

  .item-box {
    background-color: #FFFFFF;
    margin-top: 30rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10rpx;
    border-radius: 8rpx;
    color: #303133;
    font-size: 32rpx;
  }
</style>
