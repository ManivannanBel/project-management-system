import axios from 'axios';
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, UP, DELETE_PROJECT_TASK } from './types'

export const addProjectTask = (backlog_id, project_task, history) => async dispatch =>{

    try {
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }

}

export const getBacklog = (backlog_id) => async dispatch => {

    try {
        const res = await axios.get(`/api/backlog/${backlog_id}`);
        dispatch({
            type : GET_BACKLOG,
            payload : res.data
        })
    } catch (err) {
        //console.log(err)
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const getProjectTask = (backlog_id, project_task_sequence) => async dispatch => {

    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${project_task_sequence}`);
        dispatch({
            type : GET_PROJECT_TASK,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const updateProjectTask = (backlog_id, project_task_sequence, updatedProjectTask, history) => async dispatch => {

    try {
        
        const res = await axios.patch(`/api/backlog/${backlog_id}/${project_task_sequence}`, updatedProjectTask);
        history.push(`/projectBoard/${backlog_id}`)
        dispatch({
            type : GET_ERRORS,
            payload : {}
        })
    } catch (err) {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const deleteProjectTask = (backlog_id, project_task_sequence) => async dispatch => {

    if(window.confirm(`Do you want to delete the project task ${project_task_sequence}?, this action cannot be undone`)){
        try {
            await axios.delete(`/api/backlog/${backlog_id}/${project_task_sequence}`);
            dispatch({
                type : DELETE_PROJECT_TASK,
                payload : project_task_sequence
            })
        } catch (err) {
            
        }    
    }

}