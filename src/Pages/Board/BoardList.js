import React, { useEffect, useState } from "react";
import { BoardHook as Hook } from "../../Hook/BoardHook";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Inc/Loading";
import Paginate from "../../Components/Paginate/Paginate";
import TopSearch from "../../Components/TopSearch/TopSearch";
const BoardList = (props) => {
  const navigate = useNavigate();

  // 검색 기준으로 페이징을 생성 하고 searchValue 값을 hook으로 넘긴다.
  const [searchValue, setSearchValue] = useState({
    // 기본 셋팅 값을 설정
    pageNum: 1, // 현재 페이지
    pageSize: 10, // 화면에 노출할 개수
    searchType: "all", // 검색 조건
    searchText: "", // 검색어
  });

  const { isLoading, error, data } = Hook.ListHook(searchValue);

  // 상세 페이지 이동하기
  const LinkMove = (url) => {
    navigate(url);
  };

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
      <tr key={item.brdNo} onClick={() => LinkMove(`/BoardView/${item.brdNo}`)}>
        <td>{item.brdNum}</td>
        <td>{item.brdTitle}</td>
        <td>{item.brdName}</td>
        <td>{item.regDate}</td>
        <td>{item.viewCnt}</td>
      </tr>
    ));

  // 페이징 함수
  const paginate = (pageNum, pageSize) => {
    setSearchValue({
      ...searchValue,
      pageNum: pageNum,
      pageSize: pageSize,
      // searchYn: "Y",
    });
  };

  // 검색 버튼
  const SearchBtn = () => {
    let searchType = document.getElementById("searchType");
    setSearchValue({
      ...searchValue,

      // 검색 버튼을 눌렀을때, 텍스트 값, 타입 값을 받아서 전달
      searchText: document.getElementById("searchText").value,
      searchType: searchType.options[document.getElementById("searchType").selectedIndex].value,
    });
  };


  const WriteBtn = (url) => {
    navigate(url);
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className={"wrapper wrapper-content animated fadeInRight ecommerce"}>
        {/*검색 영역 */}
        <TopSearch
            event={SearchBtn}
        />

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
                        <td style={{height: '300px', verticalAlign:'middle', textAlign:'center' }} colSpan={5}>
                          <span>데이터가 없습니다.</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5">
                        {/* 페이지 */}
                        <Paginate
                          total={data.total}
                          pageSize={data.pageSize}
                          pageNum={data.pageNum}
                          navigatePages={data.navigatePages}
                          startRow={data.navigateFirstPage}
                          endRow={data.navigateLastPage}
                          paginate={paginate}
                        />
                        <button type="button" className="btn btn-primary float-right"
                          onClick={()=> WriteBtn(`/BoardWrite`)}
                        >
                          글쓰기
                        </button>
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
