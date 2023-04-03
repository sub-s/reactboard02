import React, {useEffect, useState} from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

import styled from "styled-components";
import axios from "axios";

const BoardWrite = (props) => {

  //env 환경 변수 선언
  const API_URL = process.env.REACT_APP_API_URI;

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // error state
  const [error, setError] = useState(false);

  // 글쓰기 완료 후 이벤트 처리
  const [isResult, setResult] = useState(false);

  // ## 00. CK 에디터를 이용할 경우 초기 세팅 값을 설정 한다.
  const [contents, setContents] = useState("");


  // 1. 서버에 전송 할 데이터 값을 셋팅
  // 각 인풋에 name 맞추고..
  const [dataValue, setDataValue] = useState({
    brdNo: "",
    brdTitle: "",
    brdName: "",
    brdContents: "",
    saveEvent: 'N'
  });

  useEffect(()=>{
    if(dataValue.saveEvent === 'Y'){

      axios
          .post(API_URL + "board/modifyBoardApi", dataValue)
          .then((res) => {
            let data = res.data;
            if (data.code === "0000") {
              console.log("성공");
            } else {
              setError(true);
              // alert(res.data.msg);
            }
          })
          .catch((error) => {
            // setError(true);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          })
          .finally(() => {
            setIsLoading(false);
            dataValue["saveEvent"] = 'N'
          });
    }

  }, [dataValue.saveEvent])



  const TextReceive = (e) => {
    const {name, value} = e.target;
    console.log(name, value, ":::::::::::::::::")
    setDataValue({
      ...dataValue,
      [name]: value,
    })
  }


  const saveBtn = () => {
    let error = validate(dataValue)

    console.log(error, "errorerrorerror")
    if(Object.keys(error).length === 0) {
      setDataValue({
        ...dataValue,
        brdContents: contents,
        saveEvent: 'Y'
      });
      // if(dataValue.saveEvent === true){
      //   PostSave()
      // }

    }
  }


  const validate = (dataValue) => {
    let error = {};

    console.log(dataValue , "dataValue")

    if (!dataValue.brdTitle) {
      error.brdTitle = "제목을 입력하세요.";
      alert('제목을 입력하세요.')
      return error;
    }

    if (!dataValue.brdName) {
      error.brdName = "작성자 이름을 입력 하세요.";
      alert('작성자 이름을 입력 하세요.')
      return error;
    }

    if (!contents) {
      error.brdContents = "내용을 입력 하세요.";
      alert('내용을 입력 하세요.')
      return error;
    }
    return error;
  }

  return (
    <EditorArea>
      <div className={"tabs-container"}>
        <div className="panel-body">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Name:</label>
            <div className="col-sm-10">
              <input
                type="text"
                name={'brdName'}
                className="form-control"
                placeholder="작성자"
                onChange={TextReceive}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Title:</label>
            <div className="col-sm-10">
              <input
                type="text"
                name={'brdTitle'}
                className="form-control"
                placeholder="제목"
                onChange={TextReceive}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Description:</label>
            <div className="col-sm-10">
              <div className="summernote">
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>텍스트 입력</p>"
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setContents(data);
                  }}
                  // onBlur={(event, editor) => {
                  //   console.log("Blur.", editor);
                  // }}
                  // onFocus={(event, editor) => {
                  //   console.log("Focus.", editor);
                  // }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                type="button"
                className="btn btn-outline btn-primary float-right ml-1"
              >
                목록
              </button>
              <button type="button" className="btn btn-primary float-right" onClick={
                ()=> saveBtn()
              }>
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </EditorArea>
  );
};

export default BoardWrite;

const EditorArea = styled.div`
  padding: 20px 10px 40px;
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 600px;
    margin-bottom: 30px;
  }

  /* 툴박스 */
  .ck.ck-toolbar.ck-toolbar_grouping {
    width: 100%;
  }

  /* 입력내용이 짧고 행이 길어지면 자동으로 텍스트입력태그 가로넓이가 줄어들기 때문에 고정 */
  .ck-editor__editable_inline {
    width: 100%;
  }
`;
