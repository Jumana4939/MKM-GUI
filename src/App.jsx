import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNavigationLogic from './Components/Pages/PageNavigationLogic/PageNavigationLogic';
import ReactionDetailsPage from './Components/Pages/ReactionDetailsPage/ReactionDetailsPage';

function App() {

  return(
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<PageNavigationLogic/>}/>
            <Route path="/reaction-details/:id" element={<ReactionDetailsPage/>} />
          </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
