import Layout from "./hoc/Layout/Layout";
import Quis from "./containers/Quis/Quis";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {Route, Routes} from 'react-router-dom'


function App() {
  return (
    <Layout>
        <Routes>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/quiz-creator" element={<QuizCreator/>}/>
            <Route path="/quiz/:id" element={<Quis />}/>
            <Route path="/" element={<QuizList />}/>
        </Routes>
    </Layout>
  );
}

export default App;
