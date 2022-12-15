const status = ['Accepted', 'Pending', 'Rejected'];

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
  status: status[Math.floor(Math.random() * 2) + 1],
  projectId:
    Math.floor(Math.random() * (projectLastId - projectFirstId + 1)) +
    projectFirstId,
  userId:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
});

const applicationsData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  applicationsData.push(data());
}

export default applicationsData;
