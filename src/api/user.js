import {post,get} from '@/utils/request.js'

// 登录接口
export const loginApi=data=>{
    return post({
        // 请求的地址
        url:'/api/students/login',
        data
    })
}