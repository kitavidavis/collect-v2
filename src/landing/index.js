import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Header from 'components/header/header';
import TopBar from 'components/topbar';

function authReducer(prevState, action){
  const { type, token } = action;

  switch(type){
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        userToken: token
      };
      break;

    case 'SIGN_IN':
      return {
        ...prevState,
        isLoading: false,
        userToken: token
      };
      break;

    case 'SIGN_UP':
      return {
        ...prevState,
        isSignout: false,
        userToken: token
      };
      break;

    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null
      };
      break;

    default:
      return prevState;
  }
}

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null
}

export const AuthContext = createContext({
  state: initialState,
  dispatch: () => {}
});

export default function IndexPage() {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {
    const checkToken = () => {
      let userToken;

      try {
        userToken = localStorage.getItem("geopsy-collect-usertoken");
      }catch(e){
        console.log(e);
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    checkToken();

  }, []);
  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <Layout>
        <Header />
        <SEO
          title="GeoPsy Collect"
          description="An open source geospatial data collection toolkit suited for research, science, ecosystem conservation and much more"
        />
        <Banner />
      </Layout>
    </ThemeProvider>
  );
}
