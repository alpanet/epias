import React from 'react'

function CustomSelect(props) {
    return (
        <div>
            <select onChange={evnt => props.onChangeFunc(evnt.target.value)}>
                {
                    props.data?.map(
                        x => (
                            <option value={x}>{x}</option>
                        )
                    )
                }

            </select>
        </div>
    )
}

export default CustomSelect