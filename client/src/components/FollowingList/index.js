import React from 'react';
import { Link } from 'react-router-dom';

const FollowingList = ({ followCount, username, follows }) => {
console.log('=========================',follows)

  if (!follows || !follows.length) {
    return <p className="bg-dark text-light p-3">{username}, show your support for other Bloc users and give them a follow!</p>;
  }

  return (
    <div>
      <h5>
        {username} is following {followCount} Bloc {followCount === 1 ? 'user' : 'users'} :
      </h5>
      {follows.map(follows => (
        <button className="btn w-100 display-block mb-2" key={follows._id}>
          <Link to={`/profile/${follows.username}`}>{follows.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FollowingList;