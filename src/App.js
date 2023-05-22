import CustomHeader from "./components/CustomHeader";
import './sass/App.scss';
import store from "./redux/App/Store";
import CustomSplitVertical from "./components/CustomSplitVertical";
import CustomDatatable from "./components/CustomDatatable";
import { useEffect, useState } from "react";

function App() {
  const headersForFirstTable = [
    {
      index: 0,
      name: 'id',
      displayname: 'Id',
      visible: true
    },
    {
      index: 1,
      name: 'kontrat',
      displayname: 'Kontrat',
      visible: true
    },
    {
      index: 2,
      name: 'teklif',
      displayname: 'Teklif',
      visible: true
    },
    {
      index: 3,
      name: 'data',
      displayname: 'Data',
      visible: true
    },
  ];

  const headersForSecondTable = [
    {
      index: 0,
      name: 'detailId',
      displayname: 'detailId',
      visible: true
    },
    {
      index: 1,
      name: 'teklif',
      displayname: 'teklif',
      visible: true
    },
    {
      index: 2,
      name: 'data',
      displayname: 'data',
      visible: true
    },
  ];

  const { epiasFirstData, horizontalWindowValue, firstVerticalWindowValue, secondVerticalWindowValue, epiasDetailData } = store.getState();

  const [epiasTableData, setepiasTableData] = useState()
  const [selectBoxData, setselectBoxData] = useState()
  const [selectedDate, setselectedDate] = useState()
  const [filterData, setfilterData] = useState()
  const [datatableHeader, setdatatableHeader] = useState()
  const [datatableFilterData, setdatatableFilterData] = useState()
  const [episSecondTableData, setepisSecondTableData] = useState(epiasDetailData)

  const [horizontalWindow, sethorizontalWindow] = useState(horizontalWindowValue)
  const [firstVerticalWindow, setfirstVerticalWindow] = useState(firstVerticalWindowValue)
  const [secondVerticalWindow, setsecondVerticalWindow] = useState(secondVerticalWindowValue)

  const [customComponentId, setcustomComponentId] = useState("")
  const [customComponentkontrat, setcustomComponentkontrat] = useState("")
  const [customComponentteklif, setcustomComponentteklif] = useState("")
  const [customComponentdata, setcustomComponentdata] = useState("")



  store.subscribe(() => {
    sethorizontalWindow(store.getState().horizontalWindowValue !== undefined ? store.getState().horizontalWindowValue?.size : undefined)
    setfirstVerticalWindow(store.getState().firstVerticalWindowValue !== undefined ? store.getState().firstVerticalWindowValue?.size : undefined)
    setsecondVerticalWindow(store.getState().secondVerticalWindowValue !== undefined ? store.getState().secondVerticalWindowValue?.size : undefined)
    setepisSecondTableData(store.getState().epiasDetailData)
  });

  useEffect(() => {
    let newList = epiasFirstData.map(x => x.kontrat)

    let uniqueChars = [];
    newList.forEach((element) => {
      if (!uniqueChars.includes(element)) {
        uniqueChars.push(element);
      }
    });
    uniqueChars.unshift("Kontrat Seçiniz")
    setselectBoxData(uniqueChars)


    setepiasTableData(epiasFirstData)
    setdatatableHeader(headersForFirstTable)
    setdatatableFilterData(headersForFirstTable)
  }, [])

  useEffect(() => {
    let filtedArray = epiasFirstData?.filter(x => x.kontrat === selectedDate)
    if (filtedArray.length === 0) {
      setepiasTableData(epiasFirstData)
    }
    else {
      setepiasTableData(filtedArray)
    }

  }, [selectedDate])

  useEffect(() => {
    let visibleDatas = []
    if (filterData !== undefined && filterData.filter(x => x.status === false).length > 0) {
      headersForFirstTable.forEach(elem => {
        if (filterData.filter(x => x.status === false).find(y => y.name === elem.name) === undefined) {
          visibleDatas.push(elem)
        }
      }
      )
      setdatatableHeader(visibleDatas)

      let versionOneArray = []
      filterData !== undefined && filterData.filter(x => x.status === false).forEach(element => {
        if (versionOneArray.length > 0) {
          let tempArray = []
          versionOneArray.forEach(elem => {
            let tempObject = Object.fromEntries(Object.entries(elem).filter(([key]) => key !== element.name))
            tempArray.push(tempObject)
          }
          )
          versionOneArray = []
          versionOneArray = tempArray
        }
        else {
          epiasFirstData.forEach(elem => {
            let tempObject = Object.fromEntries(Object.entries(elem).filter(([key]) => key !== element.name))
            versionOneArray.push(tempObject)
          }
          )
        }

        setepiasTableData(versionOneArray)

      }
      )


    }
    else {
      setdatatableHeader(headersForFirstTable)
      setepiasTableData(epiasFirstData)
    }

  }, [filterData])

  function newItemButtonFunction() {
    let item = {
      detailId: customComponentId,
      teklif: customComponentteklif,
      data: customComponentdata
    }
    store.dispatch({
      type: "ADD_NEW_ITEM",
      payload: item
    });
  }


  const newItemComponent =
    <>
      <div className="customComponentDiv">
        <input type="text" className={"id"} placeholder="no giriniz." onChange={(e) => setcustomComponentId(e.target.value)}></input>
      </div>
      <div className="customComponentDiv">
        <input type="text" className={"kontrat"} placeholder="no giriniz." onChange={(e) => setcustomComponentkontrat(e.target.value)}></input>
      </div>
      <div className="customComponentDiv">
        <input type="text" className={"teklif"} placeholder="no giriniz." onChange={(e) => setcustomComponentteklif(e.target.value)}></input>
      </div>
      <div className="customComponentDiv">
        <input type="text" className={"data"} placeholder="no giriniz." onChange={(e) => setcustomComponentdata(e.target.value)}></input>
      </div>
      <div className="customComponentDiv">
        <input type='button' value={"Kaydet"} onClick={() => newItemButtonFunction()} />
      </div>
    </>

  const grid0 =
    <>
      <div>
        <CustomDatatable
          filter={true}
          headers={datatableHeader}
          data={epiasTableData}
          selectBoxData={selectBoxData}
          filterFunc={(e) => setselectedDate(e)}
          columnFilterData={datatableFilterData}
          onChangeFilterFunc={(e) => setfilterData(e)}
          filtredData={filterData}

        ></CustomDatatable>
      </div>
    </>

  const grid1 =
    <>
      <div className="settings">
        <div className="settingsTextAyarlar">Ayarlar</div>
        <div className="settingsTextAyarlar">
          <div>Yatay Pencere Değerleri</div>
          <div>{horizontalWindow !== undefined ? `%${horizontalWindow?.[0]} %${horizontalWindow?.[1]}` : ``}</div>
        </div>
        <div className="settingsTextAyarlar">
          <div>Üst Dikey Pencere Değerleri</div>
          <div>{firstVerticalWindow !== undefined ? `%${firstVerticalWindow?.[0]} %${firstVerticalWindow?.[1]}` : ``}</div>
        </div>
        <div className="settingsTextAyarlar">
          <div>Alt Dikey Pencere Değerleri</div>
          <div>{secondVerticalWindow !== undefined ? `%${secondVerticalWindow?.[0]} %${secondVerticalWindow?.[1]}` : ``}</div>
        </div>
      </div>
    </>

  const grid2 =
    <>
      <div>
        <CustomDatatable
          filter={true}
          headers={headersForSecondTable}
          data={episSecondTableData}
          noHeader={true}
          noFilter={true}
          newItem={true}
          newItemComponent={newItemComponent}
        ></CustomDatatable>
      </div>
    </>

  const grid3 =
    <>
      <div className="loremIpsum">**Lorem ipsum**</div>
    </>

  return (
    <>
      <CustomHeader></CustomHeader>
      <div className='container'>
        <CustomSplitVertical grid0={grid0} grid1={grid1} grid2={grid2} grid3={grid3}></CustomSplitVertical>
      </div>
    </>
  );
}

export default App;
