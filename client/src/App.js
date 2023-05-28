import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/layout/Footer';
import { AuthServiceProvider } from './context/AuthContext';
import ProductListingPage from './pages/ProductListingPage';

import DataAdder from './components/DataAdder';
import { ProductContextProvider } from './context/ProductContext';
import ProductDescriptionPage from './pages/ProductDescriptionPage';

function App() {
  return (
    <>
      <Router>
        <AuthServiceProvider>
          <ProductContextProvider>
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<ExplorePage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/products' element={<ProductListingPage />} />
                <Route
                  path='/products/:id'
                  element={<ProductDescriptionPage />}
                />
                <Route path='/add' element={<DataAdder />} />
              </Routes>
            </main>
            <Footer />
          </ProductContextProvider>
        </AuthServiceProvider>
      </Router>
      <ToastContainer
        position='top-center'
        autoClose={2500}
        draggable
        pauseOnHover
        pauseOnFocusLoss
        closeButton={false}
        theme='colored'
      />
    </>
  );
}

export default App;
