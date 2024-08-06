import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import RecoilEx from './routes/RecoilEx';
import ApiEx from './routes/ApiEx';
import Layout from './components/common/Layout';
import LoginPage from './routes/LoginPage';
import ProductDetailPage from './routes/ProductDetailPage';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/detail/:productId' element={<ProductDetailPage />} />
            <Route path='/recoilex' element={<RecoilEx />} />
            <Route path='/api' element={<ApiEx />} />
          </Routes>
        </Layout>
      </Router>
    </RecoilRoot>
  );
}
