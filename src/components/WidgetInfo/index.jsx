/* eslint-disable react/prop-types */
import React from 'react';
import { TbInfoHexagon } from 'react-icons/tb';
// import infoIcon from '../../assets/icons/info-icon.svg';
import './index.css';

function WidgetInfo({ widgetName }) {
  function infoData(widget) {
    if (widget === 'events calendar') { return 'The calendar allows you to add and view events, appointments, or reminders on specific dates, making it easier to manage your time and stay organized.'; }
    if (widget === 'pto calendar') { return 'The calendar shows the user\'s scheduled time off as well as the availability of other team members. This can be useful for planning team projects or scheduling meetings, as it helps identify when team members may be unavailable.'; }
    if (widget === 'team distribution graph') { return 'The team distribution graph is a visual representation of how team members are allocated to different sprints in a project. The graph typically displays the number of team members assigned to each sprint along the x-axis and the sprints along the y-axis.'; }
    if (widget === 'team members') { return 'The team members widget displays key information about the members of a project team. It typically shows the names of team members, their role, the cost they charge per day, assigned story points and their roll-off date. The color against each team member represents their position band in the organisation.'; }
    if (widget === 'repositories') { return 'A widget that shows an overview of SonarQube report for repositories in the project. The widget provides a quick and easy way to assess the health of the repositories and identify potential areas for improvement. It allows users to track the progress of the project over time and take corrective action as needed.'; }
    if (widget === 'retro board gallery') { return 'A retro board gallery that contains screenshots of retro boards taken after each sprint is a collection of visual records of the team\'s retrospective discussions over time.'; }
    if (widget === 'developer events calender') { return 'The calendar allows you to view events, appointments, or reminders on specific dates, making it easier to manage your time and stay organized.'; }
    if (widget === 'sprint stories') { return 'The widget displays the status of the sprint stories in a visual and easy-to-understand format. The widget is divided into three sections, representing the three stages of a sprint story: "To Do," "In Progress," and "Complete."'; }
    if (widget === 'project timeline') { return 'The project timeline graph shows the duration of each project sprint. It provides a clear and concise overview of the project schedule, allowing you to track progress, identify potential delays or issues, and ensure that the project stays on track towards its completion date.'; }
    if (widget === 'effort distribution') { return 'An effort distribution graph is a visual representation that displays the percentage of work completed on each sprint for a specific epic. This graph helps to track the progress of work completed on each sprint and provides insight into the team\'s effort distribution.'; }
    if (widget === 'number of people staffed') { return 'A widget that shows the number of people staffed out of the total number of people in the organization is a visual element that provides you with an instant overview of the current staffing status of the organization. '; }
    if (widget === 'git contribution trend') { return 'A Git contribution trend heatmap is a graphical representation of the contribution activity of an organization on a monthly basis over time. It provides a quick and easy way to visualize the frequency of commits made by the members of the organization.'; }
    if (widget === 'number of ongoing projects') { return 'A widget that shows the number of ongoing projects out of total projects. It allows you to quickly assess your workload and prioritize tasks based on the number of ongoing projects.'; }
    if (widget === 'pulse check leadership') { return 'The pulse check graph is a graphical representation of the overall sentiment of an organization\'s members on a monthly basis. It provides a snapshot of how people are feeling, and can help identify potential areas of concern or opportunities for improvement.'; }
    if (widget === 'pulse check manager') { return 'The pulse check graph is a graphical representation of the overall sentiment of the project members across all projects which the manager have on a monthly basis. It provides a snapshot of how people are feeling, and can help identify potential areas of concern or opportunities for improvement.'; }
    if (widget === 'language trend') { return 'A language trend graph that shows the percentage of tech stack on which the user has worked in a month. The graph can be useful for tracking the user\'s proficiency and experience in various technologies over time, as well as identifying trends and changes in their tech stack usage.'; }
    return 'Hi there';
  }

  return (
    <div className="flex justify-center items-center cursor-pointer">
      <div className="relative">
        <div className="hover-text">
          <TbInfoHexagon className="ml-2 h-5 w-5" />
          <div className="text-box w-96 absolute top-full font-normal left-0 p-2 bg-light_blue text-sm text-dark_gray shadow-md hidden">
            {infoData(widgetName)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetInfo;
