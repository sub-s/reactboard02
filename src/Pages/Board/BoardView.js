import React, { useEffect, useState } from "react";
import Loading from "../../Components/Inc/Loading";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BoardHook as Hook } from "../../Hook/BoardHook";


import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';


// 환경 변수 셋팅
const API_URL = process.env.REACT_APP_API_URI;

const BoardView = (props) => {
  const { brdNo } = useParams(); // 파라미터로 받은 값을 셋팅
  const navigate = useNavigate();
  const { isLoading, data } = Hook.ViewHook(brdNo);

  // 페이지 삭제
  const PageRemove = (brdNo) => {
    // 게시글 삭제시 컨펌창
    if (window.confirm("삭제 하시겠습니까?")) {
      if (brdNo) {
        let param = {
          brdNo: brdNo,
          delYn: "Y",
        };
        axios
          .post(`${API_URL}board/boardApiDelete`, param)
          .then((res) => {
            let data = res.data;
            if (data.code === "0000") {
              alert(data.msg);
              navigate("/BoardList");
            }
          })
          .catch((error) => {
            console.log("Error");
          });
      }
    }
  };

  // 댓글 초기 세팅
  const [comment, setComment] = useState({
    commentAdd: "Y",
    cmName: "",
    replyText: "",
  });

  const [commentList, setCommentList] = useState("");

  // 코멘트 입력
  const receiveText = (e) => {
    const { name, value } = e.target;
    console.log(e.target , "e.target")
    setComment({
      ...comment,
      [name]: value,
    });
  };

  // Comment Handle
  const commentHandle = (brdNo) => {
    let error = replyValidate(comment);

  };


  // 댓글 벨리데이터
  const replyValidate = (comment) => {
    let error = {};
    if (!comment.cmName) {
      error.replyText = "텍스트를 입력하세요.";
      alert("사용자명 작성하세요.");
    }
    if (!comment.replyText) {
      error.replyText = "텍스트를 입력하세요.";
      alert("텍스트를 입력하세요.");
    }
    return error;
  };


  return (
    <div className={"wrapper-content"}>
      {isLoading && <Loading />}
      {data && (
        <div className="row">
          <div className="col-lg-12">
            <div className="mail-box-header">
              <div className="float-right tooltip-demo">
                {/* 게시글 삭제이벤트 */}
                <Link
                  className="btn btn-white btn-sm"
                  title="삭제"
                  data-original-title="Move to trash"
                  onClick={() => PageRemove(data.brdNo)}
                >
                  <i className="fa fa-trash-o"></i>
                </Link>
              </div>
              <h2>
                <p>게시판 상세</p>
              </h2>
              <div className="mail-tools tooltip-demo m-t-md">
                <h3>
                  <span className="font-normal">제목: </span>
                  {data.brdTitle}
                </h3>
                <h5>
                  <span className="float-right font-normal">
                    {data.regDate}
                  </span>
                  <span className="font-normal">이름: </span>
                  {data.brdName}
                </h5>
              </div>
            </div>

            <div className="mail-box">
              {/* 본문내용 */}
              <div className="mail-body">
                <Viewer initialValue={data.brdContents || ''} />;
                {/*<p*/}
                {/*  dangerouslySetInnerHTML={{*/}
                {/*    __html: data.brdContents,*/}
                {/*  }}*/}
                {/*></p>*/}
              </div>
              <div className="mail-attachment">
                <p>
                  <span>
                    <i className="fa fa-paperclip"></i> 2 attachments -
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
        </div>
      )}

      <div className="row">
        <div className="col-lg-12">
          <div className="ibox ">
            <div className="ibox-title">
              <h5>
                댓글
                <small> 바른말 고운말 사용합시다.</small>
              </h5>
            </div>

            <div>
              <div className="ibox-content">
                <div className="form-group  row">
                  <label className="col-sm-2 col-form-label">이름</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name={"cmName"}
                      onChange={receiveText}
                    />
                  </div>
                  <div className="hr-line-dashed"></div>
                </div>
                <div className="form-group  row">
                  <label className="col-sm-2 col-form-label">댓글</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name={"replyText"}
                      onChange={receiveText}
                    />
                  </div>
                  <div className="hr-line-dashed"></div>
                </div>
                <div className="mail-body text-right tooltip-demo">
                  <button
                    title=""
                    data-placement="top"
                    data-toggle="tooltip"
                    type="button"
                    data-original-title="Print"
                    className="btn btn-sm btn-white"
                    onClick={(e)=> commentHandle()}
                  >
                    <i className="fa fa-reply"></i> 등록
                  </button>

                </div>
              </div>

              <div className="ibox-content">
                <h2>This is simple box container nr. 3</h2>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
