import React from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER } from '../../utils/mutations';


const FollowingList = ({ followCount, username, follower }) => {

  const [login, { error }] = useMutation(FOLLOW_USER);


  if (!follower || !follower.length) {
    return <p className="bg-dark text-light p-3">{username}, show your support for other Bloc users and give them a follow!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {followCount} {followCount === 1 ? 'follower' : 'followers'}
      </h5>
      {follower.map(follower => (
        <button className="btn w-100 display-block mb-2" key={follower._id}>
          <Link to={`/profile/${follower.username}`}>{follower.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FollowingList;