import * as types from './actionTypes';
export function savePick(game, teamName) {
  return {type:types.SAVE_PICK, game, teamName};
}
