import range from 'lodash/range';

export function returnPaginationRange(totalPage, page) {
  let siblings = 1;
  let totalPageNoInArray = 7;

  if (totalPageNoInArray >= totalPage) {
    return range(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = range(1, leftItemsCount + 1);
    return [...leftRange, '...', totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblings;
    let rightRange = range(totalPage - rightItemCount + 1, totalPage + 1);
    return [1, '...', ...rightRange];
  } else {
    let middleRange = range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, '...', ...middleRange, '...', totalPage];
  }
}
