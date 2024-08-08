import { NextSeo } from 'next-seo';
import { ContainerCenter } from '@/common/components/elements/Container';
import { FetchProjectBySlug } from '../api/projects';
import { promises as fs } from 'fs';
import BackButton from '@/common/components/elements/BackButton';
import { formatDate } from '@/common/utils/Date';
import PageHeading from '@/common/components/elements/PageHeading';
import ProjectDetails from '@/modules/projectPage/components/ProjectDetails';
import path from 'path';


const ProjectSlugDetailPage = ({ project }) => {
  const PAGE_TITLE = project?.title || 'Project not found';
  const PAGE_DESCRIPTION = project?.description || '';

  const canonicalUrl = `htts://unforaimcode.vercel.app/projects/${project?.slug || ''}`;

  return (
    <>
      <NextSeo
        title={`${project?.title} - Project Muhammad Rahim`}
        description={project?.description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: project?.updated_at ? formatDate(project.updated_at) : 'Date not available',
            modifiedTime: project?.updated_at ? formatDate(project.updated_at) : 'Date not available',
            authors: ['Muhammad Rahim'],
          },
          url: canonicalUrl,
          images: [
            {
              url: project?.original_image,
            },
          ],
          siteName: 'Project Muhammad Rahim',
        }}
      />
      <ContainerCenter data-aos='fade-up'>
        <BackButton url='/projects' />
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <ProjectDetails project={project} />
      </ContainerCenter>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const projects = await FetchProjectBySlug(slug);

  if (!projects.length) {
    return { notFound: true };
  }

  const project = projects[0];
  if (project.updated_at?.toDate) {
    project.updated_at = project.updated_at.toDate().toISOString();
  }

  const filePath = path.join(process.cwd(), 'src', 'contents', 'projects', `${slug}.mdx`);
  let mdxContent = null;

  try {
    const mdxFile = await fs.readFile(filePath, 'utf8');
    mdxContent = mdxFile.toString();
  } catch (error) {
    // console.error(`MDX file for blog slug "${slug}" not found.`);
  }

  project.content = mdxContent;
  return { props: { project } };
}


export default ProjectSlugDetailPage;