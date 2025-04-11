export interface Story {
  id: string;
  imageUrl: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  userImage: string;
  stories: Story[];
  storyViewed: boolean;
}
