import axios from "axios";
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, GET_TEAM_PROJECTS, GET_USERNAMES, CLEAR_ERRORS} from "./types"

export const createProject = (project, history) => async dispatch => {
    try{
        await axios.post("/api/project/", project);
        history.push("/dashboard");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/");
    dispatch({
        type : GET_PROJECTS,
        payload: res.data
    })
}

export const getTeamProjects = () => async dispatch => {
    const res = await axios.get("/api/project/teamProjects/");
    dispatch({
        type : GET_TEAM_PROJECTS,
        payload: res.data
    })
}

export const getProject = (id, history) => async dispatch => {
    try{
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
            type : GET_PROJECT,
            payload: res.data
        })
    }catch(err){
        history.push("/dashboard");
    }
}

export const clearErrors = () => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
}

export const deleteProject = id => async dispatch => {

    if(window.confirm("Do you want to delete the project?")){
        try{
            await axios.delete(`/api/project/${id}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            })    
        }catch(err){
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const getUsersForSearchQuery = (query) => async dispatch => {
    const res = await axios.get(`/api/users/searchQuery/${query}`);
    dispatch({
        type : GET_USERNAMES,
        payload : res.data
    })
}

export const resetSearchedUsernames = () => dispatch => {
    dispatch({
        type : GET_USERNAMES,
        payload : []
    })
}