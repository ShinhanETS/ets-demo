import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './routes/Main';
import RecoilEx from './routes/RecoilEx';
import ApiEx from './routes/ApiEx';
import Layout from './components/Layout'; // Layout 컴포넌트 임포트
import Login from './routes/Login';
import ProductDetail from './routes/ProductDetail';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/detail/:productId' element={<ProductDetail />} />
            <Route path='/recoilex' element={<RecoilEx />} />
            <Route path='/api' element={<ApiEx />} />
          </Routes>
        </Layout>
      </Router>
    </RecoilRoot>
  );
}
