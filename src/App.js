import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
