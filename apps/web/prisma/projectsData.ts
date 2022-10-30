import { faker } from "@faker-js/faker";

const durationMetric = ["day", "week", "month"];
const difficulty = ["beginner", "intermediate", "advanced", "expert"];
const type = ["commercial", "non-profitable", "training project"];

const data = () => ({
  userId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
  mainPicture: faker.image.abstract(),
  projectName: faker.name.findName(),
  startingOn: faker.date.between("2022-06-01", "2022-08-05"),
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
  putOnline: true,
});

const projectData: Array<any> = [
  {
    userId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
    mainPicture: faker.image.abstract(),
    projectName: faker.name.findName(),
    startingOn: faker.date.between("2022-06-01", "2022-08-05"),
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
    putOnline: true,
  },
  {
    userId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
    mainPicture: faker.image.abstract(),
    projectName: faker.name.findName(),
    startingOn: faker.date.between("2022-06-01", "2022-08-05"),
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
    putOnline: true,
  },
];

for (let i = 0; i < 5; i++) {
  projectData.push(data());
}

export default projectData;
