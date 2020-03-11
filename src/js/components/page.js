import React from 'react';
import Story from './story.js';
import Comments from './comments.js';

function Page(props) {
    let [ commentsCount, setCommentsCount ] = React.useState(0);

    return (
        <div className='page' id={props.id}>
            <header className="page-header">
                <Story id={props.id}/>
            </header>
            <div className="page-content">
                <h3>{(commentsCount > 0) ? commentsCount : null} Comments</h3>
                <Comments parent={props.id} />
            </div>
        </div>
    )    
}

export default Page;