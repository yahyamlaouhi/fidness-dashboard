import React, {useRef,useEffect} from 'react';


const {tableau} = window;
function Age(){
    const ref = useRef(null);
    const url = 'https://public.tableau.com/views/fidness/distributiondageenfonctiondepopulation?:language=fr-FR&:display_count=n&:origin=viz_share_link'
    const initViz = () =>{
        new tableau.Viz(ref.current, url, {
            width:"103%",
            height: "70vh",
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

export default Age;