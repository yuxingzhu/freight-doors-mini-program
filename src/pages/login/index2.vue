<template>
	<view class="app-container">
		<view class="login-view">
			<view class="logo-image">
				<u-image src="/static/logo.jpeg" shape="circle" width="66" height="66"></u-image>
			</view>
			<view class="login-title">{{ title }}</view>
			<u-button type="success" size="large" shape="circle" open-type="getPhoneNumber" text="微信快捷登录" icon="weixin-fill"
				@getphonenumber="getPhoneNumber">
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/api/login'

	export default {
		data() {
			return {
				title: process.env.VUE_APP_NAME,
				provider: process.env.VUE_APP_PROVIDER,
				key: process.env.VUE_APP_KEY,
				code: '',
				userInfo: {},
			}
		},
		onLoad() {
			this.checkSession()
		},
		methods: {
			checkSession() {
				let _this = this
				uni.checkSession({
					fail() {
						uni.removeStorageSync(_this.key)
					}
				})
				uni.getStorage({
					key: _this.key,
					success: function(res) {
						_this.switchTab()
					},
					fail: function(res) {
						_this.login()
					}
				})
			},
			login() {
				let _this = this
				uni.login({
					provider: _this.provider,
					success: function(res) {
						_this.code = res.code
					}
				})
			},
			switchTab() {
				uni.switchTab({
					url: '/pages/tabs/index'
				})
			},
			getPhoneNumber(res) {
				if (res.detail.iv) {
					let params = {
						code: this.code,
						encryptedData: res.detail.encryptedData,
						iv: res.detail.iv
					}
					this.getUserInfo(params)
				}
			},
			getUserInfo(params) {
				getUserInfo(params).then(res => {
						if (res.success) {
							this.userInfo = Object.assign({}, res.data)
							uni.setStorageSync(this.key, this.userInfo)
							this.switchTab()
						}
					},
					error => {
						this.login()
					})
			}
		}
	}
</script>

<style lang="scss">
	.login-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		padding: 20rpx;
	}

	.logo-image {
		position: absolute;
		top: 20%;
	}

	.login-title {
		position: relative;
		bottom: 100rpx;
		text-align: center;
		color: $u-main-color;
	}
</style>
