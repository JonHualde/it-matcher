let projectIdsArray: Array<any> = [];

const generateProjectIds = () => {
  projectIdsArray = [];
  for (let i = 0; i < 3; i++) {
    projectIdsArray.push(Math.floor(Math.random() * (28 - 22 + 1)) + 22);
  }

  return projectIdsArray;
};

const data = () => ({
  projectIds: generateProjectIds(),
  userId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
});

const favouritesData: Array<any> = [
  {
    projectIds: generateProjectIds(),
    userId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
  },
];

for (let i = 0; i < 5; i++) {
  favouritesData.push(data());
}

export default favouritesData;
