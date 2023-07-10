import DeviceInfo from 'react-native-device-info';

import { baseURLAppTest } from '../../../utils/api';

//TODO: is this a dto?
type IRegisterUser = {
    name: string;
    email: string;
    cpf: string;
    celular: string;
    password: string;
    role: 'Vendedor';
};

export type IRegisterUserForm = IRegisterUser & {
    cnpj: string;
    passwordConfirmation: string;
    cod_sistema: number;
};

type IRegisterUserDTO = IRegisterUser & {
    colaborador: IColaborador;
    aparelho: IAparelho;
};

export type IColaborador = {
    cod_sistema: number;
    editar_preco: 1 | 0;
    sync_cliente: 1 | 0;
    multi_acesso: 1 | 0;
    criar_cliente: 1 | 0;
    reset_kvendas: 1 | 0;
    cargo_id: number;
};

export type IAparelho = {
    numero_serie: string;
    marca: string;
    modelo: string;
    authorization_key: null;
    date_authorization_key: null;
};


export const RegisterUserDTO = (data: IRegisterUserForm): IRegisterUserDTO => ({
    name: data.name,
    email: data.email,
    celular: data.celular,
    cpf: data.cpf,
    password: data.password,
    role: data.role,
    colaborador: {
        cod_sistema: data.cod_sistema,
        editar_preco: 0,
        sync_cliente: 0,
        multi_acesso: 0,
        criar_cliente: 0,
        reset_kvendas: 0,
        cargo_id: 1,
    },
    aparelho: {
        numero_serie: DeviceInfo.getUniqueId(),
        marca: DeviceInfo.getBrand(),
        modelo: DeviceInfo.getModel(),
        authorization_key: null,
        date_authorization_key: null,
    },
});

export const RegisterUserRequest = async (data: IRegisterUserDTO, cnpj: string) => {
    try {
        const response = await baseURLAppTest.post(`/empresas/${cnpj}/usuarios`, data,
            {
                headers: { 'Accept': 'application/json' },
            });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};
