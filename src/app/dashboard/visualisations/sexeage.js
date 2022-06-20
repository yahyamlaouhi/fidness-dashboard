import React, {useRef,useEffect} from 'react';


const {tableau} = window;
function Sexeage(){
    const ref = useRef(null);
    const url = 'https://public.tableau.com/views/sexe-age/SEXE-AGE?:language=fr-FR&:display_count=n&:origin=viz_share_link'
    const initViz = () =>{
        new tableau.Viz(ref.current, url, {
            width:"103%",
            height: "60vh",
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

export default Sexeage;