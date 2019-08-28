import React, { Fragment, Component } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired
    }

    render() {
        const {
            name,
            company,
            login,
            avatar_url,
            location,
            bio,
            blog,
            html_url,
            followers= 'none',
            following= 'none',
            public_repos= 'none',
            public_gist= 'none',
            hireable
        } = this.props.user;

        const { loading, repos } = this.props;

        if(loading) return <Spinner />
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
                Hireable: {' '} {hireable ? <i className='fas fa-check text-success'/>: <i className='fas fa-times-circle text-danger'/>}
                <div className='card grid-2'>
                    <div className="all-center">
                        <img src={avatar_url} alt="User Avatar" className="round-img" style={{ width: '150px'}}/>
                        <h1>{name}</h1>
                        <p>Location: {location} </p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{ bio }</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong>{ login }
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong>{ company }
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: </strong>{ blog }
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-cente">
                    <div className="badge badge-primary">Followers: { followers } </div>
                    <div className="badge badge-success">Following: { following } </div>
                    <div className="badge badge-danger">Public Repos: { public_repos } </div>
                    <div className="badge badge-dark">Public Gist: { public_gist } </div>
                </div>
                <Repos  repos={repos} />
            </Fragment>
        ) 
        
        
    }
}

export default User
