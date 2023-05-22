import React, { useState } from 'react'
import '../sass/CustomDatatable.scss';
import CustomSelect from './CustomSelect';
import CustomCheckbox from './CustomCheckbox';

function CustomDatatable(props) {

    const [filterAreaVisibilityStatus, setfilterAreaVisibilityStatus] = useState("hidden")
    const [newItemAreaVisiblity, setnewItemAreaVisiblity] = useState(false)

    return (
        <>
            {
                props.noFilter !== true ?
                    <div>
                        <div className='selectBox'>
                            <div className='selectItem'>
                                <CustomSelect data={props.selectBoxData} onChangeFunc={props.filterFunc}></CustomSelect>
                            </div>
                            <div className='customDatatableBlankCol'></div>
                            <div className='filterAreaDiv'>
                                <div className='filterArea' style={{ visibility: filterAreaVisibilityStatus }}>
                                    {
                                        props.columnFilterData?.map(x =>
                                            <CustomCheckbox name={x.name} visible={x.visible} onChangeFilterFunc={props.onChangeFilterFunc} filtredData={props.filtredData}></CustomCheckbox>)
                                    }
                                </div>
                            </div>
                            <div className='customDatatableIcon'><img src={'/export.svg'} className='exportIcon' alt='Logo'></img></div>
                            <div className='customDatatableIcon'><img src={'/gear.svg'} className='gearIcon' alt='Logo'></img></div>
                            <div className='customDatatableIcon'><img src={'/plus.svg'} className='plusIcon' alt='Logo' onClick={() => setfilterAreaVisibilityStatus(filterAreaVisibilityStatus === "hidden" ? "visible" : "hidden")}></img></div>

                        </div>
                    </div> : <></>}

            {
                props.noHeader !== true ?
                    <div className='dataTableHeader'>
                        {
                            props.headers?.map(x =>
                                <div>
                                    {x.displayname}
                                </div>
                            )
                        }
                    </div> : <></>}
            <div className='dataTableContent'>
                {
                    props.data?.map(rowData => {
                        let items = Object.entries(rowData).map(([key, value]) => ({ key, value }))
                        return (
                            <div className='dataTableRow'>
                                {items.map(detail => {
                                    return (<>

                                        <div className={detail.key}>{detail.value}</div>

                                    </>)
                                })}
                            </div>
                        )
                    }
                    )
                }
                {
                    props.newItem === true ?
                        <div className='newItemArea'>
                            <div className='newItemRow'></div>
                            {newItemAreaVisiblity === true ?
                                <div className='componentArea'>
                                    {props.newItemComponent}
                                </div>
                                : <></>}

                            <div className='buttonArea'>
                                <input type='button' value={"Yeni Ekle"} onClick={() => setnewItemAreaVisiblity(true)} />
                            </div>
                        </div> : <></>
                }
            </div>

        </>
    )
}

export default CustomDatatable