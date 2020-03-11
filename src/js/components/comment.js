import React from 'react';
import axios from 'axios';
import * as timeago from 'timeago.js';
import dompurify from 'dompurify';
import { vars } from '../base/variables.js';
import Comments from './comments.js';

function Comment(props) {
    const id = props.id;
    const url = vars.hnewsAPI + 'item/' + id + '.json';
    const sanitizer = dompurify.sanitize;

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
        fetchData();
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
            {
                ( !loading )
                ?
                <div className="comment-body">
                    <span className="comment-meta"><span className="comment-by">{comment.by}</span> wrote {timeago.format(comment.time * 1000)}:</span>
                    <p dangerouslySetInnerHTML={{ __html: sanitizer(comment.text) }}></p>
                </div>
                :
                <p>Loading...</p>
            }
            {
                ( comment.kids && comment.kids.length > 0 )
                ?
                <div className={ showChildren ? "child-comments comments-open" : "child-comments comments-close"}>
                    <button className="btn-show" onClick={()=>showComments()}><span>More Comments</span></button>
                    <Comments parent={id} />
                </div>
                :
                null
            }
        </div>
    )    
}

export default Comment;