import React from 'react';
import { vars } from '../base/variables.js';
import MainHeader from '../elements/mainheader.js';
import Stories from './stories.js';
import Page from './page.js';

function App(props) {

    let [ pageID, setPageID ] = React.useState();
    let [ showPage, setShowPage ] = React.useState(false);

    React.useEffect(() => {
        if ( showPage ) {
            document.querySelector('header').addEventListener('click', (e)=>{
                let page = document.querySelector('.page');
                if ( e.target !== page ) {
                    hidePage();
                }
            });
        }
    });

    const getPage = (id) => {
        setPageID(id);
        setShowPage(true);
    }

    const hidePage = () => {
        document.querySelector('.main').classList.remove('page-slide-in');
        setTimeout(()=>{
            setPageID();
            setShowPage(false);
        }, 400);
    }

    return (
        <main className="main">
            <MainHeader />
            <Stories pageToShow={getPage} pageShown={showPage} />
            { showPage ? <Page id={pageID} /> : null }
            <button className="btn-close" onClick={hidePage}><span>Close</span></button>
        </main>
    )    
}

export default App;