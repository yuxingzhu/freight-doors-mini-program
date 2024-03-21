import request from '@/utils/request'

export function getMyPreRegisterList(params) {
	return request({
		url: '/api/reservation',
		method: 'GET',
		params,
		loading: false
	})
}
