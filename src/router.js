
import {createBrowserRouter} from "react-router-dom";
import App from './App';
import PageNotPound from "./Pages/Error/PageNotPound";
import Main from "./Pages/Main/Main";
import BoardList from "./Pages/Board/BoardList";
import BoardView from "./Pages/Board/BoardView";
import BoardWrite from "./Pages/Board/BoardWrite";


export const router = createBrowserRouter([
    {
        path : '/', // 기본 셋팅 '/' 는 메인으로 이동
        element : <App />,
        errorElement: <PageNotPound />, // 페이지 없을 경우 페이지 설정을 해준다.
        children: [
            {
                index : true, // 배열 첫번째 항목인 path와 동일한 true일 경우 메인화면을 출력 해준다.
                element : <Main /> // 메인 페이지
            },
            {
                path: '/BoardList', // 다른 기타 메뉴를 표시 해준다.
                element : <BoardList />
            },
            {
                path: '/BoardView', // 다른 기타 메뉴를 표시 해준다.
                element : <BoardView />
            },
            {
                path: '/BoardWrite', // 다른 기타 메뉴를 표시 해준다.
                element : <BoardWrite />
            }
        ],
    },
    {
        // 별도에 LOGIN이나 페이지가 GNB를 타지 않을 경우의 Router을 설정 해준다.
    }
]);