import { AppDataSource } from '../data-source';
import { Project } from '../entities/Project';
import { ProjectPhoto } from '../entities/ProjectPhoto';
import { ProjectType } from '../entities/ProjectType';

export const createProject = async (projectData: any, user: any) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const projectPhotoRepository = AppDataSource.getRepository(ProjectPhoto);
  const projectTypeRepository = AppDataSource.getRepository(ProjectType);

  // ProjectType'i kontrol et veya oluştur
  let projectType = await projectTypeRepository.findOne({ where: { category: projectData.projectType } });
  if (!projectType) {
    projectType = new ProjectType();
    projectType.category = projectData.projectType;
    projectType = await projectTypeRepository.save(projectType);
  }

  const newProject = new Project();
  newProject.title = projectData.title;
  newProject.description = projectData.description;
  newProject.startDate = projectData.startDate;
  newProject.endDate = projectData.endDate;
  newProject.goalAmount = projectData.goalAmount;
  newProject.currentAmount = projectData.currentAmount || 0;
  newProject.student = user; // Eğer user öğrenci ise
  newProject.projectType = projectType;

  const savedProject = await projectRepository.save(newProject);

  if (projectData.photos && projectData.photos.length > 0) {
    const photos = projectData.photos.map((url: string) => {
      const photo = new ProjectPhoto();
      photo.url = url;
      photo.project = savedProject;
      return photo;
    });

    await projectPhotoRepository.save(photos);
  }

  return savedProject;
};

export const getProjects = async () => {
  const projectRepository = AppDataSource.getRepository(Project);
  
  const projects = await projectRepository.createQueryBuilder('project')
    .leftJoinAndSelect('project.student', 'student')
    .leftJoinAndSelect('student.user', 'user')
    .leftJoinAndSelect('project.projectType', 'projectType')
    .leftJoinAndSelect('project.photos', 'photos')
    .leftJoinAndSelect('student.school','university')
    .select([
      'project.id',
      'project.title',
      'project.description',
      'project.startDate',
      'project.endDate',
      'project.goalAmount',
      'project.currentAmount',
      'projectType.category',
      'photos.url',
      // 'student.school',
      'student.department',
      'university.name',
      'user.name',
      'user.surname',
      'user.username',
      'user.profilePicture',
    ])
    .getMany();

  return projects;
};


export const findProjectById = async (projectId: number): Promise<Project | null> => {
  const projectRepository = AppDataSource.getRepository(Project);
  return await projectRepository.findOne({ where: { id: projectId } });
};

export const updateProjectAmount = async (project: Project, amount: number): Promise<Project> => {
  const projectRepository = AppDataSource.getRepository(Project);
  project.currentAmount = (project.currentAmount || 0) + amount;
  return await projectRepository.save(project);
};