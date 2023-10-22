export function renderPagination(currentPage, array) {
  return `
    <ul class="pagination">
      ${array
        .map(
          value => `
          <li class="page-item">
            <a class="page-link js-page-link ${
              currentPage === value ? 'active' : ''
            }" data-page=${value}>${value}</a>
          </li>
        `
        )
        .join('')}
    </ul>
  `;
}
