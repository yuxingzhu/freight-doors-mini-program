import request from '@/utils/request'

export function addRegisterApply(data) {
	return request({
	  url: '/api/reservation',
	  method: 'post',
	  data
	})
}

export function getApplicantList(params) {
	return request({
	  url: '/api/users/deptUser',
	  method: 'get',
	  params
	})
}
