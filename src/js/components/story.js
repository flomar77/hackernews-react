import React from 'react';
import axios from 'axios';
import * as timeago from 'timeago.js';
import { vars } from '../base/variables.js';

function Story(props) {
    const id = props.id;
    const url = vars.hnewsAPI + 'item/' + id + '.json';

    let [ loading, setLoading ] = React.useState(true);
    let [ story, setStory ] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => {
                localStorage.setItem(id, JSON.stringify(result.data));
                setStory(result.data);
            })
            .then(setLoading(false))
            .catch((err)=> {
            console.log(err);
            setLoading(false);
            });
        };
        // if ( localStorage.getItem(id) !== null && localStorage.getItem(id).length > 0 ) {
        //     setStory(JSON.parse(localStorage.getItem(id)));
        // } else {
        fetchData();
        // }
    }, [props.id])
    return (
        <div className="story-content">            
            <h2>{story.title}</h2>
            <span className="story-url">Link: <a href={story.url} target="_blank">{story.url}</a></span>
            <span className="story-infos">{story.score} points by <span className="by">{story.by}</span> {timeago.format(story.time * 1000)} {story.kids ?  ' | ' + story.kids.length + ' Comments' : null }</span>
        </div>
    )    
}

export default Story;