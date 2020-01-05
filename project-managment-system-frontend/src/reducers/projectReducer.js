import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, GET_TEAM_PROJECTS } from "../actions/types";

const initialState = {
  projects: [],
  teamProjects: [],
  project: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_TEAM_PROJECTS:
      return {
        ...state,
        teamProjects: action.payload
      }
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter( project => project.projectIdentifier !== action.payload )
      };
    default:
      return state;
  }
}
