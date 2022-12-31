export default interface User {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  permission?: number;
  password?: string;
  email: string;
  first_name: string;
  last_name: string;
  linkedIn_url: string | null;
  instagram_username: string | null;
  github_url: string | null;
  website_url: string | null;
  notion_page_url: string | null;
  profile_picture_ref?: string | null;
}
