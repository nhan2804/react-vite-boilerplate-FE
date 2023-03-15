export const array2Object = (arr, key) => {
  return arr?.reduce((all, cur) => {
    all[cur?.[key]] = cur;
    return all;
  }, {});
};
