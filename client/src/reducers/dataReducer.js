export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return state;
    case 'UPDATE_DATA':
      return state;
    case 'SHARD_DATA':
      return state;
    default:
      return state;
  }
};
