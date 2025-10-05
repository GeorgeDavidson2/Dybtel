import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadState, saveState } from '../lib/storage';


export type Transaction = {
id: string;
date: string; 
type: 'TopUp' | 'Purchase';
amount: number; 
phone?: string;
wardSerialId?: string;
note?: string;
};


export type User = { name: string; email: string; avatarUrl?: string };


export type AppState = {
user: User | null;
balance: number; 
transactions: Transaction[];
};


const initial: AppState = loadState() ?? {
user: null,
balance: 125.5,
transactions: [
{ id: 't1', date: new Date().toISOString(), type: 'TopUp', amount: 25, note: 'Welcome credit' },
],
};


export type Action =
| { type: 'LOGIN'; payload: User }
| { type: 'LOGOUT' }
| { type: 'TOP_UP'; payload: { amount: number; phone: string; email: string; wardSerialId: string } };


function reducer(state: AppState, action: Action): AppState {
switch (action.type) {
case 'LOGIN':
return { ...state, user: action.payload };
case 'LOGOUT':
return { ...state, user: null };
case 'TOP_UP': {
const tx: Transaction = {
id: crypto.randomUUID(),
date: new Date().toISOString(),
type: 'TopUp',
amount: action.payload.amount,
phone: action.payload.phone,
wardSerialId: action.payload.wardSerialId,
note: `Top-up for ${action.payload.phone}`,
};
return {
...state,
balance: state.balance + action.payload.amount,
transactions: [tx, ...state.transactions],
};
}
default:
return state;
}
}


const AppCtx = createContext<{
state: AppState;
dispatch: React.Dispatch<Action>;
}>({} as any);


export function AppProvider({ children }: { children: React.ReactNode }) {
const [state, dispatch] = useReducer(reducer, initial);


useEffect(() => saveState(state), [state]);


const value = useMemo(() => ({ state, dispatch }), [state]);
return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}


export function useApp() {
return useContext(AppCtx);
}