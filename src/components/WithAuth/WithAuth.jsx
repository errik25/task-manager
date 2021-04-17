import React from 'react';
import { Redirect } from 'react-router-dom';

export default Component => ({
  // Destructure props here, which filters them at the same time.
  user,
  tried,
  token,
  getDashboardFromStorage,
  getUserFromStorage,
  onUnauthenticated,
  ...props
}) => {
  // if user is not logged and we 've not checked the localStorage
  if (user.isLogged) {
    // try load the data from local storage
    // getDashboardFromStorage();
    // getUserFromStorage();
    return <Component {...props} user={user} />;
  } else {
    // if the user has no token or we tried to load from localStorage
    // onUnauthenticated();
    return <Redirect to="/login" />;
  }

  // if the user has token render the component PASSING DOWN the props.
};
