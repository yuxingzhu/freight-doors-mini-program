<template>
  <view class="app-container">
    <view class="pre-register-apply-form-wrapper">
      <u-form
        :model="form"
        ref="uForm"
        class="form"
        :rules="rules"
        labelPosition="left"
        labelWidth="100"
      >
        <u-form-item
          label="使用对象"
          prop="usingUserName"
          borderBottom
          required
          @click="usingUserClick"
        >
          <u-input
            v-model="form.usingUserName"
            placeholder="请下拉选择使用对象"
            border="none"
            placeholder-class='plaClass'
          ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item
          label="受访单位"
          prop="interviewingUnitName"
          borderBottom
          required
          @click="interviewedUnitClick"
        >
          <u-input
            v-model="form.interviewingUnitName"
            placeholder="请下拉选择受访单位"
            border="none"
            placeholder-class='plaClass'
          ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item
          label="申请人"
          prop="applicantName"
          borderBottom
          required
          @click="applicantClick"
        >
          <u-input
            v-model="form.applicantName"
            :placeholder="`${form.interviewingUnitName === '' ? '请先选择受访单位，再下拉选择' : '请下拉选择申请人'}`"
            disabledColor="#fff"
            border="none"
            :disabled="form.interviewingUnitName ===''"
            placeholder-class='plaClass'
            ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item
          label="业务类型"
          prop="businessTypeName"
          borderBottom
          required
          @click="businessTypeClick"
        >
          <u-input
            v-model="form.businessTypeName"
            placeholder="请选择业务类型"
            border="none"
            placeholder-class='plaClass'
          ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item label="进厂事由" prop="occupation" borderBottom label-position="top">
          <u--textarea
            :style="'margin-top: 10px; border: none;'"
            v-model="form.occupation"
            placeholder="请输入进厂事由"
            height="80"
            maxlength="100"
            count
          ></u--textarea>
        </u-form-item>
        <u-form-item label="司机姓名" prop="driverName" borderBottom required>
          <u-input
            v-model="form.driverName"
            border="none"
            placeholder="请输入司机姓名"
            placeholder-class='plaClass'
          />
        </u-form-item>
        <u-form-item label="身份证号码" prop="idNumber" borderBottom required>
          <u-input
            v-model="form.idNumber"
            border="none"
            placeholder="请输入身份证号码"
            placeholder-class='plaClass'
          />
        </u-form-item>
        <u-form-item
          label="手机号"
          prop="phoneNumber"
          borderBottom
          required
        >
          <u-input
            v-model="form.phoneNumber"
            border="none"
            placeholder="请输入手机号"
            placeholder-class='plaClass'
          />
        </u-form-item>
        <u-form-item
          label="车牌号码"
          prop="carNumber"
          borderBottom
          required
        >
          <view :style="'width: 100%'">
            <u-keyboard 
              ref="uKeyboard" 
              mode="car" 
              :show="carKeyBoardShow"
              :mask="true"
              @cancel="carKeyBoardShow = false"
              @confirm="carKeyBoardShow = false"
              @change="valChange"
              @backspace="backspace"
              :autoChange="true"
            ></u-keyboard>
            <u-input
              v-model="form.carNumber"
              border="none"
              placeholder="请输入车牌号码"
              @focus="carNumberFocus"
              placeholder-class='plaClass'
              />
          </view>
        </u-form-item>
        <u-form-item
          label="进厂日期"
          prop="intoTimeShow"
          borderBottom
          required
          @click="intoTimeClick"
        >
          <u-input
            v-model="form.intoTimeShow"
            placeholder="请选择进厂日期"
            border="none"
            placeholder-class='plaClass'
          ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item
          label="离厂日期"
          prop="exitTimeShow"
          borderBottom
          required
          @click="exitTimeClick"
        >
          <u-input
            v-model="form.exitTimeShow"
            placeholder="请选择离厂日期"
            border="none"
            placeholder-class='plaClass'
          ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item
          label="目标仓库"
          prop="targetName"
          borderBottom
          required
          @click.native="targetClick"
        >
          <u-input
            v-model="form.targetName"
            placeholder="请选择目标仓库"
            border="none"
            placeholder-class='plaClass'
          ></u-input>
          <u-icon slot="right" name="arrow-right" color="#999999" size="16"></u-icon>
        </u-form-item>
        <u-form-item label="区域明细" prop="areaDetails" borderBottom>
          <u-input
            v-model="form.areaDetails"
            border="none"
            placeholder="请输入区域明细"
            placeholder-class='plaClass'
          />
        </u-form-item>
        <u-form-item label="备注" prop="remarks" label-position="top">
          <u--textarea
            :style="'margin-top: 10px; border: none;'"
            v-model="form.remarks"
            placeholder="请输入备注内容"
            height="80"
            maxlength="100"
            count
          ></u--textarea>
        </u-form-item>
      </u-form>
      <u-action-sheet
        :show="showUsingObjects"
        :actions="usingObjectsList"
        title="请选择使用对象"
        @close="showUsingObjects = false"
        :safe-area-inset-bottom="true"	
        @select="usingObjectsSelect"
        cancelText="取消"
      >
      </u-action-sheet>
      <u-action-sheet
        :show="showInterviewedUnit"
        :actions="interviewedUnitList"
        title="请选择受访单位"
        @close="showInterviewedUnit = false"
        @select="usingInterviewedSelect"
        cancelText="取消"
      >
      </u-action-sheet>
      <u-action-sheet
        :show="showApplicant"
        :actions="applicantList"
        title="请选择申请人"
        @close="showApplicant = false"
        @select="showApplicantSelect"
        cancelText="取消"
      >
      </u-action-sheet>
      <u-action-sheet
        :show="showBusinessType"
        :actions="businessTypeList"
        title="请选择业务类型"
        @close="showBusinessType = false"
        @select="businessTypeSelect"
        cancelText="取消"
      >
      </u-action-sheet>
      <u-action-sheet
        :show="showTarget"
        :actions="targetList"
        title="请选择目标仓库"
        @close="showTarget = false"
        @select="targetSelect"
        cancelText="取消"
      >
      </u-action-sheet>
      <u-datetime-picker
        ref="entertimePicker"
        :params="dateParams"
        :show="showEnterActoryDate"
        mode="datetime"
        @close="showEnterActoryDate = false"
        @cancel="showEnterActoryDate = false"
        @confirm="enterActoryDateConfirm"
        :closeOnClickOverlay="true"
        :show-time-tag="true"
        :formatter="formatter"
        class="datetime-picker"
      
      ></u-datetime-picker>
      <u-datetime-picker
        ref="leavetimePicker"
        :params="dateParams"
        :show="showLeaveActoryDate"
        mode="datetime"
        @close="showLeaveActoryDate = false"
        @cancel="showLeaveActoryDate = false"
        @confirm="leaveActoryDateConfirm"
        :closeOnClickOverlay="true"
        :show-time-tag="true"
        :formatter="formatter"
        class="datetime-picker"
      ></u-datetime-picker>
      <view class="btn-wrapper">
        <u-button type="primary" @click="submit" class="btn">提交</u-button>
        <u-keyboard ref="uKeyboard" mode="car" v-model="carKeyBoardShow"></u-keyboard>
      </view>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import dayjs from 'dayjs'
