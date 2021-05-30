import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import ReviewList from '../components/ReviewList';
import FollowingList from '../components/FollowingList';

import Auth from '../utils/auth';
import { FOLLOW_USER } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
  const [profileReviewEdit, setProfileReviewEdit] = useState(true);
  const [followUser] = useMutation(FOLLOW_USER);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.user || data?.me || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in.

        <div class="jumbotron jumbotron-fluid">
          <div class="container banner">
            <h1 class="display-4 banner">
              Viewing {`${user.username}'s`} Bloc profile.
            </h1>
          </div>
        </div>
      </h4>
    );
  }
  console.log("Profile.js ==========", user.follows)

  const handleClick = async () => {
    try {
      await followUser({
        variables: { followId: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  console.log(user)

  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className='container banner'>
          <h2 className="display-4 banner">
            Viewing {userParam ? `${user.username}'s` : 'your'} Bloc profile.
        </h2>

          {userParam && (
            <button className="btn btn-primary ml-auto" onClick={handleClick}>
              Follow User
            </button>
          )}
        </div>
      </div>

      <div className='row'>
        <div className='col-9'>
          <div className="flex-row justify-space-between mb-3">
            <div>
              <ReviewList reviews={user.reviews} data={data} profileReviewEdit={profileReviewEdit} />
            </div>
          </div>
        </div>

        <div className='col-3'>
          <div className="bloc-box">
            <FollowingList
              followCount={user.followCount}
              username={user.username}
              follows={user.follows}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
export default Profile;