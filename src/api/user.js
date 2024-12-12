import {post, get, put, del} from '@/utils/request.js'

// 登录接口
export const loginStudentApi=data=>{
    return post({
        // 请求的地址
        url:'/api/students/login',
        data
    })
}

export const loginParentApi=data=>{
    return post({
        // 请求的地址
        url:'/api/parents/login',
        data
    })
}

export const loginTeacherApi=data=>{
    return post({
        // 请求的地址
        url:'/api/teachers/login',
        data
    })
}

//注册接口
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


// 获取学生信息
export const getStudentPageApi = (data)=>{
    return get({
        url:`/api/students/page`,
        data
    })
}

// 根据学号获取学生信息
export const getStudentInfoApi=(data)=>{
    return get({
        url:`/api/students/get/${data}`
    })
}

// 修改学生信息
export const updateStudentApi=data=>{
    return put({
        url:`/api/students/update`,
        data
    })
}

// 作业管理
// 获取作业信息
export const getHomeworkPageApi = (data)=>{
    return get({
        url:`/api/homeworks/page`,
        data
    })
}

// 根据id获取某条作业信息
export const getHomeworkByIdApi=(data)=>{
    return get({
        url:`/api/homeworks/getHomeworkById/${data}`
    })
}
// 修改作业
export const updateHomeworkApi=data=>{
    return put({
        url:`/api/homeworks/update`,
        data
    })
}
// 删除作业
export const delHomeworkApi=(data)=>{
    return del({
        url:`/api/homeworks/delete/${data}`
    })
}


// 班级活动
// 获取活动
export const getActApi = (data)=>{
    return get({
        url:`/api/activitys/list`,
        data
    })
}
export const updateActApi=data=>{
    return put({
        url:`/api/activitys/update`,
        data
    })
}
// 添加活动
export const postActApi=data=>{
    return post({
        // 请求的地址
        url:'/api/activitys/add',
        data
    })
}
// 删除活动
export const delActApi=(data)=>{
    return del({
        url:`/api/activitys/delete/${data}`
    })
}


export const getNewsPageApi=(data)=>{
    return get({
        url:`/api/news/page`,
        data
    })
}