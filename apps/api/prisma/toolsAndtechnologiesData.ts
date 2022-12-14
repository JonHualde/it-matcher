const tools = [
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
  name: tools[index],
});

const toolsAndTechnologiesData: Array<{ name: string }> = [];

for (let i = 0; i < tools.length - 1; i++) {
  toolsAndTechnologiesData.push(data(i));
}

export default toolsAndTechnologiesData;
