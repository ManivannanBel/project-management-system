import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, GET_TEAM_PROJECTS, GET_USERNAMES, GET_TEAM_MEMBERS } from "../actions/types";

const initialState = {
  projects: [],
  teamProjects: [],
  project: {},
  userNames : [],
  teamMembers : []
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
      };
    case GET_TEAM_MEMBERS:
      return {
        ... state,
        teamMembers: action.payload
      }
    default:
      return state;
  }
}
