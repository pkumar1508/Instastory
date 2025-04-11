import React, { useEffect, useState } from "react";
import "./App.css";
import ViewStories from "./components/ViewStories";
import CircleStories from "./components/CircleStories";
import { User } from "./Types/type";
import sampleUsers from "./constants/stories.json";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState<number | null>(null);

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);
  const openUserStories = (index: number) => {
    setActiveUserIndex(index);
  };

  const closeViewStories = () => {
    setActiveUserIndex(null);
  };

  const handleStoryViewed = (
    userIndex: number
    // storyIndex: number
  ) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].storyViewed = true;
    setUsers(updatedUsers);
  };

  return (
    <div className="app">
      <header data-tid="insta-header" className="app-header">
        <img
          src={"/images/insta-logo.png"}
          alt="Story"
          className="logo-image"
          data-tid="insta-logo"
        />
      </header>
      <main>
        <CircleStories users={users} onUserClick={openUserStories} />
        {activeUserIndex !== null && (
          <ViewStories
            users={users}
            initialUserIndex={activeUserIndex}
            onClose={closeViewStories}
            onStoryViewed={handleStoryViewed}
          />
        )}
      </main>
    </div>
  );
};

export default App;
