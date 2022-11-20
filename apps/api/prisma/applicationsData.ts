const status = ["Accepted", "Pending", "Rejected"];

const data = () => ({
  status: status[Math.floor(Math.random() * 2) + 1],
  projectId: Math.floor(Math.random() * (28 - 22 + 1)) + 22,
  applicantId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
});

const applicationsData: Array<any> = [
  {
    status: status[Math.floor(Math.random() * 2) + 1],
    projectId: Math.floor(Math.random() * (28 - 22 + 1)) + 22,
    applicantId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
  },
  {
    status: status[Math.floor(Math.random() * 2) + 1],
    projectId: Math.floor(Math.random() * (28 - 22 + 1)) + 22,
    applicantId: Math.floor(Math.random() * (29 - 24 + 1)) + 24,
  },
];

for (let i = 0; i < 5; i++) {
  applicationsData.push(data());
}

export default applicationsData;
