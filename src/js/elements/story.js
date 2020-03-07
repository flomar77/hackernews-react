import React from 'react';
import axios from 'axios';
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
        if ( localStorage.getItem(id) !== null && localStorage.getItem(id).length > 0 ) {
            setStory(JSON.parse(localStorage.getItem(id)));
        } else {
            fetchData();
        }
    }, [])

    return (
        <div className="story-content">
            <span className="story-id">{id}</span>
            <h3>{story.title}</h3>
            <p>URL: {story.url}</p>
            <span className="infos">{story.score} by {story.by}</span>
        </div>
    )    
}

export default Story;