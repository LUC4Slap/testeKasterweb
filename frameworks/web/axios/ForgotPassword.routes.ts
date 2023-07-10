import { baseURLTest } from '../../../utils/api';

export const forgotPasswordRequest = async (input: FormData) => {
    try {
        const response = await baseURLTest.post('/forgot-password', input, {
            headers: { 'Content-Type': 'multipart/form-data' },
            transformRequest: formData => formData,
        });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};
