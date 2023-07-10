import { baseURLAppTest } from '../../../utils/api';
import { RunTimeForm } from '../../../utils/formData';
import { IAparelho, IColaborador } from './RegisterUser.routes';

export const listCompanies = async () => {
    try {
        const response = await baseURLAppTest.get(`/busca/empresas`);
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

export type ILinkInfo = { user_id: number, empresa_id: number; };
export const AppendForm = (inputs: ILinkInfo) => new RunTimeForm<ILinkInfo>().formData(inputs);

export type IAddCompany = {
    user_id: number,
    empresa_id: number,
    colaborador: IColaborador,
    aparelho: IAparelho;
};

export const addUserToCompany = async (inputs: IAddCompany, cnpj: string) => {
    try {
        const response = await baseURLAppTest.post(`/empresas/${cnpj}/vincular_usuario_empresa`, inputs, {
            headers: { 'Content-Type': 'application/json' },
        });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};