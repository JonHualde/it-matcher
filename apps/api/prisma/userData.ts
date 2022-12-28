import { faker } from '@faker-js/faker';
import config from './config';

const userDataArray: Array<any> = [
  {
    email: 'jonhualde94@gmail.com',
    password: 'password',
    firstName: 'Jon',
    lastName: 'Hualde',
    linkedInUrl: faker.internet.url(),
    instagramUsername: faker.internet.url(),
    websiteUrl: faker.internet.url(),
    notionPageUrl: faker.internet.url(),
    Permission: 0,
    profile_picture_ref:
      'pictures/e7b12e8b-01c4-401c-96db-fd1e6c9eb04c-svpp.jpeg',
  },
];

const userData = () => ({
  email: faker.internet.email(),
  password: 'password',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  linkedInUrl: Math.random() > 0.5 ? faker.internet.url() : '',
  instagramUsername: Math.random() > 0.5 ? faker.internet.url() : '',
  websiteUrl: Math.random() > 0.5 ? faker.internet.url() : '',
  notionPageUrl: Math.random() > 0.5 ? faker.internet.url() : '',
  Permission: 1,
  profile_picture_ref:
    'pictures/a4f24fd7-e510-4b7c-879b-7583e990a0b8-image.jpg',
});

for (let i = 0; i < config.loopIteration; i++) {
  userDataArray.push(userData());
}

export default userDataArray;
