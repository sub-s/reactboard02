import React from 'react';

function Path(props) {
    return (
        <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
                <h2>Layouts</h2>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                        <strong>Layouts</strong>
                    </li>
                </ol>
            </div>
            <div className="col-lg-2"></div>
        </div>
    );
}

export default Path;