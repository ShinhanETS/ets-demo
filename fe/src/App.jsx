import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Main from './routes/Main';
import RecoilEx from './routes/RecoilEx';
import ApiEx from './routes/ApiEx';
import Layout from './components/Layout'; // Layout 컴포넌트 임포트

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/recoilex' element={<RecoilEx />} />
            <Route path='/api' element={<ApiEx />} />
          </Routes>
        </Layout>
      </Router>
    </RecoilRoot>
  );
}
