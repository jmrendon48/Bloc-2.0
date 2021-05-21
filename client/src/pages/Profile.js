import React from 'react';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import ReviewList from '../components/ReviewList';
import FollowingList from '../components/FollowingList';

import Auth from '../utils/auth';
import { FOLLOW_USER } from '../utils/mutations';
import { QUERY_USER, QUERY_ME, QUERY_REVIEWS } from '../utils/queries';



const Profile = () => {

  const [followUser] = useMutation(FOLLOW_USER);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, QUERY_REVIEWS, {
    variables: { username: userParam }
  });

  const reviews = data?.reviews || [];

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this page. Use the navigation links above to sign up or log in!
//       </h4>
//     );
//   }

  const handleClick = async () => {
    try {
      await followUser({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} Bloc profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Follow User
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ReviewList reviews={reviews}/>
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FollowingList
            username={user.username}
            followerCount={user.followerCount}
            follower={user.follower}
          />
        </div>
      </div>
    </div>
  );
};
export default Profile;

