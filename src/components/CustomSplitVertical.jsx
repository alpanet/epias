import React from 'react'
import Split from 'react-split'
import '../sass/CustomSplitVertical.scss'
import CustomSplitHorizontal from './CustomSplitHorizontal'
import store from "../redux/App/Store";

function CustomSplitVertical(props) {

    function resize(sizes) {
        store.dispatch({
            type: "UPDATE_HORIZONTAL",
            payload: {
                size: sizes
            }
        });
    }

    return (
        <>
            <Split
                className="splitVertical"
                direction="vertical"
                onDragEnd={e => resize(e)}
            >
                <div><CustomSplitHorizontal grid0={props.grid0} grid1={props.grid1} gutterAlign="end" sequence={"first"}></CustomSplitHorizontal></div>
                <div><CustomSplitHorizontal grid0={props.grid2} grid1={props.grid3} sequence={"second"}></CustomSplitHorizontal></div>
            </Split>
        </>

    )
}

export default CustomSplitVertical