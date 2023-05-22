import { createStore } from "redux";

const initialState = {

    epiasFirstData: [
        {
            id: 1,
            kontrat: '2019',
            teklif: '78125',
            data: 'Alış'
        },
        {
            id: 2,
            kontrat: '2019',
            teklif: '78125',
            data: 'Satış'
        },
        {
            id: 3,
            kontrat: '2019',
            teklif: '1485',
            data: 'Satış'
        },
        {
            id: 4,
            kontrat: '2018',
            teklif: '12444',
            data: 'Satış'
        },
        {
            id: 5,
            kontrat: '2018',
            teklif: '255',
            data: 'Alış'
        },
    ],
    epiasDetailData: [
        {
            detailId: 'ABC12345',
            teklif: '254',
            data: 'Alış'
        },
        {
            detailId: 'DEF56789',
            teklif: '6448',
            data: 'Satış'
        },
        {
            detailId: 'GHI45678',
            teklif: '5020',
            data: 'Satış'
        },
    ],
    horizontalWindowValue: undefined,
    firstVerticalWindowValue: undefined,
    secondVerticalWindowValue: undefined,

};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW_ITEM":
            return {
                ...state,
                epiasDetailData: [...state.epiasDetailData, action.payload]
            };
        case "UPDATE_HORIZONTAL":
            return { ...state, horizontalWindowValue: action.payload }
        case "UPDATE_FIRST_VERTICAL":
            return { ...state, firstVerticalWindowValue: action.payload };
        case "UPDATE_SECOND_VERTICAL":
            return { ...state, secondVerticalWindowValue: action.payload };

        default:
            return state;
    }
};

export default createStore(commentsReducer);
