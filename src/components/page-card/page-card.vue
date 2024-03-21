<template>
  <view>
    <view class="card" style="">
      <view class="title">
        {{ title }}
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name:"page-card",
    props: {
      title: {
        type: String,
        default: '标题'
      }
    }
  }
</script>

<style>
 .card{
    background-color: #FFFFFF;
    margin:40rpx 20rpx;
    border-radius: 10rpx;
    padding: 20rpx 30rpx;
    box-shadow: 5rpx 5rpx 10rpx #888888;
  }
</style>
