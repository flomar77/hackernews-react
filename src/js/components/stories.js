import React from 'react';
import axios from 'axios';
import Story from '../elements/story.js';
import { vars } from '../base/variables.js';
import { splitArrInChunks } from '../functions/functions.js';

function Stories(props) {
    const url = vars.hnewsAPI + 'topstories.json';
    const storiesPerPage = 20;
    
    let [ position, setNavPosition ] = React.useState(0);
    let [ storiesList, setStoriesList ] = React.useState([]);
    let [ currentList, setCurrentStoriesList ] = React.useState([]);
    let [ loading, setLoading ] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => {
                const list = splitArrInChunks(result.data, storiesPerPage)
                setStoriesList(list);
                setCurrentStoriesList(list[position]);
            })
            .then(setLoading(false))
            .then(console.log('fetched'))
            .catch((err)=> {
                console.log(err);
                setLoading(false);
            });
        };
        fetchData();
    }, []);

    function clickEvent(item) {
        props.pageToShow(item);
        setTimeout(()=>{document.querySelector('.main').classList.add('page-slide-in')}, 10);
    }

    const changeNav = (direction) => {
        let pos;
        if ( direction === 'down' && position < storiesList.length - 1 ) {
            pos = position + 1;
            setNavPosition(pos);
            setCurrentStoriesList(storiesList[pos]);
        } else if ( direction === 'up' && position > 0 ) {
            pos = position - 1;
            setNavPosition(pos);
            setCurrentStoriesList(storiesList[pos]);
        }
    }
    console.log('Page: ' + position);
    console.log(storiesList);
    return (
        <div className={ loading ? 'stories' : 'stories stories-loaded' }>
            <button className="btn-up" onClick={()=>changeNav('up')}>Up</button>
            <button className="btn-down" onClick={()=>changeNav('down')}>Down</button>
            <div>Page <span>{position + 1}</span></div>
            {
                !loading
                ? 
                currentList.map((item) => { return( 
                    <article className={'story story-' + item}>
                        <Story id={item} />
                        <button onClick={(e)=>{ props.pageShown ? e.preventDefault() : clickEvent(item) }}>Read more...</button> 
                    </article>
                )}) 
                : 
                ()=>{ return( <p>Loading...</p> ); }
            }
        </div>
    )    
}

export default Stories;