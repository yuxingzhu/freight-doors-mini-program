<template>
	<view class="app-container">
		<view class="nav-title">
			<u-avatar mpAvatar size="60"></u-avatar>
			<view class="nav-info">
				<open-data type="userNickName" class="nav-name"></open-data>
				<view class="nav-phone">
					{{userInfo.phoneNumber}}
				</view>
			</view>
		</view>
		<u-cell-group>
			<u-cell icon="setting" title="设置" @click="setting"></u-cell>
		</u-cell-group>
		<view class="nav-exit">
			<u-button size="large" shape="circle" text="退出登录" @click="exit">
			</u-button>
		</view>
		<u-modal v-model="show" content="请授权开通服务通知" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: process.env.VUE_APP_KEY,
				show: false,
				tmplId: process.env.VUE_APP_TMPL_ID,
				userInfo: {}
			}
		},
		onLoad() {
			this.getUserInfo()
			//this.getSetting()
		},
		methods: {
			getUserInfo() {
				let _this = this
				uni.getStorage({
					key: _this.key,
					success: function(res) {
						_this.userInfo = Object.assign({}, res.data)
					}
				})
			},
			getSetting() {
				let _this = this
				uni.getSetting({
					withSubscriptions: true,
					success(res) {
						if (res.subscriptionsSetting.mainSwitch) {
							let itemSettings = res.subscriptionsSetting.itemSettings
							if (itemSettings && itemSettings[_this.tmplId]) {
								let itemSetting = itemSettings[_this.tmplId]
								if (itemSetting == 'reject') {
									_this.show = true
								}
							} else {
								_this.show = true
							}
						} else {
							_this.show = true
						}
					}
				})
			},
			confirm() {
				this.requestSubscribeMessage()
			},
			requestSubscribeMessage() {
				uni.requestSubscribeMessage({
					tmplIds: [this.tmplId]
				})
			},
			setting() {
				uni.openSetting()
			},
			exit() {
				uni.removeStorageSync(this.key)
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav-title {
		padding: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.nav-info {
		margin-left: 15px;
	}

	.nav-name {
		display: flex;
		color: $u-main-color;
		font-size: 14px;
	}

	.nav-link {
		color: #2979ff;
		font-size: 28rpx;
	}

	.nav-phone {
		color: $u-content-color;
		font-size: 14px;
	}

	.nav-exit {
		padding: 15px;
	}
</style>
