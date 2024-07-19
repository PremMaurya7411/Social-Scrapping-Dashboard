import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";

import { resources, themeConfig } from "@/config";
import { authProvider, dataProvider, liveProvider } from "@/providers";

import { AlgoliaSearchWrapper, FullScreenLoading, Layout } from "./components";
import { useAutoLoginForDemo } from "./hooks";
import { DashboardPage } from "./routes/dashboard";
import { ForgotPasswordPage } from "./routes/forgot-password";
import { LoginPage } from "./routes/login";
import { RegisterPage } from "./routes/register";

import { UpdatePasswordPage } from "./routes/update-password";
import "./utilities/init-dayjs";
import "@refinedev/antd/dist/reset.css";
import "./styles/antd.css";
import "./styles/fc.css";
import "./styles/index.css";

import { GetTweetsByProfileName } from "./routes/twitter/get-tweets-by-profile-name"
import {GetTweetsFromHashtag} from "./routes/twitter/get-tweets-from-hashtag"
import {GetTrendingHashtag} from "./routes/twitter/get-tranding-hashtag"
import {GetTweetsByPostId} from "./routes/twitter/get-data-by-post-id"
import {GetCommenToTweet} from "./routes/twitter/get_comments_for_tweets"

const App: React.FC = () => {
  // This hook is used to automatically login the user.
  // We use this hook to skip the login page and demonstrate the application more quickly.
  const { loading } = useAutoLoginForDemo();

  if (loading) {
    return <FullScreenLoading />;
  }
  return (
    <AlgoliaSearchWrapper>
      <BrowserRouter>
        <ConfigProvider theme={themeConfig}>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                authProvider={authProvider}
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                routerProvider={routerProvider}
                resources={resources}
                notificationProvider={useNotificationProvider}
                options={{
                  liveMode: "auto",
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<DashboardPage />} />
                    <Route
                      path="/twitter/tweets-by-profile"
                      element={
                        <GetTweetsByProfileName>
                          <Outlet />
                        </GetTweetsByProfileName>
                      }
                    >
                    </Route>
                    <Route
                      path="/twitter/tweets-by-hashtag"
                      element={
                        <GetTweetsFromHashtag>
                          <Outlet />
                        </GetTweetsFromHashtag>
                      }
                    >
                    </Route>
                    <Route
                      path="/twitter/get-trending-hashtags"
                      element={
                        <GetTrendingHashtag>
                          <Outlet />
                        </GetTrendingHashtag>
                      }
                    >
                      </Route>

                    <Route
                      path="/twitter/get-tweets-by-id"
                      element={
                        <GetTweetsByPostId>
                          <Outlet />
                        </GetTweetsByPostId>
                      }
                    >
                      </Route>


                    <Route
                      path="/twitter/get-comments-for-tweet/"
                      element={
                        <GetCommenToTweet>
                          <Outlet />
                        </GetCommenToTweet>
                      }
                    >
                      </Route>


                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-auth"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource resource="dashboard" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPasswordPage />}
                    />
                    <Route
                      path="/update-password"
                      element={<UpdatePasswordPage />}
                    />
                  </Route>
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </AlgoliaSearchWrapper>
  );
};

export default App;
