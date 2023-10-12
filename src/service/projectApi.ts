import { nanoid } from 'nanoid';
import { iProject } from '@/types/Project';
import { fetchWithHeader } from './fetchWithHeaders';

type GetProjectByUserResponse = {
  code: string;
  data: iProject[];
  message: string;
};

type CreateProjectResponse = {
  code: string;
  data: iProject;
  message: string;
};

type DeleteProjectResponse = {
  code: string;
  data: {
    msg: string;
  };
  message: string;
};

type UploadProjectProfileImageResponse = {
  code: string;
  data: {
    url: {
      get: string;
      put: string;
    };
  };
  message: string;
};

type GenerateAccessKeyResponse = {
  code: string;
  data: {
    accessKey: string;
  };
  message: string;
};

export const getProjectsByUserId = async (
  userId: string
): Promise<iProject[]> => {
  const responseJson = (await fetchWithHeader(
    `project/getProjectsByUserId/${userId}`,
    'GET'
  )) as GetProjectByUserResponse;
  return responseJson.data;
};

export const createProject = async (
  newProject: iProject
): Promise<iProject> => {
  const responseJson = (await fetchWithHeader(
    `project/projects`,
    'POST',
    newProject
  )) as CreateProjectResponse;
  return responseJson.data;
};

export const updateProject = async (project: iProject): Promise<iProject> => {
  const responseJson = (await fetchWithHeader(
    `project/projects/${project.id}`,
    'PUT',
    project
  )) as CreateProjectResponse;
  return responseJson.data;
};

export const deleteProject = async (projectId: string): Promise<string> => {
  const responseJson = (await fetchWithHeader(
    `project/projects/${projectId}`,
    'DELETE'
  )) as DeleteProjectResponse;
  return responseJson.data.msg;
};

export const uploadProjectProfileImage = async (
  contentType: string
): Promise<{ url: { get: string; put: string } }> => {
  const responseJson = (await fetchWithHeader(
    `project/uploadProjectProfileImage/${nanoid()}`,
    'GET',
    undefined,
    contentType
  )) as UploadProjectProfileImageResponse;
  return responseJson.data;
};

export const uploadImage = async (
  url: string,
  contentType: string,
  image: File
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', contentType);

  await fetch(url, {
    method: 'PUT',
    headers: myHeaders,
    body: image,
    redirect: 'follow',
  });
};

export const generateAccessKey = async (projectId: string): Promise<string> => {
  const responseJson = (await fetchWithHeader(
    `project/generateAccessKey/${projectId}`,
    'POST'
  )) as GenerateAccessKeyResponse;
  return responseJson.data.accessKey;
};
