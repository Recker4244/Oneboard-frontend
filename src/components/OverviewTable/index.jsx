/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import { decodeToken } from 'react-jwt';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import BouncingDotsLoader from '../BouncingDotsLoader';
import makeRequest from '../../utils/makeRequest';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import ProjectTimelineStacked from '../ProjectTimelineStacked';
import OpenPRs from '../OpenPRs';
import StoryStatsDisplayer from '../StoryStatsDisplayer';
import VelocityGauge from '../VelocityGauge';
import {
  GET_PROJECTS_BY_PAGE_LIMITS, GET_TEAM_MEMBERS_OF_PROJECT, GET_SONAR_SUCCESS, GET_TEAM_VELOCITY, GET_OPEN_ISSUES_DEV, GET_OPEN_PRS_DEV
} from '../../constants/apiEndpoints';
import UpcomingEvents from '../UpcomingEvents';
import { PROJECT_DETAILS_PAGE_ROUTE } from '../../constants/routes';

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function createDataForLeadership(isActive, projectId, name, keyTeamMembers, velocity) {
  return {
    isActive, projectId, name, keyTeamMembers, velocity
  };
}
function createDataForManager(isActive, projectId, name, velocity, sonarQube) {
  return {
    isActive, projectId, name, velocity, sonarQube
  };
}
function createDataForDeveloper(
  isActive,
  projectId,
  name,
  keyTeamMembers,
  pr,
  stories,
  rollOffDate,
  events,
  sonarQube
) {
  return {
    isActive, projectId, name, keyTeamMembers, pr, stories, rollOffDate, events, sonarQube
  };
}

let tableColumn = [];

