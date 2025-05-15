import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import ItineraryEditor from "./pages/ItineraryEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItineraryEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