import {addRegisterApply, getApplicantList} from '@/api/preRegisterApply'
import { isvalidPhone, isVehicleNumber } from '@/utils/validate'
import { get } from '@/api/system/dictDetail'
import { getDepts } from '@/api/system/dept'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
// 自定义验证
const validPhone = (_rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
const validVehicleNumber = (_rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入车牌号码'))
  } else if (!isVehicleNumber(value)) {
    callback(new Error('请输入正确的车牌号码'))
  } else {
    callback()
  }
}
const validateIdNo = (_rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value == null) {
    callback(new Error('请输入身份证号码'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}
export default {
  data() {
    return {
      carKeyBoardShow: false,
      dateParams: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      showUsingObjects: false,
      usingObjectsList: [],
      showInterviewedUnit: false,
      interviewedUnitList: [],
      showApplicant: false,
      applicantList: [],
      showBusinessType: false,
      businessTypeList: [],
      targetList: [],
      showEnterActoryDate: false,
      showLeaveActoryDate: false,

      showTarget: false,
      form: {
        usingUser: "", // 使用对象
        usingUserName: "", // 使用对象
        interviewingUnit: "", // 受访单位
        interviewingUnitName: "", // 受访单位
        applicant: "", // 申请人
        applicantName: "", // 申请人
        businessType: "", // 业务类型
        businessTypeName: "", // 业务类型
        occupation: "", // 进厂事由
        driverName: "", // 司机姓名
        idNumber: "", // 身份证号码
        phoneNumber: "", // 手机号
        carNumber: "", // 车牌号码
        intoTime: "", // 进厂日期
        exitTime: "", // 离厂日期
        intoTimeShow: "", // 进厂日期(展示)
        exitTimeShow: "", // 离厂日期（展示）
        target: "", // 目标仓库
        targetName: "", // 目标仓库
        areaDetails: "", // 区域明细
        remarks: "", // 备注
        createBy: storage.get(constant.name) // 用户名
      },
      rules: {
        usingUserName: [
          {
            required: true,
            message: "请下拉选择使用对象",
            trigger: ["change"],
            transform(value) {
              return String(value);
            },
          }
        ],
        interviewingUnitName: [
          {
            required: true,
            message: "请下拉选择业务类型",
            trigger: ["change"],
            transform(value) {
              return String(value);
            },
          },
        ],
        applicantName: [
          {
            required: true,
            message: "请下拉选择申请人",
            trigger: ["change"],
            transform(value) {
              return String(value);
            },
          },
        ],
        businessTypeName: [
          {
            required: true,
            message: "请选择业务类型",
            trigger: ["change"],
            transform(value) {
              return String(value);
            },
          },
        ],
        driverName: [
          {
            required: true,
            message: "请输入司机姓名",
            trigger: ["change"],
          },
        ],

        idNumber: [
          {
            required: true,
            validator: validateIdNo,
            trigger: ["change"],

          },
        ],

        phoneNumber: [
          {
            required: true,
            validator: validPhone,
            trigger: ["change"],
          },
        ],

        carNumber: [
          {
            required: true,
            validator: validVehicleNumber,
            trigger: ["change"],
          },
        ],

        intoTime: [
          {
            required: true,
            message: "请选择进厂日期",
            trigger: ["change"],
          },
        ],

        exitTime: [
          {
            required: true,
            message: "请选择离厂日期",
            trigger: ["change"],
          },
        ],
        intoTimeShow: [
          {
            required: true,
            message: "请选择进厂日期",
            trigger: ["change"],
          },
        ],

        exitTimeShow: [
          {
            required: true,
            message: "请选择离厂日期",
            trigger: ["change"],
          },
        ],
        targetName: [
          {
            required: true,
            message: "请选择目标仓库",
            trigger: ["change"],
            transform(value) {
              return String(value);
            },
          },
        ],
      },
    };
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    // 微信小程序需要用此写法
		this.$refs.entertimePicker.setFormatter(this.formatter);
		this.$refs.leavetimePicker.setFormatter(this.formatter);
    this.$refs.uForm.setRules(this.rules);
    this.getUsingUserOptions();
    this.getBusinessTypeOptions();
    this.getInterviewingUnitOptions();
    this.getTargetOptions();
  },
  onLoad(e) {
    if(e.params) {
      const data = JSON.parse(e.params)
      this.form = data;
      if (this.form.interviewingUnit) {
        this.initApplicantList(this.form.interviewingUnit)
      }
    }
  },
  methods: {
    usingUserClick() {
      this.showUsingObjects = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    interviewedUnitClick() {
      this.showInterviewedUnit = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    applicantClick() {
      this.showApplicant = this.form.interviewingUnitName === '' ? false : true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    businessTypeClick() {
      this.showBusinessType = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    intoTimeClick() {
      this.showEnterActoryDate = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    exitTimeClick() {
      this.showLeaveActoryDate = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    targetClick() {
      this.showTarget = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    valChange(val) {
      // 位数大于7，直接return
      if (this.form.carNumber.length > 7) return

      // 判断是否为 省
      if(this.form.carNumber.length < 1) {
        const reg = /^[\u4e00-\u9fa5]$/
        
        // 正则验证
        const str = reg.test(val)
        
        if(str) return this.form.carNumber += val
      }

      // 判断是否为 英文
      if(this.form.carNumber.length == 1) {
        const reg = /^[A-Z_]+$/
        
        // 正则验证
        const str = reg.test(val)
        
        if(str) return this.form.carNumber += val
      }

      // 判断是否为 英文和数字
      if(this.form.carNumber.length > 1 && this.form.carNumber.length <= 7) {
        const reg = /^[a-zA-Z0-9_]+$/
        // 正则验证
        const str = reg.test(val)
        
        if(str) this.form.carNumber += val
      }
    },
    backspace() {
      // 删除value的最后一个字符
      if(this.form.carNumber.length) this.form.carNumber = this.form.carNumber.substr(0, this.form.carNumber.length - 1);
    },
    carNumberFocus() {
      this.carKeyBoardShow = true
      uni.hideKeyboard() //隐藏软键盘方法
    },
    initApplicantList(id) {
      getApplicantList({deptId: id}).then(res=>{
        this.applicantList = res.map(item => {
           return {
              id: item.id,
              name: item.nickName
            }
        })
      })
    },
    usingObjectsSelect(e) {
      this.form.usingUser = e.id;
      this.form.usingUserName = e.name;
    },
    usingInterviewedSelect(e) {
      this.form.interviewingUnit = e.id;
      this.form.interviewingUnitName = e.name;
      this.applicantList = []
      this.form.applicant = ''
      this.form.applicantName = ''
      getApplicantList({deptId: e.id}).then(res=>{
        this.applicantList = res.map(item => {
           return {
              id: item.id,
              name: item.nickName
            }
        })
      }).catch(_err => {
        this.applicantList = []
        this.form.applicant = ''
        this.form.applicantName = ''
      })
    },
    businessTypeSelect(e) {
      this.form.businessType = e.id;
      this.form.businessTypeName = e.name;
    },
    targetSelect(e) {
      this.form.target = e.id;
      this.form.targetName = e.name;
    },
    showApplicantSelect(e) {
      this.form.applicant = e.id;
      this.form.applicantName = e.name;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    enterActoryDateConfirm(e) {
      const timeFormat = uni.$u.timeFormat;
			let timeValue = timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss');
			let timeValueShow = timeFormat(e.value, 'yyyy-mm-dd hh');
      this.form.intoTime = timeValue
      this.form.intoTimeShow = timeValueShow

      const intoTime =this.form.intoTime ? dayjs(this.form.intoTime).format('YYYY-MM-DD HH:mm:ss') : '' 	// 开始时间
      const exitTime = this.form.exitTime ? dayjs(this.form.exitTime).format('YYYY-MM-DD HH:mm:ss') : ''	// 结束时间
      console.log(this.form.intoTime, this.form.exitTime, intoTime, exitTime, 'heiheihei');
      if (intoTime && exitTime) {
        console.log(this.form.intoTime, 'intoTimeexitTime');
        if (intoTime >= exitTime) {
          this.form.intoTime = ''
          this.form.intoTimeShow = ''
          return this.$refs.uToast.show({
            message: '进厂时间不能大于或等于离厂时间!',
            type: 'error', 
            icon: false,
          })
        }
      }


      this.showEnterActoryDate = false
    },
    leaveActoryDateConfirm(e) {
      const timeFormat = uni.$u.timeFormat;
			let timeValue = timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss');
			let timeValueShow = timeFormat(e.value, 'yyyy-mm-dd hh');
      this.form.exitTime = timeValue
      this.form.exitTimeShow = timeValueShow
      const intoTime =this.form.intoTime ? dayjs(this.form.intoTime).format('YYYY-MM-DD HH:mm:ss') : ''	// 开始时间
      const exitTime = this.form.exitTime ? dayjs(this.form.exitTime).format('YYYY-MM-DD HH:mm:ss') : ''	// 结束时间
      if (intoTime && exitTime) {
        if (intoTime >= exitTime) {
          this.form.exitTime = ''
          this.form.exitTimeShow = ''
          return this.$refs.uToast.show({
            message: '进厂时间不能大于或等于离厂时间!',
            type: 'error', 
            icon: false,
          })
        }
      }
      this.showLeaveActoryDate = false
    },
    getUsingUserOptions() {
      get('目标对象').then(res => {
        this.usingObjectsList = res.content && res.content.length && res.content.map(item => {
          return {
            id: item.id,
            name: item.label
          }
        })
      })
    },
    getBusinessTypeOptions() {
      get('业务类型').then(res => {
        this.businessTypeList = res.content && res.content.length && res.content.map(item => {
          return {
            id: item.id,
            name: item.label
          }
        })
      })
    },
    getInterviewingUnitOptions() {
      getDepts().then(res => {
        this.interviewedUnitList = res.content && res.content.length && res.content.map(item => {
          return {
            id: item.id,
            name: item.label
          }
        })
      })
    },
    getTargetOptions() {
      get('目标仓库').then(res => {
        this.targetList = res.content && res.content.length && res.content.map(item => {
          return {
            id: item.id,
            name: item.label
          }
        })
      })
    },
    submit() {
      let submitForm = this.form
      delete submitForm.id
      this.$refs.uForm.validate().then(valid => {
      	if (valid) {
          addRegisterApply(submitForm).then(res=>{
            uni.reLaunch({ 
              url: "/pages/myPreRegister/index"
            })
          })
      		console.log('验证通过');
      	} else {
      		console.log('验证失败');
      	}
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep.datetime-picker.u-popup .u-picker__view__column:last-child {
  display: none !important;
}
::v-deep .u-toast__content__text {
  max-width: 480rpx !important;
}
::v-deep .uni-input-input {
  text-align: right;
}
::v-deep .u-form-item__body__right__message {
  text-align: right !important;
}
::v-deep .uni-textarea-placeholder {
  font-size: 26rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36rpx;
}
.plaClass {
  text-align: right; 
  font-size: 26rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36rpx;
}
.pre-register-apply-form-wrapper {
  padding: 20rpx 0 18rpx;
  & > .form {
    background: #fff;
    padding: 20rpx 30rpx 20rpx 44rpx;
  }
  .btn-wrapper {
    padding: 20rpx 30rpx;
    .btn {
      width: 690rpx;
      height: 84rpx;
      background: #4b8aff;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 44rpx;
    }
  }
}
</style>
