import Home from './home';
import { getProjects } from '@/app/services/projectService'; // tu función que usa populate=*
import { getProfile } from '@/app/services/profileService'; // tu función que usa populate=*

export default async function Page() {
  const projects = await getProjects();
  const profile = await getProfile();

  return <Home data={profile} />;
}