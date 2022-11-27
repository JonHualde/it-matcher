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
  mainPicture: faker.image.abstract(),
  projectName: faker.name.findName(),
  startingOn: faker.date.between('2022-06-01', '2022-08-05'),
  estimatedTimeDuration: faker.datatype.number({ max: 10 }),
  estimatedTimeDurationMetric:
    durationMetric[Math.floor(Math.random() * 2) + 1],
  description: faker.lorem.paragraph(10),
  difficulty: difficulty[Math.floor(Math.random() * 3) + 1],
  type: type[Math.floor(Math.random() * 2) + 1],
  searchingFor: faker.helpers.arrayElements(),
  numberOfParticipant: Math.floor(Math.random() * 3 + 1),
  initialInvestment: faker.datatype.boolean(),
  initialInvestmentCost: Math.floor(Math.random() * 150 + 1),
  toolsAndTechnologies: faker.helpers.arrayElements(),
  isOnline: true,
});

const projectData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  projectData.push(data());
}

export default projectData;
