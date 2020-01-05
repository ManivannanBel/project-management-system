import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, GET_TEAM_PROJECTS, GET_USERNAMES } from "../actions/types";

const initialState = {
  projects: [],
  teamProjects: [],
  project: {},
  userNames : []
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
      case GET_USERNAMES:
        return {
          ...state,
          userNames: action.payload
        }
    default:
      return state;
  }
}
