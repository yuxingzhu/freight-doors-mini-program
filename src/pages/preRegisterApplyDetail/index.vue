<template>
	<view class="app-container">
		<view class="pre-register-apply-detail-wrapper">
            <view class="detail-top">
                 <u-row customStyle="margin-bottom: 10px">
                    <view class="detail-title">
                        {{detailData.applicantName? `${detailData.applicantName}发起的车辆进厂登记`: '--'}}
                    </view>
                 </u-row>
                 <u-row customStyle="margin-bottom: 15px">
                    <view class="transit-company"> 
                        {{detailData.interviewingUnitName ? detailData.interviewingUnitName : '--'}}
                    </view>
                 </u-row>
                 <u-row>
                    <view class="approval-status"  :style="`color: ${detailData.status !== '' ? approvalStatustColorMap[detailData.status] : '#000'}`">
                        {{ detailData.status !== '' ? approvalStatustTextMap[detailData.status] : '--'}}
                    </view>
                 </u-row>
            </view>	
            <view class="approve-title">
                <u-row>
                    <view class="approve-title-text">
                        审批详情 
                    </view>
                </u-row>
            </view>	
            <view class="approve-content">
               
                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">审批编号</view>
                        <view class="detail-item-info">{{detailData.approvalId?detailData.approvalId: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">使用对象</view>
                        <view class="detail-item-info">{{detailData.usingUserName?detailData.usingUserName: '--'}}</view>
                    </u-row>
                </view>
                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">业务类型</view>
                        <view class="detail-item-info">{{detailData.businessTypeName?detailData.businessTypeName: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <view class="detail-item-label" :style="'margin-bottom: 10px;'">进厂事由</view>
                    <view class="detail-item-info-textarea">{{detailData.occupation?detailData.occupation: ''}}</view>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">司机姓名</view>
                        <view class="detail-item-info">{{detailData.driverName?detailData.driverName: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">身份证号码</view>
                        <view class="detail-item-info">{{detailData.idNumber?detailData.idNumber: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">手机号</view>
                        <view class="detail-item-info">{{detailData.phoneNumber?detailData.phoneNumber: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">车牌号码</view>
                        <view class="detail-item-info">{{detailData.carNumber?detailData.carNumber: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">进厂日期</view>
                        <view class="detail-item-info">{{detailData.intoTime?dayjs(detailData.intoTime).format('YYYY-MM-DD HH'): '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">离厂日期</view>
                        <view class="detail-item-info">{{detailData.exitTime?dayjs(detailData.exitTime).format('YYYY-MM-DD HH'): '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">目标仓库</view>
                        <view class="detail-item-info">{{detailData.targetName?detailData.targetName: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <u-row justify="space-between">
                        <view class="detail-item-label">区域明细</view>
                        <view class="detail-item-info">{{detailData.areaDetails?detailData.areaDetails: '--'}}</view>
                    </u-row>
                </view>

                <view class="detail-item">
                    <view class="detail-item-label" :style="'margin-bottom: 10px;'">备注</view>
                    <view class="detail-item-info-textarea">{{detailData.remarks?detailData.remarks: ''}}</view>
                </view>

            </view>
		</view>
        <view class="pre-register-apply-detail-footer">
            <u-button type="primary" class="footer-btn" @click="resubmit">再次提交</u-button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                detailData: {},
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
			}
		},
		onReady() {
		
		},
        onLoad(e) {
            if(e.params) {
                this.detailData = JSON.parse(e.params)
            }
        },
		methods: {
            resubmit() {
                const timeFormat = uni.$u.timeFormat;
                let detailData = this.detailData;
                detailData.intoTimeShow = timeFormat(this.detailData.intoTime, 'yyyy-mm-dd hh')
                detailData.exitTimeShow = timeFormat(this.detailData.exitTime, 'yyyy-mm-dd hh')
                uni.reLaunch({ 
                    url: "/pages/preRegisterApply/index" + "?params=" + encodeURIComponent(JSON.stringify(detailData))
                })
            }
		}
	}
</script>

<style scoped lang="scss">
.app-container {
    position: relative;

	.pre-register-apply-detail-wrapper {
        padding-bottom: 164rpx;
		.detail-top {
            padding: 20rpx 30rpx;
            background: #fff;
            .detail-title {
                font-size: 28rpx;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
            }
            .transit-company {
                font-size: 26rpx;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #777777;
                line-height: 36rpx;
            }
            .approval-status {
                font-size: 28rpx;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #FF7300;
                line-height: 40rpx;
            }
        }
        .approve-title {
            padding: 20rpx 30rpx;
            &-text {
                font-size: 28rpx;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
            }
        }
        .approve-content {
            background: #fff;
            padding: 30rpx 30rpx;
            .label-item {
                margin-bottom: 40rpx;
                .label {
                    font-size: 26rpx;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 36rpx;
                }
                .content {
                    font-size: 26rpx;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #000000;
                    line-height: 36rpx;
                }
            }

            .detail-item {
                margin-bottom: 40rpx;
                &-label {
                    font-size: 28rpx;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 40rpx;
                }
                &-info {
                    font-size: 26rpx;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 36rpx;
                }
                &-info-textarea {
                    padding: 20rpx;
                    width: 670rpx;
                    min-height: 142rpx;
                    background: #F8F8F8;
                    font-size: 26rpx;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 36rpx;
                }
            }
        }
	}
    .pre-register-apply-detail-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 144rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 0rpx 20rpx 6rpx rgba(58,48,0,0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        .footer-btn {
            width: 640rpx;
            height: 84rpx;
            background: #4B8AFF;
            border-radius: 16rpx;
            font-size: 32rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 44rpx;
        }
    }
}
</style>
