import SignIn from '@/app/(auth)/sign-in';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.react.aora",
    projectId: "669c8cb7003e7c70b435",
    databaseId: "669c8dca003b82b7f4c6",
    userCollectionId: "669c8de80021bc9d1e46",
    videosCollectionId: "669c8e05002f96b03dfe",
    storageId: "669c8f5b0023a0c7f4e2",
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platform)

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export const createUser = async (email: string, password: string, username: string) => {
        try {
           const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
           )

           if (!newAccount) throw Error;

           const avatarUrl = avatars.getInitials(username);
        
           await signIn(email, password);

           const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                username: username,
                email: email,
                avatar: avatarUrl,
                accountId: newAccount.$id
            }
           )

           return newUser;
        } catch (error: any) {
            console.error(error);  
            throw new Error(`Error occurred while creating user: ${error.message}`);
        }
    }

    export const signIn = async (email: string, password: string) => {
        try {
            
            const session = await account.createEmailPasswordSession(email, password);
            return session;

        } catch (error: any) {
            console.error(error);  
            throw new Error(`Error occurred while signing user: ${error.message}`);
        }
    }

    export const getCurrentUser = async () => {
        try {

            const currentAccount = await account.get();
            if (!currentAccount) throw Error;

            const currentUser = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                [Query.equal('accountId', currentAccount.$id)]
            )

            if (!currentUser) throw Error;
            
            return currentUser.documents[0];
        } catch(error: any) {
            console.error(error);  
            throw new Error(`Error occurred while fetching current user: ${error.message}`);
        }
    }

    export const getAllPosts = async () => {
        try {
            const posts = await databases.listDocuments(
                appwriteConfig.databaseId, 
                appwriteConfig.videosCollectionId
            )
            return posts.documents;
        } catch (error: any) {
            throw new Error(error);
        }

    }
;