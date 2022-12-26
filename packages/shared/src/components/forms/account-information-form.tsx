import { ChangeEvent } from "react";
// Components
import InputContainer from "../input-container/input-container";
import { Title } from "@shared-components/typography";
// Types
import { User } from "@shared-types";

interface AccountInformationFormProps {
  userData: User;
  updateUserData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AccountInformationForm = ({ handleSubmit, updateUserData, userData }: AccountInformationFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xl flex-col">
      <Title type="h5" customClassName="text-blue-dimmed">
        ACCOUNT INFORMATION
      </Title>
      <InputContainer
        type="text"
        placeholder="John"
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.first_name}
        name="first_name"
        label="First name"
      />
      <InputContainer
        type="text"
        placeholder="Doe"
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.last_name}
        name="last_name"
        label="Last name"
      />
      <InputContainer
        type="email"
        placeholder="email"
        disabled={true}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.email}
        name="email"
        label="Email"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.linkedIn_url ?? ""}
        name="linkedInUrl"
        label="LinkedIn URL"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.github_url ?? ""}
        name="githubUrl"
        label="GitHub URL"
      />
      <InputContainer
        type="text"
        placeholder=""
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.instagram_username ?? ""}
        name="instagramUsername"
        label="Instagram Username"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.website_url ?? ""}
        name="websiteUrl"
        label="Website URL"
      />
      <InputContainer
        type="text"
        placeholder="https://..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserData(e)}
        value={userData.notion_page_url ?? ""}
        name="notionPageUrl"
        label="Notion Page URL"
      />
      <button
        type="submit"
        className="mt-4 flex w-full justify-center rounded-sm bg-blue-ocean py-3 font-medium
            text-white hover:bg-blue-800"
      >
        Update Personal Information
      </button>
    </form>
  );
};

export default AccountInformationForm;
