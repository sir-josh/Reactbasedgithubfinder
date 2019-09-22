// import React, { Component } from 'react'
import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

// export class Search extends Component {
//     state = {
//         text: ''
//     };
     
//     static propTypes = {
//         searchUsers: PropTypes.func.isRequired,
//         clearUsers: PropTypes.func.isRequired,
//         showClear: PropTypes.bool.isRequired,
//         setAlert: PropTypes.func.isRequired
//     };

//     onSubmit(e){
//         // To use class methods that 'require calling other methods/properties inside it' in react class component, you need to bind 'this'  
//         // in the place you called the method otherwise, it will be out of context Or instead use arrow functions instead of methods.
//         e.preventDefault();
//         if(this.state.text === ''){
//             this.props.setAlert('Please enter search value', 'light');
//         }else{
//             this.props.searchUsers(this.state.text);
//             this.setState({ text: '' });    
//         }
//     }

//     onChange = e => this.setState({ [e.target.name]: e.target.value });
     
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.onSubmit.bind(this)}>
//                     <input type="text" name="text" placeholder="Search Users.." value={this.state.text} onChange={this.onChange}/>
//                     <input type="submit" value="Search" className="btn btn-dark btn-block"/>
//                 </form>
//                 { this.props.showClear && <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button> }
//             </div>
//         )
//     }
// }


// Convert from class based Component to Functional component using hooks
const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

  const onSubmit = (e) =>{
        e.preventDefault();

        if(text === ''){
            alertContext.setAlert('Please enter search value', 'light');
        }else{
            githubContext.searchUsers(text);
            setText('');    
        }
    }

   const onChange = e => setText( e.target.value );
    return (
        <div>
           <form onSubmit={onSubmit}>
                    <input type="text" name="text" placeholder="Search Users.." value={text} onChange={onChange}/> 
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                { githubContext.users.length > 0  && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button> } 
        </div>
    )
}

export default Search
