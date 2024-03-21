<script>
	import { getToken } from '@/utils/auth'

	export default {
		onLaunch: function() {
			this.initApp()
		},
		onShow: function() {
			this.initApp()
		},
		onHide: function() {
		},
		methods: {
			// 初始化应用
			initApp() {
				console.log('3rererer');
				// 初始化应用配置
				// this.initConfig()
				// 检查用户登录状态
				//#ifdef H5
				this.checkLogin()
				//#endif
			},
			checkLogin() {
				if (!getToken()) {
					uni.reLaunch('/pages/login') 
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "styles/main.scss";
	// color-ui
	@import "@/static/scss/colorui.css";
	// iconfont
	@import "@/static/font/iconfont.css";
</style>
