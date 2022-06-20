import React, {useRef,useEffect} from 'react';

const {tableau} = window;
function TableauReact(){
    const ref = useRef(null);
    const url = 'https://public.tableau.com/views/sexe_16553075468650/Distributiondesexeselonlapopulation'
    const initViz = () =>{
        new tableau.Viz(ref.current, url, {
            width:"103%",
            height: "70vh", 
            hideTabs: true,
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

export default TableauReact;
