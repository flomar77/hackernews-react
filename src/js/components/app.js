import React from 'react';
import { vars } from '../base/variables.js';
import MainHeader from '../elements/mainheader.js';
import Stories from './stories.js';
import Page from './page.js';

function App(props) {

    React.useEffect(() => {
    }, []);

    return (
        <div className="main">
            <MainHeader />
            <Stories />
            <Page />
        </div>
    )    
}

export default App;