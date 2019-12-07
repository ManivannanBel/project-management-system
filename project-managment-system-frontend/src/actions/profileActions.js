import axios from 'axios';
import { GET_USER_DETAILS, GET_ERRORS } from './types'

export const getProfileDetails = () => async dispatch => {

    try{
        const res = await axios.get("/api/profile/")
        dispatch({
            type : GET_USER_DETAILS,
            payload : res.data
        })
    }catch(err){
       // console.log(err.response.data)
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const updateFullname = (data) => async dispatch => {

    try{
        const res = await axios.put("/api/profile/updateFullname", data);
        dispatch({
            type : GET_USER_DETAILS,
            payload : res.data
        })
    }catch(err){
        console.log(err.response.data)
        dispatch({
            type : GET_ERRORS,
            payload : {error : err.response.data.fullname}
        })
    }

}

export const updatePassword = (data) => async dispatch => {

    try{
        const res = await axios.put("/api/profile/updatePassword", data);
    }catch(err){
        //console.log(err.response.data)
        dispatch({
            type : GET_ERRORS,
            payload : { error : ((err.response.data.password)?err.response.data.password : "" )+ ", " + ((err.response.data.confirmPassword)?err.response.data.confirmPassword : "")}
        })
    }

}