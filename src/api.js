import routes from './routes';
import { STORIES_COUNT_LIMIT } from './constants';

export const fetchStory = async (id) => {
  const response = await fetch(routes.itemPath(id));
  const data = await response.json();
  return data;
};

const fetchStoriesIds = async () => {
  const response = await fetch(routes.storiesPath());
  const ids = await response.json();
  return ids;
};

export const fetchStories = async () => {
  const ids = await fetchStoriesIds();
  const slicedIds = ids.slice(0, STORIES_COUNT_LIMIT);
  const stories = await Promise.all(slicedIds.map(fetchStory));
  return stories;
};
