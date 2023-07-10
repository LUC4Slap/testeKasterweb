import { Asset } from 'react-native-image-picker';
import { baseURLAppTest } from '../../../utils/api';
import { RunTimeForm } from '../../../utils/formData';

type IRegisterCompayDTO = IRegisterCompayForm & IFile;

export type IRegisterCompayForm = {
    cnpj: string;
    email: string;
    nome_fantasia: string;
    nome_razao: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    telefone: string;
    responsavel: string;
    tipo: 'E' | 'C';
};

type IFileNameExcluded = Exclude<Asset, 'fileName'>;
type IAsset = IFileNameExcluded & { name: string | undefined; };
type IFile = { file: IAsset | undefined; };

export const RegisterCompanyDTO = (data: IRegisterCompayForm, image: Asset[] | undefined): IRegisterCompayDTO => ({
    cnpj: data.cnpj.replace(/\D/g, ''),
    email: data.email.toLowerCase(),
    nome_fantasia: data.nome_fantasia,
    nome_razao: data.nome_razao,
    file: image === undefined ? undefined : { uri: image[0].uri, name: image[0].fileName, type: image[0].type },
    telefone: data.telefone.replace(/\D/g, ''),
    responsavel: data.responsavel,
    bairro: data.bairro,
    logradouro: data.logradouro,
    numero: data.numero,
    cep: data.cep.replace(/\D/g, ''),
    tipo: data.tipo,
});

export const AppendForm = (inputs: IRegisterCompayDTO) => new RunTimeForm<IRegisterCompayDTO>().formData(inputs);

export const RegisterCompanyRequest = async (inputs: FormData) => {
    try {
        const response = await baseURLAppTest.post(
            '/empresas', inputs,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                transformRequest: formData => formData,
            });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};
