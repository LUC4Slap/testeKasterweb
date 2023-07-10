import { baseURLTest } from '../../../utils/api';

export type ICredentials = { email: string; password: string; };

export const loginUser = async (credentials: ICredentials) => {
    try {
        const response = await baseURLTest.post('/login', credentials, {
            headers: { 'Accept': 'application/json' },
        });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};
