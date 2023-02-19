import TaskCard from '@frontend/components/TaskCard';
import { getUserFromCookie } from '@frontend/utils/auth';
import { db } from '@frontend/utils/db';
import { cookies } from 'next/headers';

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

const ProjectSlugPage = async ({ params }: { params: { id: string } }) => {
  const project = await getData(params.id);
  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <TaskCard tasks={project?.tasks} title={project?.name as string} />
    </div>
  );
};

export default ProjectSlugPage;
