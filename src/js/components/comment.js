import React from 'react';
import axios from 'axios';
import * as timeago from 'timeago.js';
import { vars } from '../base/variables.js';
import Comments from './comments.js';

function Comment(props) {
    const id = props.id;
    const url = vars.hnewsAPI + 'item/' + id + '.json';

    let [ loading, setLoading ] = React.useState(true);
    let [ comment, setComment ] = React.useState({});
    let [ showChildren, setShowChildren ] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => {
                localStorage.setItem(id, JSON.stringify(result.data));
                setComment(result.data);
            })
            .then(setLoading(false))
            .catch((err)=> {
                console.log(err);
                setLoading(false);
            });
        };
        if ( localStorage.getItem(id) !== null && localStorage.getItem(id).length > 0 ) {
            setComment(JSON.parse(localStorage.getItem(id)));
        } else {
            fetchData();
        }
    }, [props.id]);

    const showComments = () => {
        if (showChildren) {
            setShowChildren(false);
        } else {
            setShowChildren(true);
        }
    }

    return (
        <div className="comment-content">
            <div className="comment-body">
                <span className="comment-meta"><span className="comment-by">{comment.by}</span> wrote {timeago.format(comment.time * 1000)}:</span>
                <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
            </div>
            
            {
                ( comment.kids && comment.kids.length > 0 )
                ?
                <div className={ showChildren ? "child-comments comments-open" : "child-comments comments-close"}>
                    <button className="arrow" onClick={()=>showComments()}><span>More Comments</span></button>
                    <Comments parent={id} />
                </div>
                :
                null
            }
        </div>
    )    
}

export default Comment;