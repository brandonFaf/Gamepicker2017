import * as types from './actionTypes';
export function hideLoading() {
  return {type:types.HIDE_LOADING};
}
export function showLoading() {
  return {type:types.SHOW_LOADING};
}
