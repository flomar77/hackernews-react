import React from 'react';
import { vars } from '../base/variables.js';
import Story from './story.js';
import Comments from './comments.js';

function Page(props) {

    let [ hideClass, setHideClass ] = React.useState(false);
    React.useEffect(() => {
        
    }, []);

    const hideThePage = () => {
        setHideClass(true);        
    }

    return (
        <div className='page' id={props.id}>
            <header className="page-header">
                <Story id={props.id}/>
            </header>
            <div className="page-content">
                <Comments parent={props.id} />
            </div>
        </div>
    )    
}

export default Page;