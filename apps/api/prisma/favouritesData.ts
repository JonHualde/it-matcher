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

const generateProjectIds = () => {
  projectIdsArray = [];
  for (let i = 0; i < 3; i++) {
    projectIdsArray.push(
      Math.floor(Math.random() * (projectLastId - projectFirstId + 1)) +
        projectFirstId,
    );
  }

  return projectIdsArray;
};

const data = () => ({
  projectIds: generateProjectIds(),
  userId:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
});

const favouritesData: Array<any> = [
  {
    projectIds: generateProjectIds(),
    userId:
      Math.floor(Math.random() * (firstUserId - lastUserId + 1)) + lastUserId,
  },
];

for (let i = 0; i < loopIteration; i++) {
  favouritesData.push(data());
}

export default favouritesData;
