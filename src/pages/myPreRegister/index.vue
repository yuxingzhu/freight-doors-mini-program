<template>
	<view class="app-container">
		<view class="my-pre-register-wrapper">
			<view class="search-wrapper">
				<u-row customStyle="padding: 0 12px;">
					<u-search placeholder="请输入车牌号码" v-model="params.carNumber" :clearabled="true" height="34"
						shape="square" :showAction="false" @search="search" @change="search"></u-search>
				</u-row>
				<view class="conditional-search">
					<u-row justify="space-between" customStyle="padding-top: 10px">
						<view :class="[`${params.status !== '' ? 'search-btn-active' : ''}`, 'search-btn']"
							@click="handleStatusBtnClick">
							{{statusValue}}
							<u-icon name="arrow-down-fill" :color="`${params.status !== '' ? '#4B8AFF' : '#B2B2B2'}`"
								size="16"></u-icon>
						</view>
						<view :class="[`${params.timePeriod !== '' ? 'search-btn-active' : ''}`, 'search-btn']"
							@click="handleEnterFactoryBtnClick">
							{{enterFactoryValue}}
							<u-icon name="arrow-down-fill" :color="`${params.timePeriod !== '' ? '#4B8AFF' : '#B2B2B2'}`"
								size="16"></u-icon>
						</view>
					</u-row>
				</view>
			</view>
			<view class="pre-register-list">
				<!-- <view class="" v-if="loading">loading...</view> -->
				<template>
					<view v-if="list.length > 0">
						<view class="pre-register-list-item" v-for="(item, index) in list" :key="index" @click="()=>navToDetail(item)">
							<u-row justify="space-between" class="item-title">
								<view class="pre-register-title">{{item.applicantName ? `${item.applicantName}发起的车辆进厂登记`: '--'}}</view>
								<view class="pre-register-date">{{item.createTime ? item.createTime: '--'}}</view>
							</u-row>
							<u-row justify="space-between" class="item-cell">
								<view class="pre-register-label">
									车牌号码：
								</view>
								<view class="pre-register-content">
									{{item.carNumber ? item.carNumber: '--'}}
								</view>
							</u-row>
							<u-row justify="space-between" class="item-cell">
								<view class="pre-register-label">
									进厂时间：
								</view>
								<view class="pre-register-content">
									{{item.intoTime ? dayjs(item.intoTime).format('YYYY-MM-DD HH'): '--'}}
								</view>
							</u-row>
							<u-row justify="space-between" class="item-cell">
								<view class="pre-register-label">
									离厂时间：
								</view>
								<view class="pre-register-content">
									{{item.exitTime ? dayjs(item.exitTime).format('YYYY-MM-DD HH'): '--'}}
								</view>
							</u-row>
							<u-row justify="space-between" class="item-cell">
								<view class="pre-register-label">
									目标仓库：
								</view>
								<view class="pre-register-content">
									{{item.targetName ? item.targetName: '--'}}
								</view>
							</u-row>
							<u-row justify="space-between" class="item-status">
								<view :style="`color: ${item.status !=='' ? approvalStatustColorMap[item.status] : '#000'}`">
									{{ item.status !== '' ? approvalStatustTextMap[item.status] : '--'}}
								</view>
							</u-row>
						</view>
						<u-loadmore :status="status" />
					</view>
					<view v-else><u-empty text="数据为空" mode="list" :style="'height: 50vh'"></u-empty></view>
				</template>
			</view>
		</view>
		<!-- 弹窗内容 -->
		<view class="popup-top" v-show="isPopup">
			<view class="box-all">
				<view class="popup-content">
					<view v-if="isStatusListShow" @click="btnDevice('status', item, index)" class="popup-text" :class="index == isStatus ? 'popup-actve' : ''"
						v-for="(item, index) in statusList" :key="index"> {{ item.name }} </view>

					<view v-if="isEnterFactoryListShow" @click="btnDevice('enterFactory', item, index)" class="popup-text" :class="index == isEnterFactory ? 'popup-actve' : ''"
						v-for="(item, index) in enterFactoryList" :key="index"> {{ item.name }} </view>
				</view>
			</view>
			<!-- 底部灰色部分 -->
			<view class="popup-buttom" @click="propupHiden"></view>
		</view>
	</view>
