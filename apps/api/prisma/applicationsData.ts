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
  status: 'Pending',
  project_id:
    Math.floor(Math.random() * (projectLastId - projectFirstId + 1)) + 1,
  user_id: Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + 1,
  job_title_id: Math.floor(Math.random() * 14) + 1,
});

const applicationsData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  applicationsData.push(data());
}

export default applicationsData;
