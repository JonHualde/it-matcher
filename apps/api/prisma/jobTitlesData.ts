const jobs = [
  'Front-end Developer',
  'Back-end Developer',
  'DevOps Engineer',
  'ML Engineer',
  'Data-scientist',
  'Data-analyst',
  'Designer',
  'Product Owner',
  'Project Manager',
  'Copywritter',
  'Marketing Executive',
  'Marketing Manager',
  'Video Game Developer',
  'Sales Executive',
  'Digital Marketing Executive',
];

const data = (index: number) => ({
  name: jobs[index],
});

const jobTitlesData: Array<{ name: string }> = [];

for (let i = 0; i < jobs.length - 1; i++) {
  jobTitlesData.push(data(i));
}

export default jobTitlesData;
