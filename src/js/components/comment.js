import React from 'react';
import axios from 'axios';
import { vars } from '../base/variables.js';
import Comments from './comments.js';

function Comment(props) {
    const id = props.id;
    const url = vars.hnewsAPI + 'item/' + id + '.json';

    let [ loading, setLoading ] = React.useState(true);
    let [ comment, setComment ] = React.useState({});

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

    return (
        <div className="comment-content">
            <div className="comment-body" dangerouslySetInnerHTML={{ __html: comment.text }}></div>
            <span>By {comment.by}</span>
            {
                ( comment.kids && comment.kids.length > 0 )
                ?
                <div className="child-comments">
                    <span className="arrow">Show/Hide</span>
                    <Comments parent={id} />
                </div>
                :
                null
            }
        </div>
    )    
}

export default Comment;