import React, {useRef,useEffect} from 'react';


const {tableau} = window;
function Pays(){
    const ref = useRef(null);
    const url = 'https://public.tableau.com/shared/6W9QGH2H5?:display_count=n&:origin=viz_share_link'
    const initViz = () =>{
        new tableau.Viz(ref.current, url, {
            width:"100%",
            height: "100vh",
        })
    }

    useEffect(initViz,[]);
    return(
        <div>
            <div ref={ref}>

            </div>
        </div>
    )
}

export default Pays;