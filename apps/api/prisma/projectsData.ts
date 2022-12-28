import { faker } from '@faker-js/faker';

const durationMetric = ['day', 'week', 'month'];
const difficulty = ['beginner', 'intermediate', 'advanced', 'expert'];
const type = ['profitable', 'non-profitable', 'training project'];

// config
import config from './config';

const { firstUserId, lastUserId, loopIteration } = config;

const projectPictureUrls = [
  'pictures/e7b12e8b-01c4-401c-96db-fd1e6c9eb04c-svpp.jpeg',
  'pictures/1e245af3-a921-4055-9d1d-299971fa66b7-twitter 2 (1).jpeg',
  'pictures/a4f24fd7-e510-4b7c-879b-7583e990a0b8-image.jpg',
];

const attachmentUrls = [
  'attachments/b7078446-4032-45ec-8029-98fc51995eec-svpp.jpeg',
  'attachments/b11ec556-0198-41f4-8921-11ba428c4353-domenico-loia-EhTcC9sYXsw-unsplash.jpg',
  'attachments/5fe031da-9847-4831-b0a2-08d30affbd73-domenico-loia-EhTcC9sYXsw-unsplash.jpg',
];

const data = () => ({
  userId:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
  projectName: faker.name.findName(),
  startingOn: faker.date.between('2022-06-01', '2022-08-05'),
  estimatedTimeDuration: faker.datatype.number({ max: 10 }),
  estimatedTimeDurationMetric:
    durationMetric[Math.floor(Math.random() * 2) + 1],
  full_name: faker.name.findName(),
  description: faker.lorem.paragraph(10),
  difficulty: difficulty[Math.floor(Math.random() * 3) + 1],
  type: type[Math.floor(Math.random() * 2) + 1],
  numberOfParticipant: Math.floor(Math.random() * 3 + 1),
  initialInvestment: faker.datatype.boolean(),
  initialInvestmentCost: Math.floor(Math.random() * 150 + 1),
  isOnline: true,
  jobTitle: faker.helpers.arrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  toolsAndTechnologies: faker.helpers.arrayElements([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]),
  projectPicture: projectPictureUrls[Math.floor(Math.random() * 2) + 1],
  attachments: [attachmentUrls[Math.floor(Math.random() * 2) + 1]],
});

const projectData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  projectData.push(data());
}

export default projectData;
