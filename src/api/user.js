import {post,get} from '@/utils/request.js'

// 登录接口
export const loginApi=data=>{
    return post({
        // 请求的地址
        url:'/api/students/login',
        data
    })
}

export const registerStudentApi=data=>{
    return post({
        // 请求的地址
        url:'/api/students/register',
        data
    })
}
export const registerTeacherApi=data=>{
    return post({
        // 请求的地址
        url:'/api/teachers/register',
        data
    })
}
export const registerParentApi=data=>{
    return post({
        // 请求的地址
        url:'/api/parents/register',
        data
    })
}