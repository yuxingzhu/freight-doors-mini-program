<template>
  <view class="container">
    <uni-list>
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" title="工号" :rightText="user.username ? user.username : '--'" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone-filled'}" title="手机号" :rightText="user.phone ? user.phone : '--'" />
      <!-- <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email-filled'}" title="邮箱" :rightText="user.email" /> -->
      <!-- <uni-list-item showExtraIcon="true" :extraIcon="{type: 'auth-filled'}" title="岗位" :rightText="user.dept.name" /> -->
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'staff-filled'}" title="角色" :rightText="user.nickName ? user.nickName : '--'" />
      <!-- <uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar-filled'}" title="创建日期" :rightText="user.updateTime" /> -->
    </uni-list>
  </view>
</template>

<script>
  // import { getUserProfile } from "@/api/system/user"
  import { getInfo } from "@/api/login"

  export default {
    data() {
      return {
        user: {},
      }
    },
    onLoad() {
      this.getUser()
    },
    methods: {
      getUser() {
        getInfo().then(response => {
          this.user = response.user
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }
</style>
