export default interface UserResponse {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  permission: number;
  linkedIn_url: string;
  instagram_username: string;
  website_url: string;
  github_url: string;
  notion_page_url: string;
  profile_picture_ref: string;
  password?: string;
}
