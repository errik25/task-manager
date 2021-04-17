import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuth from './WithAuth';

const mapStateToProps = store => ({
  user: store.user,
});

const mapDispatchToProps = dispatch => ({
  // onUnauthenticated:
});

export default compose(
  connect(mapStateToProps, {
    // provide only needed actions, then no `dispatch` prop is passed down.
    // getDashboardFromStorage,
    // getUserFromStorage,
    // create a new action for the user so that your reducers can react to
    // not being authenticated
    // onUnauthenticated,
  }),

  withAuth,
);
