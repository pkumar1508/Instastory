import React, { useState, useEffect, useRef } from "react";
import { User } from "../Types/type";
import "./ViewStories.css";

interface ViewStoriesProps {
  users: User[];
  initialUserIndex: number;
  onClose: () => void;
  onStoryViewed: (userIndex: number) => void;
}

const ViewStories: React.FC<ViewStoriesProps> = ({
  users,
  initialUserIndex,
  onClose,
  onStoryViewed,
}) => {
  const [currentUserIndex, setCurrentUserIndex] =
    useState<number>(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const progressIntervalRef = useRef<number | null>(null);
  const storyDuration = 5000;
  const [isUserTransitioning, setIsUserTransitioning] =
    useState<boolean>(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right"
  >("right");

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser.stories[currentStoryIndex];

  useEffect(() => {
    startProgressTimer();
    onStoryViewed(currentUserIndex);
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentUserIndex, currentStoryIndex]);

  const startProgressTimer = () => {
    setProgressPercentage(0);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const updateFrequency = 1000 / 60;
    const increment = (updateFrequency / storyDuration) * 100;

    const interval = window.setInterval(() => {
      setProgressPercentage((prev) => {
        const newPercentage = prev + increment;
        if (newPercentage >= 100) {
          clearInterval(interval);
          goToNextStory();
          return 0;
        }
        return newPercentage;
      });
    }, updateFrequency);

    progressIntervalRef.current = interval;
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      setTransitionDirection("left");
      setIsUserTransitioning(true);

      setTimeout(() => {
        const previousUserIndex = currentUserIndex - 1;
        const previousUser = users[previousUserIndex];
        setCurrentUserIndex(previousUserIndex);
        setCurrentStoryIndex(previousUser.stories.length - 1);
        setIsUserTransitioning(false);
      }, 300);
    } else {
      onClose();
    }
  };

  const goToNextStory = () => {
    const currentUserStories = users[currentUserIndex].stories;

    if (currentStoryIndex < currentUserStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < users.length - 1) {
      setTransitionDirection("right");
      setIsUserTransitioning(true);

      setTimeout(() => {
        setCurrentUserIndex(currentUserIndex + 1);
        setCurrentStoryIndex(0);
        setIsUserTransitioning(false);
      }, 300);
    } else {
      onClose();
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const relativeX = clientX - left;

    if (relativeX < width / 3) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const handlePause = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleResume = () => {
    startProgressTimer();
  };

  return (
    <div className="story-viewer" data-tid="insta-story-preview">
      <div
        data-tid="insta-story-container"
        className={`story-container ${
          isUserTransitioning ? `transitioning-${transitionDirection}` : ""
        }`}
        onClick={handleTap}
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <div className="story-content">
          <div className="story-header">
            <div className="progress-container">
              {currentUser.stories.map((_, index) => (
                <div key={index} className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width:
                        index < currentStoryIndex
                          ? "100%"
                          : index === currentStoryIndex
                          ? `${progressPercentage}%`
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="story-user-info">
              <img
                src={currentUser.userImage}
                alt={currentUser.username}
                className="story-user-image"
              />
              <span className="story-username">{currentUser.username}</span>
              <span
                className="story-timestamp"
                data-tid="insta-story-timestamp"
              >
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <button
              data-tid="insta-story-closebutton"
              className="close-button"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <img
            src={currentStory.imageUrl}
            alt="Story"
            className="story-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewStories;
