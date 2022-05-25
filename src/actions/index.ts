export interface ApiType<T> {
    get: (id: string) => {data: T};
}

export interface Action<T extends string> {
    type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
    payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? {type} : {type, payload};
}

export const CHANGE_FULL_PRICE = 'CHANGE_FULL_PRICE';
export const CHANGE_PERCENT = 'CHANGE_PERCENT';
export const CHANGE_INITIAL_FEE = 'CHANGE_INITIAL_FEE';
export const CHANGE_YEARS = 'CHANGE_YEARS';

export interface Target {
    target: {
        value: string;
    };
}

export const changeFullPrice = ({target}: Target)  => async dispatch => {
    dispatch({
        type: CHANGE_FULL_PRICE,
        payload: target.value,
    });
};

export const changePercent = ({target}: Target) => async dispatch => {
    dispatch({
        type: CHANGE_PERCENT,
        payload: target.value,
    });
};
export const changeInitialFee = ({target}: Target) => async dispatch => {
    dispatch({
        type: CHANGE_INITIAL_FEE,
        payload: target.value,
    });
};
export const changeYears = (target: any) => async dispatch => {
    dispatch({
        type: CHANGE_YEARS,
        payload: target,
    });
};
