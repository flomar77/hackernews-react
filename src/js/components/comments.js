import React from 'react';
import axios from 'axios';
import { vars } from '../base/variables.js';
import Comment from './comment.js';

function Comments(props) {
    const pid = props.parent;
    const url = vars.hnewsAPI + 'item/' + pid + '.json';

    let [ commentsList, setCommentsList ] = React.useState([]);
    let [ loading, setLoading ] = React.useState(true);

    // React.useEffect(() => {
    //     if ( localStorage.getItem(pid) !== null ) {
    //         localItem = JSON.parse(localStorage.getItem(pid));
    //         if ( localItem.kids && localItem.kids.length > 0 ) {
    //             setCommentsList(localItem.kids);
    //         }
    //     }
    // }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => {
                if (result.data.kids && result.data.kids.length > 0) {
                    setCommentsList(result.data.kids);
                }
            })
            .then(setLoading(false))
            .catch((err)=> {
                // console.log(err);
                setLoading(false);
            });
        };
        fetchData();
    }, [pid])

    return (
        <div className="comments">
            <ul>
                {
                    (commentsList.length > 0)
                    ?
                    commentsList.map((id)=>{
                        return ( <li key={id}><Comment id={id} /></li> ) 
                    })
                    :
                    null
                }
            </ul>
            { (commentsList.length > 0) ? null : <p className="no-comments">No Comments</p> }
        </div>
    )    
}

export default Comments;