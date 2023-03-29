import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({
  total,
  pageSize,
  pageNum,
  paginate,
  navigatePages,
  startRow,
  endRow,
}) => {
  // 페이지 리스트 푸시 처리
  const PageNumbers = [];
  let PageCount = parseInt((total - 1) / pageSize) + 1;
  //let PageCount parseInt( (전체 게시글 수 - 1 ) / 화면에 노출해줄 게시글 수 ) + 1;

  // 이전 블럭 구하기 공식
  let StartPage = parseInt((pageNum - 1) / pageSize) * pageSize + 1;

  // 다음 블럭 구하기 공식
  let EndPage = parseInt((pageNum - 1) / pageSize) * pageSize + pageSize;

  // 마지막 페이지 처리
  if (PageCount < EndPage) {
    EndPage = PageCount;
  }
  // 페이지 푸시 처리
  for (let i = StartPage; i <= EndPage; i++) {
    PageNumbers.push(i);
  }

  return (
    <>
      {/* 페이징 처리 */}
      <ul className="pagination float-right">
        {StartPage - pageSize >= 1 ? (
          <li className="footable-page-arrow">
            <Link
              onClick={() => paginate(StartPage - pageSize, pageSize)}
            >
              처음
            </Link>
          </li>
        ) : (
          <li className="footable-page-arrow disabled">
            <Link>처음</Link>
          </li>
        )}
        {
          //이전 1개
          pageNum - 1 >= 1 ? (
            <li className="footable-page-arrow">
              <Link
                onClick={(e) => {
                  paginate(pageNum - 1, pageSize);
                }}
              >
                이전
              </Link>
            </li>
          ) : (
            <li className="footable-page-arrow disabled">
              <Link>이전</Link>
            </li>
          )
        }

        {PageNumbers &&
          PageNumbers.map((num) => (
            <li
              className={
                pageNum === num ? "footable-page active" : "footable-page"
              }
              key={num}
            >
              <Link onClick={() => paginate(num, pageSize)}>{num}</Link>
            </li>
          ))}

        {
          //다음 1개
          PageCount > pageNum ? (
            <li className="footable-page-arrow">
              <Link
                className="page-link"
                onClick={(e) => {
                  paginate(pageNum + 1, pageSize);
                }}
              >
                다음
              </Link>
            </li>
          ) : (
            <li className="footable-page-arrow disabled">
              <Link>다음</Link>
            </li>
          )
        }

        {StartPage + pageSize <= PageCount ? (
          <li className="footable-page-arrow">
            <Link
              onClick={(e) => {
                paginate(StartPage + pageSize, pageSize);
              }}
            >
              끝
            </Link>
          </li>
        ) : (
          <li className="footable-page-arrow disabled">
            <Link>끝</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Paginate;
