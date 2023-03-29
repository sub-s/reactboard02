import React, { useEffect, useState } from "react";
import Loading from "../../Components/Inc/Loading";
import {BoardHook as Hook} from "../../Hook/BoardHook";

const BoardList = (props) => {


  const {isLoading, error, data} = Hook.ListHook()

  // 게시판 타이틀
  const title = [{No:"No.", title:"제목", name:"이름", data: "날짜", read: "읽음" }];
  const titleItems = title.map((item, index) => (
      <tr key={index}>
        <th>{item.No}</th>
        <th>{item.title}</th>
        <th>{item.name}</th>
        <th>{item.data}</th>
        <th>{item.read}</th>
      </tr>
  ));

  return (
    <>
      { isLoading && <Loading /> }
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
                  <thead>
                    {titleItems}
                  </thead>
                  <tbody>
                  {data.list && data.list.map((item)=>(
                      <tr key={item.brdNo}>
                        <td>{item.brdNum}</td>
                        <td>{item.brdTitle}</td>
                        <td>{item.brdName}</td>
                        <td>{item.regDate}</td>
                        <td>{item.viewCnt}</td>
                      </tr>
                  ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5">
                        <ul className="pagination float-right">
                          <li className="footable-page-arrow disabled">
                            <a data-page="first" href="#first">
                              «
                            </a>
                          </li>
                          <li className="footable-page-arrow disabled">
                            <a data-page="prev" href="#prev">
                              ‹
                            </a>
                          </li>
                          <li className="footable-page active">
                            <a data-page="0" href="#">
                              1
                            </a>
                          </li>
                          <li className="footable-page">
                            <a data-page="1" href="#">
                              2
                            </a>
                          </li>
                          <li className="footable-page">
                            <a data-page="2" href="#">
                              3
                            </a>
                          </li>
                          <li className="footable-page">
                            <a data-page="3" href="#">
                              4
                            </a>
                          </li>
                          <li className="footable-page">
                            <a data-page="4" href="#">
                              5
                            </a>
                          </li>
                          <li className="footable-page-arrow">
                            <a data-page="next" href="#next">
                              ›
                            </a>
                          </li>
                          <li className="footable-page-arrow">
                            <a data-page="last" href="#last">
                              »
                            </a>
                          </li>
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
