import React from 'react';
import { Link } from 'react-router-dom';

const FollowingList = ({ followerCount, username, follower }) => {
  if (!follower || !follower.length) {
    return <p className="bg-dark text-light p-3">{username}, show your support for other Bloc users!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {followerCount} {followerCount === 1 ? 'follower' : 'followers'}
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