import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRender from './PageRender';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import { Alert } from './components/alert/Alert';
import { refreshToken } from './redux/actions/authAction';
import { useAppDispatch } from './redux/hooks';
import { getCategories } from './redux/actions/categoryActions';
import { getHomeBlogs } from './redux/actions/blogActions';

import io from 'socket.io-client';
import { SOCKET } from './redux/types/socketTypes';
import SocketClient from './SocketClient';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch<any>(getHomeBlogs());
    dispatch<any>(getCategories());
    dispatch<any>(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({
      type: SOCKET,
      payload: socket
    });

    return () => {
      socket.close();
    }
  }, [dispatch]);
  
  return (
    <div className="container">
      <SocketClient />
      <Router>
        <Alert />
        <Header />
        <Routes>
          <Route path='/' element={<PageRender />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:slug' element={<PageRender />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;