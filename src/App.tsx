import { Route, Switch } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";

function App() {
  // const { session } = useSession();
  // const { isLoggedIn, webId } = session.info;
  // const history = useHistory();

  // useEffect(() => {
  //   onSessionRestore((url) => history.replace(url));
  // }, [history]);
  // useEffect(() => {
  //   handleIncomingRedirect({
  //     restorePreviousSession: true,
  //   })
  //     .then((info: any) => {
  //       console.log(`Logged in with WebID [${info.webId}]`);
  //     })
  //     .catch((error) => {
  //       console.log(`Logged in with WebID [${error}]`);
  //     });
  // }, []);
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/todos">
          <TodosPage />
        </Route>
        {/* <PrivateRoute exact path="/todos">
          <TodosPage />
        </PrivateRoute> */}
      </Switch>
    </AppLayout>
  );
}

export default App;
