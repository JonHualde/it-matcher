import { faker } from '@faker-js/faker';

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
    profile_picture_ref: '',
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
  profile_picture_ref: '',
});

for (let i = 0; i < 9; i++) {
  userDataArray.push(userData());
}

export default userDataArray;
