import propTypes, { number } from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
  // prev, next로 나눈 페이지에서 몇 번째 블록에 있는지
  const currentSet = Math.ceil(currentPage / limit);
  // next, prev 사이에서 첫 start 숫자
  const startPage = limit * (currentSet - 1) + 1;
  const lastSet = Math.ceil(numberOfPages / limit);
  // 세트당 보여줘야할 페이지 (원래는 기본 limit=5페이지)
  const numberOfPageForSet =
    currentSet === lastSet && numberOfPages % limit !== 0
      ? numberOfPages % limit
      : limit;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {currentSet !== 1 && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              onClick={() => onClick(startPage - limit)}
            >
              Prev
            </div>
          </li>
        )}

        {Array(numberOfPageForSet)
          .fill(startPage)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <div
                  className="page-link cursor-pointer"
                  onClick={() => {
                    onClick(pageNumber);
                  }}
                >
                  {pageNumber}
                </div>
              </li>
            );
          })}

        {currentSet !== lastSet && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              onClick={() => onClick(startPage + limit)}
            >
              Next
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
  limit: propTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5,
};

export default Pagination;
