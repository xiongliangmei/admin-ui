import axios from '@/http/axios'

// 登录
export const login = data => {
  return axios({
    url: 'user/login',
    method: 'post',
    data
  })
}
