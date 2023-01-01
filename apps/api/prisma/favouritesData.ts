// config
import config from './config';

const {
  firstUserId,
  lastUserId,
  projectFirstId,
  projectLastId,
  loopIteration,
} = config;

const data = () => ({
  project_id:
    Math.floor(Math.random() * (projectLastId - projectFirstId + 1)) +
    projectFirstId,
  user_id:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
});

const favouritesData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  favouritesData.push(data());
}

export default favouritesData;
