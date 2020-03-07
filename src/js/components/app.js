import React from 'react';
import { vars } from '../base/variables.js';
import MainHeader from '../elements/mainheader.js';
import News from './stories.js';
import Page from './page.js';

function App(props) {

    React.useEffect(() => {
    }, []);

    return (
        <div className="main">
            <MainHeader />
            <News />
            <Page />
        </div>
    )    
}

export default App;