/*
* @component ProjectTile
* @type functional Component
* @children none
* @requires React,prop-types,Link
* @reduxActions false
* @actions none
* @description
* this component takes displays the a link of the project mapped to the project manager
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import './style.scss';

const ProjectTile = ({
  project,
}) => (
  <article className="project-wrapper">
    <Link
      className="links"
      key={project.id}
      to={`/project/${project.projectId}`}
      href={`/project/${project.projectId}`}
    >
      <div className="project">
        {project.projectName}
      </div>
    </Link>
  </article>
);

ProjectTile.propTypes = {
  project: PropTypes.object, // eslint-disable-line
};
export default ProjectTile;
