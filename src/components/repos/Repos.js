import React, { useContext } from 'react';
import Repoitem from './Repoitem';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';


const Repos = () => {
    const githubContext = useContext(GithubContext);

    return githubContext.repos.map(repo => <Repoitem repo={repo} key={repo.id} />);
}

Repos.propType = {
    repos: PropTypes.array.isRequired
}
export default Repos
