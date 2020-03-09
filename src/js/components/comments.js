import React from 'react';
import Comment from './comment.js';

function Comments(props) {
    const pid = props.parent;
    let localItem = {};

    let [ commentsList, setCommentsList ] = React.useState([]);

    React.useEffect(() => {
        if ( localStorage.getItem(pid) !== null ) {
            localItem = JSON.parse(localStorage.getItem(pid));
            if ( localItem.kids && localItem.kids.length > 0 ) {
                setCommentsList(localItem.kids);
            }
        }
    }, []);
    return (
        <div className="comments">
            <ul>
                {
                    (commentsList.length > 0)
                    ?
                    commentsList.map((id)=>{ return ( <li key={id}><Comment id={id} /></li> ) })
                    :
                    null
                }
            </ul>
            { (commentsList.length > 0) ? null : <p className="no-comments">No Comments</p> }
        </div>
    )    
}

export default Comments;