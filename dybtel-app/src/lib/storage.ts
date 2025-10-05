import type { AppState } from '../state/AppContext';
const KEY = 'dybtel-app-state';
export const loadState = (): AppState | null => {
try {
const s = localStorage.getItem(KEY);
return s ? (JSON.parse(s) as AppState) : null;
} catch {
return null;
}
};
export const saveState = (state: AppState) => {
try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
};