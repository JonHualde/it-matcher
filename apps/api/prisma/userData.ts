import { faker } from '@faker-js/faker';
import config from './config';

const projectPictureUrls = [
  'pictures/1e245af3-a921-4055-9d1d-299971fa66b7-twitter 2 (1).jpeg',
  'pictures/a185b63e-09d1-4910-a889-c3da011135de-profile_pic_2.jpeg',
  'pictures/a6fe4ee1-5891-4db7-b485-7c3b0747870e-image.jpg',
  'pictures/f933bbbc-5b72-4194-ac1e-84adf42f66fc-svpp.jpeg',
];

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
    permission: 0,
    profile_picture_ref:
      'pictures/e7b12e8b-01c4-401c-96db-fd1e6c9eb04c-svpp.jpeg',
  },
];

const userData = () => ({
  email: faker.internet.email(),
  password: 'password',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  linkedInUrl: faker.internet.url(),
  instagramUsername: faker.internet.url(),
  websiteUrl: faker.internet.url(),
  notionPageUrl: faker.internet.url(),
  permission: 0,
  profile_picture_ref: projectPictureUrls[Math.floor(Math.random() * 3) + 1],
});

for (let i = 0; i < config.loopIteration; i++) {
  userDataArray.push(userData());
}

export default userDataArray;
