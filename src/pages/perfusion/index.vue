<template>
	<view class="total">
		<!-- <page-tabs :current="2"></page-tabs> -->
		<page-card title="灌注线选择" class="choose_line">
			<view class="choose_card">
					<page-tags :list=listLine  @clickTags="chooseOne()"></page-tags>
				</view>
		</page-card>
		<page-card class="choose_gun" title="灌注枪选择">
			<view  class="choose_card">
				<page-tags :list=listGun  @clickTags="chooseGuns()"></page-tags>
			</view>
		</page-card>
		<!-- 灌注线 -->
	<!-- 	<page-card title="灌注线选择" class="choose_line">
			<view class="choose_card">
					<view class="tagLine" v-for="(item,index) in listLine">
						<u-tag :text="item.name" shape="circle" class="utag" :bgColor="item.status?'#009AFE':'#E5E5E5'"
							:borderColor="item.status?'#009AFE':'#E5E5E5'" :color="item.status?'#ffffff':'#141414'"
							@click='chooseTags(item)'></u-tag>
					</view>
				</view>
		</page-card> -->
		<!-- 灌注枪 -->
		<!-- <page-card class="choose_gun" title="灌注枪选择">
			<view  class="choose_card">
				<view class="tagGun" v-for="(item,index) in listGun">
					<u-tag :text="item.name" shape="circle" class="utag" :bgColor="item.status?'#009AFE':'#E5E5E5'"
						:borderColor="item.status?'#009AFE':'#E5E5E5'" :color="item.status?'#ffffff':'#141414'"
						@click='chooseGuns(item)'></u-tag>
				</view>
			</view>
		</page-card> -->
		<!-- 工艺参数 -->
		<page-card title="工艺参数" class="choose_params">
			<view  class="choose_card">
				<view class="params_data">
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="6">
							<view class="demo-layout bg-purple-light">系统压力：{{listParams.systemPressure}}</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout bg-purple">冷媒温度：{{listParams.refrigerantTemp}}</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="6">
							<view class="demo-layout bg-purple-light">当前真空度：{{listParams.vacuumDegree}}</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout bg-purple">检测时间：{{listParams.detectionTime}}</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="6">
							<view class="demo-layout bg-purple-light">充注速度：{{listParams.fillingSpeed}}</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout bg-purple">充注量：{{listParams.fillingCapacity}}</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</page-card>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				listLine: [{
					name: '1# 线',
					status: true
				}, {
					name: '2# 线',
					status: false
				}, {
					name: '3# 线',
					status: false
				}, {
					name: '4# 线',
					status: false
				}],
				listGun: [{
					name: '1# 枪',
					status: true
				}, {
					name: '2# 枪',
					status: false
				}, {
					name: '3# 枪',
					status: false
				}, {
					name: '4# 枪',
					status: false
				}, {
					name: '5# 枪',
					status: false
				}, {
					name: '6# 枪',
					status: false
				}],
				listParams:{
					systemPressure:'3.45Mpa',
					refrigerantTemp:'28℃',
					vacuumDegree:'2.1Pa',
					detectionTime:'0分15秒',
					fillingSpeed:'28.9g/s',
					fillingCapacity:'451.7g'
				}
			}
		},
		methods: {
			chooseOne(item){
				this.listLine.forEach(e => {
					e.name == item.name ? e.status = true : e.status = false
				})
			},
			chooseTags(item) {
				// item.status=true
				this.listLine.forEach(e => {
					e.name == item.name ? e.status = true : e.status = false
				})
			},
			chooseGuns(item) {
				this.listGun.forEach(e => {
					e.name == item.name ? e.status = true : e.status = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.total {
		// background-color: #EFEFEF;
		overflow: hidden;
		padding: 0 10rpx;
		.choose_line {
			// margin-top: 1vh;
			font-weight: bold;
			.choose_card {
				display: flex;
				flex-wrap: wrap;
				flex: 1;
				padding: 30rpx 6rpx 0 6rpx !important;
				.tagLine {
					display: inline-block;
					text-align: center;
					font-size: 6rpx !important;
					padding: 0 6rpx 10rpx 6rpx !important;
					margin-top: 0 8rpx !important;
				}
			}
		}
		.choose_gun {
			font-weight: bold;
			.choose_card {
				display: flex;
				flex-wrap: wrap;
				margin-top:16rpx !important;
				padding: 10rpx 0 15rpx 3rpx !important;
				.tagGun {
					display: inline-block;
					text-align: center;
					padding: 0 6rpx;
					margin-top: 16rpx !important;
				}
			}
		}
		.choose_params {
			font-weight: bold;
			.choose_card {
				display: flex;
				flex-wrap: wrap;
				margin-left: 20rpx !important;
				.params_data {
					margin-top: 16rpx !important;
					width: 100%;
					color: #585858;
					margin-left: 28rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
