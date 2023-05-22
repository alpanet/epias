import React from 'react'
import Split from 'react-split'
import '../sass/CustomSplitHorizontal.scss'
import store from "../redux/App/Store";

function CustomSplitHorizontal(props) {

    function resize(sizes) {
        if (props.sequence === "first") {
            store.dispatch({
                type: "UPDATE_FIRST_VERTICAL",
                payload: {
                    size: sizes
                }
            });
        }
        else {
            store.dispatch({
                type: "UPDATE_SECOND_VERTICAL",
                payload: {
                    size: sizes
                }
            });
        }

    }

    return (
        <>
            <Split
                className="splitHorizontal"
                gutterAlign={props.gutterAlign}
                onDragEnd={e => resize(e)}
            >
                <div>{props.grid0}</div>
                <div>{props.grid1}</div>
            </Split>
        </>

    )
}

export default CustomSplitHorizontal