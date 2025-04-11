import React from "react";
import { User } from "../Types/type";
import "./CircleStories.css";

interface CircleStoriessProps {
  users: User[];
  onUserClick: (index: number) => void;
}

const CircleStoriess: React.FC<CircleStoriessProps> = ({
  users,
  onUserClick,
}) => {
  return (
    <div className="story-circles-container">
      <div className="story-circles">
        {users.map((user, index) => (
          <div
            key={index}
            className="story-circle"
            onClick={() => onUserClick(index)}
          >
            <div
              className={`story-circle-border ${
                user.storyViewed ? "viewed" : ""
              }`}
            >
              <img
                src={user.userImage}
                alt={user.username}
                className="story-circle-image"
              />
            </div>
            <span className="story-username-1">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleStoriess;
