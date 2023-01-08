import { faker } from '@faker-js/faker';

const durationMetric = ['day', 'week', 'month'];
const difficulty = ['beginner', 'intermediate', 'advanced', 'expert'];
const type = ['profitable', 'non-profitable', 'training project'];

// config
import config from './config';

const { firstUserId, lastUserId, loopIteration } = config;

const projectPictureUrls = [
  'pictures/1e245af3-a921-4055-9d1d-299971fa66b7-twitter 2 (1).jpeg',
  'pictures/a185b63e-09d1-4910-a889-c3da011135de-profile_pic_2.jpeg',
  'pictures/a6fe4ee1-5891-4db7-b485-7c3b0747870e-image.jpg',
  'pictures/f933bbbc-5b72-4194-ac1e-84adf42f66fc-svpp.jpeg',
];

const attachmentUrls = [
  'attachments/1aa2c4c8-7f25-4e26-a7f3-7622652b5aa5-domenico-loia-EhTcC9sYXsw-unsplash.jpg',
  'attachments/5fe031da-9847-4831-b0a2-08d30affbd73-domenico-loia-EhTcC9sYXsw-unsplash.jpg',
  'attachments/b11ec556-0198-41f4-8921-11ba428c4353-domenico-loia-EhTcC9sYXsw-unsplash.jpg',
  'attachments/b7078446-4032-45ec-8029-98fc51995eec-svpp.jpeg',
];

const data = () => ({
  user_id:
    Math.floor(Math.random() * (lastUserId - firstUserId + 1)) + firstUserId,
  project_name: faker.name.fullName(),
  starting_on: faker.date.between('2022-06-01', '2022-08-05'),
  estimated_time_duration: faker.datatype.number({ max: 10 }),
  estimated_time_duration_metric:
    durationMetric[Math.floor(Math.random() * 2) + 1],
  full_name: faker.name.fullName(),
  description: faker.lorem.paragraph(10),
  difficulty: difficulty[Math.floor(Math.random() * 3) + 1],
  type: type[Math.floor(Math.random() * 2) + 1],
  number_of_participants: Math.floor(Math.random() * 3 + 1),
  initial_investment: faker.datatype.boolean(),
  initial_investment_cost: Math.floor(Math.random() * 150 + 1),
  is_online: true,
  job_titles_wanted: faker.helpers.arrayElements([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]),
  tools_and_technologies: faker.helpers.arrayElements([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]),
  participants_ids: [
    Math.floor(Math.random() * (firstUserId - lastUserId + 1)) + lastUserId,
  ],
  job_titles_filled: [Math.floor(Math.random() * 14) + 1],
  project_main_picture: projectPictureUrls[Math.floor(Math.random() * 3) + 1],
  attachments: [attachmentUrls[Math.floor(Math.random() * 3) + 1]],
});

const projectData: Array<any> = [];

for (let i = 0; i < loopIteration; i++) {
  projectData.push(data());
}

export default projectData;
