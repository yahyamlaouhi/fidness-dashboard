import React, {useRef,useEffect} from 'react';


const {tableau} = window;
function Partnerage(){
    const ref = useRef(null);
    const url = 'https://public.tableau.com/views/ageperpartner/fidelite2?:embed=no&:customViews=no'
    const initViz = () =>{
        new tableau.Viz(ref.current, url, {
            width:"100%",
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

export default Partnerage;