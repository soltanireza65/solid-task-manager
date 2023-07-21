import { useSession } from "@inrupt/solid-ui-react";
import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

// export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
//   const {
//     session: {
//       info: { isLoggedIn },
//     },
//   } = useSession();
//   return isLoggedIn ? (
//     <Route {...rest}>{children}</Route>
//   ) : (
//     <Redirect to="login" />
//   );
// };

export const PrivateRoute: FC<RouteProps> = (props) => {
  const {
    session: {
      info: { isLoggedIn },
    },
  } = useSession();
  return isLoggedIn ? <Route {...props} /> : <Redirect to="login" />;
};
