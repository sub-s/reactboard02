import React, { useEffect, useState } from "react";
import Loading from "../../Components/Inc/Loading";
import { useParams } from "react-router-dom";
import axios from "axios";

const BoardView = (props) => {
  const API_URL = process.env.REACT_APP_API_URI;

  const { brdNo } = useParams(); // 파라미터로 받은 값을 셋팅
  console.log(brdNo, "클릭을 해서 받은 brdNo 값");
  const [dataDetail, setDataDetail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}board/boardApiView?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
      .then((res) => {
        let data = res.data.list;
        setDataDetail(data);
        console.log(res);
      })
      .catch((e) => {
        console.log("1");
      });
  }, []);

  return (
    <div className={'wrapper-content'}>
      {isLoading && <Loading />}
      {dataDetail && (
        <div>
          <div className="mail-box-header">
            <div className="float-right tooltip-demo">
              <a
                href="mail_compose.html"
                className="btn btn-white btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="Reply"
              >
                <i className="fa fa-reply"></i> Reply
              </a>
              <a
                href="#"
                className="btn btn-white btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="Print email"
              >
                <i className="fa fa-print"></i>{" "}
              </a>
              <a
                href="mailbox.html"
                className="btn btn-white btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Move to trash"
              >
                <i className="fa fa-trash-o"></i>{" "}
              </a>
            </div>
            <h2>
              <p>게시판 상세</p>
            </h2>
            <div className="mail-tools tooltip-demo m-t-md">
              <h3>
                <span className="font-normal">Subject: </span>
                {dataDetail.brdTitle}
              </h3>
              <h5>
                <span className="float-right font-normal">
                  {dataDetail.regDate}
                </span>
                <span className="font-normal">From: </span>
                {dataDetail.brdName}
              </h5>
            </div>
          </div>

          <div className="mail-box">
            {/*본문내용*/}
            <div className="mail-body">
              <p
                dangerouslySetInnerHTML={{
                  __html: dataDetail.brdContents,
                }}
              ></p>
            </div>
            <div className="mail-attachment">
              <p>
                <span>
                  <i className="fa fa-paperclip"></i> 2 attachments -{" "}
                </span>
                <a href="#">Download all</a>|<a href="#">View all images</a>
              </p>

              <div className="attachment">
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="fa fa-file"></i>
                      </div>
                      <div className="file-name">
                        Document_2014.doc
                        <br />
                        <small>Added: Jan 11, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img
                          alt="image"
                          className="img-fluid"
                          src="img/p1.jpg"
                        />
                      </div>
                      <div className="file-name">
                        Italy street.jpg
                        <br />
                        <small>Added: Jan 6, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img
                          alt="image"
                          className="img-fluid"
                          src="img/p2.jpg"
                        />
                      </div>
                      <div className="file-name">
                        My feel.png
                        <br />
                        <small>Added: Jan 7, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="mail-body text-right tooltip-demo">
              <a className="btn btn-sm btn-white" href="mail_compose.html">
                <i className="fa fa-reply"></i> Reply
              </a>
              <a className="btn btn-sm btn-white" href="mail_compose.html">
                <i className="fa fa-arrow-right"></i> Forward
              </a>
              <button
                title=""
                data-placement="top"
                data-toggle="tooltip"
                type="button"
                data-original-title="Print"
                className="btn btn-sm btn-white"
              >
                <i className="fa fa-print"></i> Print
              </button>
              <button
                title=""
                data-placement="top"
                data-toggle="tooltip"
                data-original-title="Trash"
                className="btn btn-sm btn-white"
              >
                <i className="fa fa-trash-o"></i> Remove
              </button>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardView;
