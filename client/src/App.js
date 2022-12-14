import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Header from './Components/Header'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/AddEvent';
import EventDetails from './pages/EventDetails';
import Home from './pages/Home';
import Footer from './Components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <div className=''>
          <div className=''>
            <Routes>
              <Route
                path="/"
                element= {(
                    <>
                      <Home />
                      <Footer />
                    </>
                  )
                }
              />
              <Route
                path="/login"
                element= {<Login />}
              />
              <Route
                path="/signup"
                element= {<Signup />}
              />
              <Route
                path="/dashboard"
                element= {<Dashboard />}
              />
              <Route
                path="/addevent"
                element= {<AddEvent />}
              />
              <Route
                path="/event/:id"
                element= {<EventDetails />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;