function CustomPaginationActionsTable() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  if (token === null) {
    navigate('/login');
  }
  const myDecodedToken = decodeToken(token);
  const { role, username } = myDecodedToken;
  switch (role) {
    case 'leadership': {
      tableColumn = [
        'Project',
        'Key Members',
        'Project Timeline',
        'Velocity',
        'Upcoming Events'
      ];
      break;
    }
    case 'manager': {
      tableColumn = [
        'Project',
        'Project Timeline',
        'Velocity',
        'Upcoming Events',
        'Sonar Qube'
      ];
      break;
    }
    case 'developer': {
      tableColumn = [
        'Project',
        'Key Members',
        'Open PRs',
        'Stories assigned',
        'Role off Date',
        'Upcoming Events',
        'Sonar Qube'
      ];
      break;
    }
    default:
      break;
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [rows, setRows] = React.useState([]);
  const [rowsLength, setRowsLength] = React.useState(0);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getRollOffDate = (teams) => {
    let rollOffDate = '';
    teams.forEach((team) => {
      if (team.username === username) {
        const date = new Date(team.end_date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        rollOffDate = `${day} ${monthNames[month]} ${year}`;
      }
    });
    return rollOffDate;
  };

  // implement search by project name or key team members

  React.useEffect(() => {
    const tempRows = [];
    const fetch = async () => {
      makeRequest(GET_PROJECTS_BY_PAGE_LIMITS(page, rowsPerPage, username), {}, { headers: { 'x-auth-token': token } }).then((res) => {
        // console.log(res);
        setRowsLength(res.count);
        let count = 0;
        for (const project of res.rows) {
          // eslint-disable-next-line no-loop-func
          makeRequest(GET_TEAM_MEMBERS_OF_PROJECT(project.project_id), {}, { headers: { 'x-auth-token': token } }).then(async (resTeam) => {
            const keyTeamMembersArr = [];
            // console.log(resTeam);
            const velocity = await makeRequest(GET_TEAM_VELOCITY(project.project_id), {}, { headers: { 'x-auth-token': token } });
            // const velocity = 25;
            resTeam.forEach((team) => {
              if (team.key_status) {
                const name = team.username.charAt(0).toUpperCase() + team.username.slice(1);
                keyTeamMembersArr.push(name);
              }
            });
            if (role === 'leadership') {
              // console.log('pushing');
              tempRows.push(
                createDataForLeadership(
                  project.isActive,
                  project.project_id,
                  project.project_name,
                  keyTeamMembersArr,
                  velocity
                )
              );
              // console.log('****', tempRows);
            } else if (role === 'manager') {
              const sonar = await makeRequest(GET_SONAR_SUCCESS(project.project_id), {}, { headers: { 'x-auth-token': token } });
              tempRows.push(
                createDataForManager(
                  project.isActive,
                  project.project_id,
                  project.project_name,
                  velocity,
                  sonar
                )
              );
            } else if (role === 'developer') {
              const sonar = await makeRequest(GET_SONAR_SUCCESS(project.project_id), {}, { headers: { 'x-auth-token': token } });
              console.log('sonar', sonar);
              const pr = await makeRequest(GET_OPEN_PRS_DEV(username, project.project_id), {}, { headers: { 'x-auth-token': token } });
              const stories = await makeRequest(GET_OPEN_ISSUES_DEV(username, project.project_id), {}, { headers: { 'x-auth-token': token } });

              const rollOffDate = getRollOffDate(resTeam, username);
              console.log('rollOffDate', pr.openPRs);
              // console.log(sonar);
              tempRows.push(createDataForDeveloper(
                project.isActive,
                project.project_id,
                project.project_name,
                keyTeamMembersArr,
                pr.openPRs,
                stories.openStories,
                rollOffDate,
                0,
                sonar
              ));
              console.log('developer here');
            }
            count += 1;
            console.log('count', tempRows);
            // sort temprows by project name
            tempRows.sort((a, b) => {
              // First sort by isActive
              if (a.isActive && !b.isActive) {
                return -1;
              } if (!a.isActive && b.isActive) {
                return 1;
              }
              // If both have the same isActive status, sort by name
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              } if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
            if (count === res.rows.length) {
              // console.log('dsadasdasd', tempRows);
              setRows(tempRows);
            }
          });
        }
      });
    };
    fetch();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsLength) : 0;

  const handleChangePage = (event, newPage) => {
    makeRequest(GET_PROJECTS_BY_PAGE_LIMITS(newPage, rowsPerPage, username), {}, { headers: { 'x-auth-token': token } }).then((res) => {
      const tempRows = [];
      let count = 0;
      res.rows.forEach((project) => {
        makeRequest(GET_TEAM_MEMBERS_OF_PROJECT((project.project_id)), {}, { headers: { 'x-auth-token': token } }).then(async (resTeam) => {
          const keyTeamMembersArr = [];
          // const velocity = await makeRequest(GET_TEAM_VELOCITY(project.project_id), {}, { headers: { 'x-auth-token': token } });
          const velocity = 25;
          resTeam.forEach((team) => {
            if (team.key_status) {
              const name = team.username.charAt(0).toUpperCase() + team.username.slice(1);
              keyTeamMembersArr.push(name);
            }
          });
          if (role === 'leadership') {
            tempRows.push(
              createDataForLeadership(
                project.isActive,
                project.project_id,
                project.project_name,
                keyTeamMembersArr,
                velocity
              )
            );
          } else if (role === 'manager') {
            const sonar = await makeRequest(GET_SONAR_SUCCESS(project.project_id), {}, { headers: { 'x-auth-token': token } });
            tempRows.push(
              createDataForManager(
                project.isActive,
                project.project_id,
                project.project_name,
                velocity,
                sonar
              )
            );
          } else if (role === 'developer') {
            const sonar = await makeRequest(GET_SONAR_SUCCESS(project.project_id), {}, { headers: { 'x-auth-token': token } });
            const pr = await makeRequest(GET_OPEN_PRS_DEV(username, project.project_id), {}, { headers: { 'x-auth-token': token } });
            const stories = await makeRequest(GET_OPEN_ISSUES_DEV(username, project.project_id), {}, { headers: { 'x-auth-token': token } });

            // console.log(sonar);
            const rollOffDate = getRollOffDate(resTeam);
            tempRows.push(createDataForDeveloper(
              project.isActive,
              project.project_id,
              project.project_name,
              keyTeamMembersArr,
              pr.openPRs,
              stories.openStories,
              rollOffDate,
              0,
              sonar
            ));
          }
          count += 1;
          // sort temprows by project name
          tempRows.sort((a, b) => {
            // First sort by isActive
            if (a.isActive && !b.isActive) {
              return -1;
            } if (!a.isActive && b.isActive) {
              return 1;
            }
            // If both have the same isActive status, sort by name
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            } if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          if (count === res.rows.length) {
            setRows(tempRows);
            setPage(newPage);
          }
        });
      });
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const eventValue = event.target.value;
    makeRequest(GET_PROJECTS_BY_PAGE_LIMITS(page, parseInt(event.target.value, 10), username), {}, { headers: { 'x-auth-token': token } }).then((res) => {
      const tempRows = [];
      let count = 0;
      res.rows.forEach((project) => {
        makeRequest(GET_TEAM_MEMBERS_OF_PROJECT((project.project_id)), {}, { headers: { 'x-auth-token': token } }).then(async (resTeam) => {
          const keyTeamMembersArr = [];
          const velocity = await makeRequest(GET_TEAM_VELOCITY(project.project_id), {}, { headers: { 'x-auth-token': token } });
          // const velocity = 25;
          resTeam.forEach((team) => {
            if (team.key_status) {
              const name = team.username.charAt(0).toUpperCase() + team.username.slice(1);
              keyTeamMembersArr.push(name);
            }
          });
          if (role === 'leadership') {
            tempRows.push(
              createDataForLeadership(
                project.isActive,
                project.project_id,
                project.project_name,
                keyTeamMembersArr,
                velocity
              )
            );
          } else if (role === 'manager') {
            const sonar = await makeRequest(GET_SONAR_SUCCESS(project.project_id), {}, { headers: { 'x-auth-token': token } });
            tempRows.push(
              createDataForManager(
                project.isActive,
                project.project_id,
                project.project_name,
                velocity,
                sonar
              )
            );
          } else if (role === 'developer') {
            const sonar = await makeRequest(GET_SONAR_SUCCESS(project.project_id), {}, { headers: { 'x-auth-token': token } });
            const pr = await makeRequest(GET_OPEN_PRS_DEV(username, project.project_id), {}, { headers: { 'x-auth-token': token } });
            const stories = await makeRequest(GET_OPEN_ISSUES_DEV(username, project.project_id), {}, { headers: { 'x-auth-token': token } });

            const rollOffDate = getRollOffDate(resTeam);
            tempRows.push(createDataForDeveloper(
              project.isActive,
              project.project_id,
              project.project_name,
              keyTeamMembersArr,
              pr.openPRs,
              stories.openStories,
              rollOffDate,
              0,
              sonar
            ));
          }
          count += 1;
          // sort temprows by project name
          tempRows.sort((a, b) => {
            // First sort by isActive
            if (a.isActive && !b.isActive) {
              return -1;
            } if (!a.isActive && b.isActive) {
              return 1;
            }
            // If both have the same isActive status, sort by name
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            } if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          if (count === res.rows.length) {
            setRowsPerPage(eventValue);
            setRows(tempRows);
          }
        });
      });
    });
  };
  const showMembers = (members) => {
    let membersString = '';
    members.forEach((member) => {
      membersString += `${member}, `;
    });
    membersString = membersString.slice(0, -2);
    return membersString;
  };

  const [entry, setEntry] = React.useState(false);

  const handleEnter = () => {
    setEntry(true);
  };

  const handleExit = () => {
    setEntry(false);
  };

  // console.log('rows', rows);
  return rowsLength ? (
    <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead className="bg-McKinseyBlue z-10" onMouseLeave={handleExit}>
          {
            tableColumn.map((column, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell
                key={index}
                style={{
                  color: 'white', verticalAlign: 'top', zIndex: 20
                }}
                align="left"
                onMouseEnter={column === 'Project Timeline' ? handleEnter : handleExit}
              >
                {column === 'Velocity' && <p className="text-xl text-center">{column}</p>}
                {column !== 'Velocity' && <p className="text-xl text-left">{column}</p>}
                {column === 'Project Timeline'
                  && (
                    <div className="mt-1 flex flex-row gap-1 bg-transparent absolute -translate-y-20 -translate-x-2 z-30 text-black">
                      <div className="h-4 w-4 rounded-full m-1" style={{ backgroundColor: '#088F8F' }} />
                      <p className="text-xs self-center">ToDo</p>
                      <div className="h-4 w-4 rounded-full m-1" style={{ backgroundColor: '#FAC711' }} />
                      <p className="text-xs self-center">In Progress</p>
                      <div className="h-4 w-4 rounded-full m-1" style={{ backgroundColor: '#8FD04F' }} />
                      <p className="text-xs self-center">Done</p>
                    </div>
                  )}
                {column === 'Stories assigned'
                  && (
                    <div className="mt-1 flex flex-row gap-1 bg-transparent absolute -translate-y-24  z-30 text-black">
                      <div className="h-4 w-4 rounded-full m-1" style={{ backgroundColor: '#3FB950' }} />
                      <p className="text-xs self-center">Done</p>
                      <div className="h-4 w-4 rounded-full m-1" style={{ backgroundColor: '#2f7ed8' }} />
                      <p className="text-xs self-center">In Progress</p>
                    </div>
                  )}
              </TableCell>
            ))
          }
        </TableHead>
        <TableBody onMouseLeave={handleExit}>
          {
            role === 'leadership' ? rows.map((row, index) => (
              <TableRow
                // get background color for row
                className="cursor-pointer"
                style={{
                  backgroundColor: row.isActive ? '#FFFFFF' : '#F1F1F1',
                  opacity: row.isActive ? '1' : '0.7',
                  fontStyle: row.isActive ? 'normal' : 'italic'
                }}
                onClick={() => { navigate(`${PROJECT_DETAILS_PAGE_ROUTE}/${row.projectId}`); }}
              >
                {' '}
                <TableCell component="th" scope="row" onMouseEnter={handleExit} style={{ fontSize: '18px' }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" onMouseEnter={handleExit} style={{ fontSize: '18px' }}>
                  {showMembers(row.keyTeamMembers)}
                </TableCell>
                <TableCell sx={{ height: 100 }} onMouseEnter={handleEnter}>
                  <div onMouseEnter={handleEnter}>
                    <ProjectTimelineStacked projectId={row.projectId} color={row.isActive ? null : '#F1F1F1'} />

                  </div>
                </TableCell>
                <TableCell align="left" onMouseEnter={handleExit}>
                  <VelocityGauge
                    velocity={row.velocity}
                    key={index}
                    id={row.id}
                    color={row.isActive ? null : '#F1F1F1'}
                  />
                  {/* <VelocitySpeedometer velocity={row.velocity} key={index} id={row.id} /> */}
                  {/* velocity */}
                </TableCell>
                <TableCell align="left" onMouseEnter={handleExit}>
                  <UpcomingEvents projectId={row.projectId} />
                </TableCell>
              </TableRow>
            )) : role === 'manager' ? rows.map((row, index) => (
              <TableRow
                className="cursor-pointer"
                style={{
                  backgroundColor: row.isActive ? '#FFFFFF' : '#F1F1F1',
                  opacity: row.isActive ? '1' : '0.7',
                  fontStyle: row.isActive ? 'normal' : 'italic'
                }}
                onClick={() => { navigate(`${PROJECT_DETAILS_PAGE_ROUTE}/${row.projectId}`); }}
              >
                <TableCell component="th" scope="row" style={{ fontSize: '18px' }}>
                  {row.name}
                </TableCell>
                <TableCell>
                  <div>
                    {' '}
                    <ProjectTimelineStacked projectId={row.projectId} color={row.isActive ? null : '#F1F1F1'} />
                  </div>
                </TableCell>
                <TableCell align="left">
                  <VelocityGauge
                    velocity={row.velocity}
                    key={index}
                    id={row.id}
                    color={row.isActive ? null : '#F1F1F1'}
                  />
                  {' '}
                  {/* {row.velocity.toFixed(2)}
                   */}
                  {/* velocity */}
                </TableCell>
                <TableCell align="left">
                  <UpcomingEvents projectId={row.projectId} />
                </TableCell>
                <TableCell align="left">
                  {row.sonarQube
                    ? (
                      <div className="flex items-center justify-center">
                        <TiTick className="mr-2 text-xl text-white bg-[#8fd14f] rounded-full" />
                        {/* <p className="text-[#808080]">Success</p> */}
                      </div>
                    )
                    : (
                      <div className="flex items-center justify-center">
                        <RxCross2 className="mr-2 text-xl text-white bg-[#f24727] rounded-full" />
                        {/* <p className="text-[#808080]">Failure</p> */}
                      </div>
                    )}
                </TableCell>
              </TableRow>
            )) : role === 'developer' ? rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                style={{
                  backgroundColor: row.isActive ? '#FFFFFF' : '#F1F1F1',
                  opacity: row.isActive ? '1' : '0.7',
                  fontStyle: row.isActive ? 'normal' : 'italic'
                }}
                onClick={() => { navigate(`${PROJECT_DETAILS_PAGE_ROUTE}/${row.projectId}`); }}
              >
                <TableCell component="th" scope="row" style={{ fontSize: '18px' }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" style={{ fontSize: '18px' }}>
                  {showMembers(row.keyTeamMembers)}
                </TableCell>
                <TableCell align="left" style={{ fontSize: '18px' }}>
                  <OpenPRs projectId={row.projectId} openpr={row.pr} color={row.isActive ? null : '#F1F1F1'} />
                </TableCell>
                <TableCell align="left" style={{ fontSize: '18px' }}>
                  <StoryStatsDisplayer projectId={row.projectId} color={row.isActive ? null : '#F1F1F1'} />
                  {/* {row.stories} */}
                </TableCell>
                <TableCell align="left" style={{ fontSize: '18px' }}>
                  {row.rollOffDate}
                </TableCell>
                <TableCell align="left">
                  <UpcomingEvents projectId={row.projectId} />
                </TableCell>
                <TableCell align="left">
                  {row.sonarQube
                    ? (
                      <div className="flex items-center justify-center">
                        <TiTick className="mr-2 text-xl text-white bg-[#8fd14f] rounded-full" />
                        {/* <p className="text-[#808080]">Success</p> */}
                      </div>
                    )
                    : (
                      <div className="flex items-center justify-center">
                        <RxCross2 className="mr-2 text-xl text-white bg-[#f24727] rounded-full" />
                        {/* <p className="text-[#808080]">Failure</p> */}
                      </div>
                    )}
                </TableCell>
              </TableRow>
            ))
              : null
          }
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rowsLength}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page'
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : (
    <div className="flex justify-center items-center mt-24">
      <BouncingDotsLoader />
    </div>
  );
}

export default CustomPaginationActionsTable;
