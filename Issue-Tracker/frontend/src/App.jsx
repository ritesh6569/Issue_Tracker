import Register from "./Register";
import LoginForm from "./LoginForm";
import IssueForm from "./IssueForm";
import IssueHistory from "./IssueHistory";
import Home from "./Home";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  // const [issues, setIssues] = useState([]);

  // const addIssue = (issue) => {
  //   setIssues([...issues, issue]);
  // };

  return (
    <>
      {/* <Register/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} ></Route>
          <Route path="/login" element={<LoginForm />} ></Route>
          <Route path="/issue-history" element={<IssueHistory />} ></Route>
          <Route path="/issue-form" element={<IssueForm />} ></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