</template>

<script>
import {getMyPreRegisterList} from '@/api/myPreRegister'
import storage from '@/utils/storage'
import constant from '@/utils/constant'

export default {
	data() {
		return {
			statusBtnAcitve: false,
			enterFactoryAcitve: false,
			isPopup: false,
			statusList: [
				{
					name: '全部',
					id: '0'
				},
				{
					name: '审批中',
					id: '3'
				},
				{
					name: '审批完成',
					id: '1'
				},
				{
					name: '审批拒绝',
					id: '2'
				},
			],
			enterFactoryList: [
				{
					name: '全部',
					id: '0'
				},
				{
					name: '近7日',
					id: '3'
				},
				{
					name: '近30日',
					id: '1'
				},
				{
					name: '近半年',
					id: '2'
				}
			],
			isStatus: 66,
			isEnterFactory: 66,
			statusValue: '状态',
			enterFactoryValue: '进厂日期',

			approvalStatustTextMap: {
				1: '审批完成',
				2: '审批拒绝',
				3: '审批中',
			},
			approvalStatustColorMap: {
				1: '#60C242',
				2: '#FF4949',
				3: '#4B8AFF',
			},
			isStatusListShow: false,
			isEnterFactoryListShow: false,

			// 请求参数
			params: {
				current: 1,
				size: 10,
				status: '',
				timePeriod: '',
				carNumber: '',
				loginUser: storage.get(constant.name),
			},
			status: 'loadmore', //控制上拉加载的状态
			// loading: true, //控制在响应回来前展示loading加载
			list: [] //要展示的列表
		}
	},
	onReady() {

	},
	onLoad() {
		this.getList(); //获取列表
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.status = 'loadmore';
		this.params.current = 1;
		this.getList();
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉加载
	onReachBottom() {
		if (this.status !== 'nomore') {
			this.status = 'loading';
			this.params.current++;
			this.getList();
		}
	},
	methods: {
		search() {
			this.status = 'loadmore';
			this.params.current = 1;
			uni.$u.debounce(this.getList, 600)
		},
		change() {
			this.status = 'loadmore';
			this.params.current = 1;
			uni.$u.debounce(this.getList, 600)
		},
		handleStatusBtnClick() {
			if(this.isPopup && this.isEnterFactoryListShow) {
				this.isPopup = true;
				this.isStatusListShow = true;
				this.isEnterFactoryListShow = false;
			} else {
				this.isPopup = !this.isPopup
				this.isStatusListShow = true;
				this.isEnterFactoryListShow = false;
			}
		},
		handleEnterFactoryBtnClick() {
			if(this.isPopup && this.isStatusListShow) {
				this.isPopup = true;
				this.isStatusListShow = false;
				this.isEnterFactoryListShow = true;
			} else {
				this.isPopup = !this.isPopup
				this.isStatusListShow = false;
				this.isEnterFactoryListShow = true;
			}
		},
		propupHiden() {
			this.isPopup = false;
		},
		btnDevice(type, item, index) {
			if(type == 'status') {
				this.isStatus = index
				this.statusValue = item.name;
				this.params.status = item.id;
				this.params.current = 1;
				this.getList();
				this.isPopup = false;
			} else if (type == 'enterFactory') {
				this.isEnterFactory = index
				this.enterFactoryValue = item.name;
				this.params.timePeriod = item.id;
				this.params.current = 1;
				this.getList();
				this.isPopup = false;
			}
		},

		// 获取列表
		async getList() {
			const resp = await getMyPreRegisterList(this.params);
			console.log(resp, 'resp33434');
			// if (resp.code === 200) {
			if (resp) {
				let { current, size } = this.params;
				let { content, totalElements } = resp;
				// console.log(this.list.length, totalElements, 'hahahaheihei');
				// // 如果list长度大于等于总数据条数，数据全部加载完成
				// if (this.list.length >= totalElements) this.status = 'nomore'; 
				// // if (content.length < ) this.status = 'nomore'; //如果响应值列表的长度小于我们所请求的页数 那就意味已经没有下一页了
				//如果current是第一页，直接赋值
				if (current === 1) {
					this.list = content;
				} else {
					//不是第一页 将原数组和得到的数组进行合并 
					let resArr = [...this.list, ...content];
					// let uniqueResArr = this.uniqueArr(resArr);
					this.list = resArr; 
					// console.log(resArr,uniqueResArr, this.list, 'this.list34343');
				}
					// 如果list长度大于等于总数据条数，数据全部加载完成
					if (this.list.length >= totalElements) {
						this.status = 'nomore'; 
					} else {
						this.status = 'loadmore'
					}
				// if (content.length < ) this.status = 'nomore'; //如果响应值列表的长度小于我们所请求的页数 那就意味已经没有下一页了
				console.log(this.list.length, totalElements, 'hahahaheihei');

			}
			// if (this.loading) {
			// 	setTimeout(() => {
			// 		this.loading = false;
			// 	}, 1000);
			// }
		},
		// 数组去重
		// uniqueArr(arr) {
		// 	let obj = {};
		// 	arr = arr.reduce(function(a, b) {
		// 		obj[b.id] ? '' : obj[b.id] = true && a.push(b);
		// 		return a;
		// 	}, [])
		// 	return arr;
		// },
		navToDetail(item) {
			uni.navigateTo({ 
				url: "/pages/preRegisterApplyDetail/index" + "?params=" + encodeURIComponent(JSON.stringify(item))
			});
		}
	}
}
</script>

<style scoped lang="scss">
.app-container {
	position: relative;

	.my-pre-register-wrapper {
		// background: #fff;
		padding: 24rpx 0 0;
		font-size: 24rpx;

		.search-wrapper {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 212rpx;
			padding-top: 20rpx;
			background: #fff;
		}

		.conditional-search {
			margin-top: 20rpx;
			padding: 0 24rpx;
			.search-btn {
				width: 48%;
				height: 60rpx;
				background: rgba(255, 255, 255, 0.11);
				border-radius: 34rpx;
				border: 1rpx solid #B2B2B2;
				color: #333333;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 34rpx;
			}

			.search-btn-active {
				width: 48%;
				height: 60rpx;
				background: rgba(255, 255, 255, 0.11);
				border-radius: 34rpx;
				border: 1rpx solid #4B8AFF;
				color: #4B8AFF;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 34rpx;
			}
		}
		.pre-register-list {
			// background: #fff;
			padding: 0 0 24rpx;
			margin-top: 204rpx;
			.pre-register-list-item {
				border-bottom: 1rpx solid #E2E2E2;
				// margin-bottom: 24rpx;
				padding: 24rpx 24rpx 0;
				background: #fff;
				&:last-child {
					margin-bottom: 0;
				}
				.item-title {
					margin-bottom: 20rpx;
				}
				.item-cell {
					margin-bottom: 16rpx;
					.pre-register-label {
						width: 140rpx;
						margin-right: 40rpx;
						height: 36rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 36rpx;
					}
				}
				.item-status {
					margin: 4rpx 0 20rpx;
					&-text {
						font-size: 28rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 500;
						line-height: 40rpx;
					}
				}
				.pre-register-title {
					font-size: 30rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 42rpx;
					text-align: left;
				}
				.pre-register-date {
					font-size: 26rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
					text-align: right;
				}
				.pre-register-label {
					width: 30%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
				.pre-register-content {
					flex: 1;
					font-size: 26rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}

			}
		}

	}

	//弹框
	.popup-top {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background-color: rgba(0, 0, 0, .4);
		top: 206rpx;
		left: 0;

		.box-all {
			width: 100%;
			background-color: #FFF;
			padding: 40rpx 30rpx 20px;
			box-sizing: border-box;

			.popup-content {
				display: flex;
				flex-wrap: wrap;

				.popup-text {
					height: 40rpx;
					width: 100%;
					margin-bottom: 30rpx;
					border-radius: 40px;
					text-align: center;
					line-height: 26px;
					font-size: 24rpx;
					box-sizing: border-box;
					color: #353535;
					text-align: left;
					font-size: 28rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;

					&:last-child {
						margin-bottom: 0;
					}
				}
				// 选中变颜色
				.popup-actve {
					color: #4B8AFF;
				}
			}
		}

		.popup-buttom {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
