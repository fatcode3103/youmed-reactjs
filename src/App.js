import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as router from "./router/";
import PrivateRoute from "./utils/PrivateRouter";
import LoginRoute from "./utils/LoginRoute";

function App() {
    return (
        <div>
            <Router>
                <div className="App">
                    <Routes>
                        {router.routerPublic.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={<Page />}
                                />
                            );
                        })}
                        {router.routerPrivate.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    path={item.path}
                                    key={index}
                                    element={
                                        <PrivateRoute element={<Page />} />
                                    }
                                />
                            );
                        })}
                        {router.routerLogin.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    path={item.path}
                                    key={index}
                                    element={<LoginRoute element={<Page />} />}
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
