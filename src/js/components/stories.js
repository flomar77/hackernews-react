import React from 'react';
import axios from 'axios';
import Story from './story.js';
import { vars } from '../base/variables.js';
import { splitArrInChunks } from '../functions/splitArrInChunks.js';

function Stories(props) {
    const url = vars.hnewsAPI + 'topstories.json';
    const storiesPerPage = 20;
    const main = document.querySelector('.main');
    
    let [ position, setNavPosition ] = React.useState(0);
    let [ storiesList, setStoriesList ] = React.useState([]);
    let [ currentList, setCurrentStoriesList ] = React.useState([]);
    let [ loading, setLoading ] = React.useState(true);

    React.useEffect((main) => {
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
        setTimeout(()=>{document.querySelector('.main').classList.add('stories-loaded')}, 800);
    }, []);

    function clickEvent(item) {
        props.pageToShow(item);
        setTimeout(()=>{main.classList.add('page-slide-in')}, 10);
    }

    const changeNav = (direction) => {
        if ( direction === 'down' && position < storiesList.length - 1 ) {
            changeNavActions(1);
        } else if ( direction === 'up' && position > 0 ) {
            changeNavActions(-1);
        }
    }

    const changeNavActions = (number) => {
        main.classList.remove('stories-loaded');
        let pos = position + number;
        setTimeout(()=>{
            setNavPosition(pos);
            setCurrentStoriesList(storiesList[pos]);
        }, 250);
        setTimeout(()=>{main.classList.add('stories-loaded')}, 350);
    }

    console.log('Page: ' + position);
    console.log(storiesList);
    console.log(main);
    return (
        <div className='stories'>
            <button className="btn-up" onClick={()=>changeNav('up')}>Up</button>
            <button className="btn-down" onClick={()=>changeNav('down')}>Down</button>
            <div>Page <span>{position + 1}</span> of {storiesList.length}</div>
            <div className="stories-wrapper">
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
        </div>
    )    
}

export default Stories;