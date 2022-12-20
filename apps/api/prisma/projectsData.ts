import { faker } from '@faker-js/faker';

const durationMetric = ['day', 'week', 'month'];
const difficulty = ['beginner', 'intermediate', 'advanced', 'expert'];
const type = ['profitable', 'non-profitable', 'training project'];

// config
import config from './config';

const { firstUserId, lastUserId, loopIteration } = config;

const data = () => ({
  userId:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
  projectPicture: faker.image.abstract(),
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
});

const projectData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  projectData.push(data());
}

export default projectData;
