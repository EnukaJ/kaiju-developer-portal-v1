export interface iProject {
  id?: string;
  name: string;
  displayProjectId: string;
  accessKey: string;
  blockchain: string;
  rpcUrl: string;
  paymaster: string;
  bundlerUrl: string;
  allowedCallbackUrls: string[];
  allowedSignoutUrls: string[];
  userId: string;
  websiteUrl: string;
  description: string;
  logo: string;
  appClient: string;
}
