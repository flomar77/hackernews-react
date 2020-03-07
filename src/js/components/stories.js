import React from 'react';
import axios from 'axios';
import Story from '../elements/story.js';
import { vars } from '../base/variables.js';
import { splitArrInChunks } from '../functions/functions.js';

function Stories(props) {
    const url = vars.hnewsAPI + 'topstories.json';
    
    let [ storiesList, setStoriesList ] = React.useState([]);
    let [ loading, setLoading ] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => setStoriesList(result.data.splice(0,20)))
            .then(setLoading(false))
            .catch((err)=> {
              console.log(err);
              setLoading(false);
            });
        };
        fetchData();
    }, []);

    return (
        <main className={ loading ? 'stories' : 'stories stories-loaded'}>
            {
                !loading 
                ? 
                storiesList.map((item) => { return( 
                    <article className={'story story-' + item}>
                        <Story id={item} />
                        <button onClick={(e)=>{ pageShown ? props.pageToShow(item) : e.preventDefault()}}>Read more...</button> 
                    </article>
                ) }) 
                : 
                ()=>{ return( <p>Loading...</p> ); }
            }
        </main>
    )    
}

export default Stories;