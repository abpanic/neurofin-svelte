import { APPWRITE_API_KEY_INIT } from '$env/static/private';
import { PUBLIC_APPWRITE_PROJECT_INIT_ID } from '$env/static/public';
import { Client, Databases } from '@appwrite.io/console';

const clientServer = new Client();
clientServer
    .setEndpoint('https://neurofin.cloud/v1')
    .setProject(PUBLIC_APPWRITE_PROJECT_INIT_ID)
    .setKey(APPWRITE_API_KEY_INIT);

export const appwriteInitServer = {
    databases: new Databases(clientServer)
};
