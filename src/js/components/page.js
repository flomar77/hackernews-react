import React from 'react';
import { vars } from '../base/variables.js';
import Story from '../elements/story.js';

function Page(props) {

    let [ hideClass, setHideClass ] = React.useState(false);
    React.useEffect(() => {
    }, []);

    const hideThePage() {
        setHideClass(true);
        props.hidePage();
    }

    return (
        <div className={hideClass ? 'page slide-out' : 'page' } id={props.id}>
            <button onClick={hideThePage()}>Close</button>
            <header className="page-header">
                <Story id={props.id}/>
            </header>
        </div>
    )    
}

export default Page;