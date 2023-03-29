import React, { useEffect, useState } from "react";
import Loading from "../../Components/Inc/Loading";
import { BoardHook as Hook } from "../../Hook/BoardHook";
import { Link } from "react-router-dom";

const BoardList = (props) => {
  // 검색 기준으로 페이징을 생성 하고 searchValue 값을 hook으로 넘긴다.
  const [searchValue, setSearchValue] = useState({
    // 기본 셋팅 값을 설정
    pageNum: 1, // 현재 페이지
    pageSize: 10, // 화면에 노출할 개수
    searchYn: "Y", // 검색 여부
    searchType: "all", // 검색 조건
    searchText: "", // 검색어
  });

  const { isLoading, error, data } = Hook.ListHook(searchValue);
  // 게시판 타이틀
  const title = [
    { No: "No.", title: "제목", name: "이름", data: "날짜", read: "읽음" },
  ];
  // 게시판 타이틀
  const titleItems =
    title &&
    title.map((item, index) => (
      <tr key={index}>
        <th>{item.No}</th>
        <th>{item.title}</th>
        <th>{item.name}</th>
        <th>{item.data}</th>
        <th>{item.read}</th>
      </tr>
    ));
  // 리스트 데이터
  const listData =
    data.list &&
    data.list.map((item, index) => (
      <tr key={item.brdNo}>
        <td>{item.brdNum}</td>
        <td>{item.brdTitle}</td>
        <td>{item.brdName}</td>
        <td>{item.regDate}</td>
        <td>{item.viewCnt}</td>
      </tr>
    ));

  // 페이지 리스트 푸시 처리
  const PageNumbers = [];
  let PageCount = parseInt((data.total - 1) / data.pageSize) + 1;
  //let PageCount parseInt( (전체 게시글 수 - 1 ) / 화면에 노출해줄 게시글 수 ) + 1;

  console.log('PageCount::::::::::::::::',PageCount);
  // 이전 블럭 구하기 공식
  let StartPage = parseInt((data.pageNum - 1) / data.pageSize) * data.pageSize + 1;

  // 다음 블럭 구하기 공식
  let EndPage = parseInt((data.pageNum - 1) / data.pageSize) * data.pageSize + data.pageSize;

  // 마지막 페이지 처리
  if(PageCount < EndPage){
    EndPage = PageCount;
  }
  console.log('PageCount',PageCount);
  // console.log(StartPage, EndPage);
  console.log("Start", StartPage - data.pageSize);
  console.log("End", StartPage + data.pageSize);

  for (let i = StartPage; i <= (EndPage); i++) {
    PageNumbers.push(i);
  }

  // 페이지 처리
  const paginate = (pageNum, pageSize) => {
    console.log(pageNum, pageSize, "'''''''''''''''''''''''");
    setSearchValue({
      ...searchValue,
      pageNum: pageNum,
      pageSize: pageSize,
      searchYn: "Y",
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={"wrapper wrapper-content animated fadeInRight ecommerce"}>
        {/*검색 영역 */}
        <div className="ibox-content m-b-sm border-bottom">
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label" htmlFor="product_name">
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  placeholder="Product Name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label className="col-form-label" htmlFor="price">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Price"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label className="col-form-label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label className="col-form-label">Status</label>
                <select name="status" id="status" className="form-control">
                  <option value="1">Enabled</option>
                  <option value="0">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/*리스트 영역 */}
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox ">
              <div className="ibox-title">
                <h5>게시판 리스트 입니다.</h5>
                <div className="ibox-tools">
                  <a className="collapse-link">
                    <i className="fa fa-chevron-up"></i>
                  </a>
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i className="fa fa-wrench"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                    <li>
                      <a href="#" className="dropdown-item">
                        Config option 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Config option 2
                      </a>
                    </li>
                  </ul>
                  <a className="close-link">
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
              <div className="ibox-content">
                <table className="footable table table-stripped toggle-arrow-tiny">
                  <thead>{titleItems}</thead>
                  <tbody>
                    {data.total > 0 && listData ? (
                      listData
                    ) : (
                      <tr>
                        <td colSpan={5}> 데이터가 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5">
                        {/* 페이징 처리 */}
                        <ul className="pagination float-right">
                          {StartPage - data.pageSize >= 1 ? (
                            <li className="footable-page-arrow">
                              <Link
                                onClick={() =>
                                  paginate(
                                    StartPage - data.pageSize,
                                    data.pageSize
                                  )
                                }
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
                            data.pageNum - 1 >= 1 ? (
                              <li className="footable-page-arrow">
                                <Link
                                  onClick={(e) => {
                                    paginate(data.pageNum - 1, data.pageSize);
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
                                  data.pageNum === num
                                    ? "footable-page active"
                                    : "footable-page"
                                }
                                key={num}
                              >
                                <Link
                                  onClick={() => paginate(num, data.pageSize)}
                                >
                                  {num}
                                </Link>
                              </li>
                            ))}

                          {
                            //다음 1개
                            PageCount > data.pageNum ? (
                              <li className="footable-page-arrow">
                                <Link
                                  className="page-link"
                                  onClick={(e) => {
                                    paginate(data.pageNum + 1, data.pageSize);
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

                          {StartPage + data.pageSize <= PageCount ? (
                            <li className="footable-page-arrow">
                              <Link
                                onClick={(e) => {
                                  paginate(
                                    StartPage + data.pageSize,
                                    data.pageSize
                                  );
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
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardList;
