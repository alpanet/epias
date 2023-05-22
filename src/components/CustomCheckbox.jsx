import React, { useEffect, useState } from 'react'
import '../sass/CustomCheckbox.scss'

function CustomCheckbox(props) {

    const [status, setstatus] = useState(props.visible)

    useEffect(() => {
        if (props.filtredData !== undefined) {
            props.onChangeFilterFunc([...props.filtredData.filter(x=> x.name !== props.name), { 'name': props.name, 'status': status }])
        }
        else {
            props.onChangeFilterFunc([{ 'name': props.name, 'status': status }])
        }
    }, [status])


    return (
        <div className='customCheckboxMain'>
            <div><input type="checkbox" checked={status} onChange={evnt => setstatus(evnt.target.checked)} /></div>
            <div>{props.name}</div>
        </div>
    )
}

export default CustomCheckbox