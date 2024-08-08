import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MainPage from './routes/MainPage';
import Layout from './components/common/Layout';
import LoginPage from './routes/LoginPage';
import ProductDetailPage from './routes/ProductDetailPage';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/detail/:productId' element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
