import React, { Fragment} from 'react'
import spinnerImg from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
          <img src={spinnerImg} alt="Loading..." style={{ width: '200px', display: 'block', margin: 'auto'}} />  
        </Fragment>
    )
}

export default Spinner
