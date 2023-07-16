import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as router from "./router/";

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
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
