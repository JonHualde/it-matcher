interface GeneralInformationProps {
  updateProject: (key: string, value: any) => void;
}

const Other = (props: GeneralInformationProps) => {
  return (
    <>
      <h5 className="text-blue-dimmed mt-[49px] mb-[28px]">OTHER</h5>
      <div className="mb-[50px]">
        <div className="w-full mt-0">
          <input
            accept="image/*"
            type="file"
            name="attachments"
            className="w-full"
            onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row -mt-2 mb-2">
        <div className="flex flex-col mb-4 mr-4">
          <label htmlFor="putOnline"> Put online </label>
          <div className="flex items-center">
            <input type="checkbox" name="putOnline" onChange={(e: any) => props.updateProject(e.target.name, e.target.checked)} />
            <p className="italic ml-2">Yes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Other;
