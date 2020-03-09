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

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(url)
            .then(result => {
                const list = splitArrInChunks(result.data, storiesPerPage);
                setStoriesList(list);
                setCurrentStoriesList(list[position]);
            })
            .then(setLoading(false))
            .catch((err)=> {
                console.log(err);
                setLoading(false);
            });
        };
        fetchData();
        setTimeout(()=>{document.querySelector('.main').classList.add('stories-loaded')}, 400);
    }, []);

    const showPage = (item) => {
        props.pageToShow(item);
        setTimeout(()=> {
            main.classList.add('page-slide-in');
        }, 10);
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
        main.classList.add('stories-unloaded');
        let pos = position + number;
        setTimeout(()=>{
            setNavPosition(pos);
            setCurrentStoriesList(storiesList[pos]);
        }, 450);
        setTimeout(()=>{
            main.classList.add('stories-loaded');
            main.classList.remove('stories-unloaded');
        }, 550);
    }

    return (
        <div className='stories'>
            <div className='container'>
                <button className="btn-up" onClick={()=>changeNav('up')}>Previous</button>
                <button className="btn-down" onClick={()=>changeNav('down')}>Next</button>
                <div className="stories-nav">Page <span>{position + 1}</span> of {storiesList.length}</div>
                <div className="stories-wrapper">
                    {
                        !loading
                        ? 
                        currentList.map((item, index) => { return( 
                            <article className={'story story-' + item}>
                                <Story id={item} nr={( position * 20) + index + 1 }/>
                                <button className='btn-readmore' onClick={(e)=>{ props.pageShown ? e.preventDefault() : showPage(item) }}>Read more...</button> 
                            </article>
                        )}) 
                        : 
                        ()=>{ return( <p>Loading...</p> ); }
                    }
                </div>
                <button className="btn-up" onClick={()=>changeNav('up')}>Previous</button>
                <button className="btn-down" onClick={()=>changeNav('down')}>Next</button>
            </div>
        </div>
    )    
}

export default Stories;