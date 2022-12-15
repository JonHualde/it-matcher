let projectIdsArray: Array<any> = [];

import { last } from 'rxjs';
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
  projectId:
    Math.floor(Math.random() * (projectLastId - projectFirstId + 1)) +
    projectFirstId,
  userId:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
});

const favouritesData: Array<any> = [
  {
    projectId:
      Math.floor(Math.random() * (projectLastId - projectFirstId + 1)) +
      projectFirstId,
    userId:
      Math.floor(Math.random() * (firstUserId - lastUserId + 1)) + lastUserId,
  },
];

for (let i = 0; i < loopIteration; i++) {
  favouritesData.push(data());
}

export default favouritesData;
