import React from 'react';

const TopSearch = (props) => {

    return (
        <>
            <div className="ibox-content m-b-sm border-bottom">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="searchText"
                                id="searchText"
                                placeholder="검색어"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <select
                                name="searchType"
                                id="searchType"
                                className="form-control"
                            >
                                <option value="선택하세요">선택하세요</option>
                                <option value="title">제목</option>
                                <option value="contents">본문</option>
                                <option value="regName">작성자</option>
                                <option value="all">본문 + 작성자</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-outline btn-primary"
                                onClick={props.event}
                            >
                                검색
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopSearch;