import React from 'react';
import axios from 'axios';
import { vars } from '../base/variables.js';

function Story(props) {
    const id = props.id;
    const url = vars.hnewsAPI + 'item/' + id + '.json';

    let [ loading, setLoading ] = React.useState(true);
    let [ item, setItem ] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => setItem(result.data))
            .then(setLoading(false))
            .catch((err)=> {
              console.log(err);
              setLoading(false);
            });
        };
        fetchData();
    }, [])

    return (
        <div className="story-content">
            <span className="story-id">{id}</span>
            <h3>{item.title}</h3>
            <p>URL: {item.url}</p>
            <span className="infos">{item.score} by {item.by}</span>
        </div>
    )    
}

export default Story;