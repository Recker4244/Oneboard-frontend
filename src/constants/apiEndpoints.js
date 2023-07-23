export const BACKEND_URL = 'http://localhost:8080/';

export const ADD_USER_URL = {
  url: 'admin/users',
  method: 'post'
};

export const GET_USERS_URL = {
  url: 'admin/users',
  method: 'get'
};

export const UPDATE_USER_BY_ID_URL = {
  url: 'admin/users',
  method: 'put'
};

export const GET_ALL_USERS = {
  url: 'users',
  method: 'get'
};

export const CREATE_EVENT = {
  url: 'events',
  method: 'POST'
};

export const GET_EVENTS = (projectId) => ({
  url: `events/${projectId}`,
  method: 'GET'
});

export const GET_LEAVES_BY_PROJECT = (projectId) => ({
  url: `leaves/${projectId}`,
  method: 'GET'
});

export const CREATE_PROJECT = {
  url: 'projects/create',
  method: 'POST'
};

export const GET_PROJECTS_BY_PAGE_LIMITS = (page, rowsPerPage, username) => ({
  url: `projects?page=${page}&rowsPerPage=${rowsPerPage}&username=${username}`,
  method: 'GET'
});

export const GET_TEAM_MEMBERS_OF_PROJECT = (projectId) => ({
  url: `teams/${projectId}`,
  method: 'GET'
});

export const GET_LEAVES_BY_USERNAME = (username) => ({
  url: `leaves/user/${username}`,
  method: 'GET'
});

export const CREATE_LEAVE = {
  url: 'leaves',
  method: 'POST'
};

export const PULSE_API = (id) => ({
  method: 'get',
  url: `/pulse?viewer=${id}`
});
export const PULSE_API_POST = {
  method: 'post',
  url: '/pulse'
};
export const AUTHENTICATE_USER = {
  url: 'auth',
  method: 'post'
};

export const GET_RETRO = (projectId) => ({
  url: `retro/create/${projectId}`,
  method: 'GET'
});
export const GET_SUPPLEMENTARY_COST = (id) => ({
  url: `supplementaryCost/${id}`,
  method: 'get'
});

export const GET_PERSONAL_COST = (id) => ({
  url: `personalCost/${id}`,
  method: 'get'
});

export const GET_USER = (username) => ({
  url: `/admin/users/${username}`,
  method: 'get'
});

export const UPDATE_USER = {
  url: '/admin/users',
  method: 'put'
};

export const GET_TEAM_MEMBERS = (projectId) => ({
  url: `teams/${projectId}`,
  method: 'get'
});

export const GET_EFFORT_DISTRIBUTION = (projectId) => ({
  url: `projects/${projectId}/effort_distribution`,
  method: 'get'
});

export const GET_SONAR_SUCCESS = (projectId) => ({
  url: `/sonar?project_id=${projectId}`,
  method: 'get'
});

export const DETAIL = (projectId) => ({
  url: `sonar/detail?project_id=${projectId}`,
  method: 'get'
});

export const ROLE_YEARLY_DISTRIBUTION = {
  url: 'roleInProjects',
  method: 'get'
};

export const GET_TEAM_DISTRIBUTION = (projectId) => ({
  url: `/projects/${projectId}/team_distribution`,
  method: 'get'
});
export const GET_HEATMAP = {
  url: 'github/heatmap',
  method: 'get'
};

export const GET_LANGUAGE_USAGE = (username) => ({
  url: `github/languages/${username}`,
  method: 'get'
});

export const GET_MANAGER_LANGUAGE_USAGE = (username) => ({
  url: `github/languages/manager/${username}`,
  method: 'get'
});
export const GET_PROJECT_TIMELINE = (projectId) => ({
  url: `projects/${projectId}/timeline`,
  method: 'get'
});

export const GET_STORY_POINTS_BY_SPRINTS = (projectId) => ({
  url: `projects/${projectId}/story_points`,
  method: 'get'
});

export const GET_DEVELOPER_VELOCITY = (projectId) => ({
  url: `projects/${projectId}/developer_velocity`,
  method: 'get'
});

export const GET_TEAM_VELOCITY = (projectId) => ({
  url: `projects/${projectId}/team_velocity`,
  method: 'get'
});

export const GET_STAFF_COUNT = {
  url: 'projects/users/count',
  method: 'get'
};

export const GET_PROJECT_COUNT = (username) => ({
  url: `projects/count/${username}`,
  method: 'get'
});
export const GET_STORY_COUNT = (username) => ({
  url: `projects/story_count/${username}`,
  method: 'get'
});

export const GET_WORKLOAD_BAROMETER = (username) => ({
  url: `projects/workload_barometer/${username}`,
  method: 'get'
});

export const GET_PROJECT_BY_ID = (id) => ({
  url: `projects/project_details/${id}`,
  method: 'get'
});

export const GET_ROLL_OF_DATE = (projectId, username) => ({
  url: `projects/rollOfDate/${projectId}/${username}`,
  method: 'get'
});

export const UPDATE_CHARGE_CODES = (projectId) => ({
  url: `projects/chargeCodes/${projectId}`,
  method: 'put'
});

export const GET_COMMITS_DEV = (username, projectId) => ({
  url: `github/commits/${username}/${projectId}`,
  method: 'get'
});

export const GET_BOOKMARKS = (projectId) => ({
  url: `bookmarks/${projectId}`,
  method: 'get'
});

export const CREATE_BOOKMARK = (projectId) => ({
  url: `bookmarks/${projectId}`,
  method: 'post'
});

export const GET_OPEN_PRS_DEV = (username, projectId) => ({
  url: `github/prcount/${username}/${projectId}`,
  method: 'get'
});

export const GET_OPEN_ISSUES_DEV = (username, projectId) => ({
  url: `github/stories/${username}/${projectId}`,
  method: 'get'
});

export const GET_REPOS = (projectId) => ({
  url: `projects/repos/${projectId}`,
  method: 'get'
});

export const UPDATE_PROJECT = (projectId) => ({
  url: `projects/edit/${projectId}`,
  method: 'patch'
});
