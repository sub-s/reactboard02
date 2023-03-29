import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import TopSearch from "./TopSearch";
import Path from "./Path";

function Container(props) {
    return (
        <div id="page-wrapper" className="gray-bg dashbard-1">
            <TopSearch />
            <Path />



            <Outlet />{/*Outlet 안에 페이지를 담는다.*/}
            <Footer />
        </div>
    );
}

export default Container;