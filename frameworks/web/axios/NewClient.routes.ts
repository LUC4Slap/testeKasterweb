import { baseURLAppTest } from "../../../utils/api";

export interface ICorporateAPI extends INewClient {
    nome_fantasia?: string,
    inscricao_estadual: string,
}

interface ICorporateAPIRoute extends Omit<INewClient, 'data_nascimento'> {
    nome_fantasia?: string,
    inscricao_estadual: string,
    data_nascimento: string;
}

//tipo = C (cliente) / A (Cliente e Fornecedor)
export type INewClient = {
    tipo_pessoa: 'f' | 'j',
    nome_completo: string,
    email: string,
    data_nascimento: string,
    celular: string,
    cpf_cnpj: string,
    vlr_limite_credito?: string,
    vlr_frete?: string,
    percentual_desconto?: string,
    tabela_preco_id?: number,
    vendedor_id: number,
    empresa_id: number,
    tipo: 'C' | 'A',
    sexo: 'M' | 'F';
};

interface INewClientRoute extends Omit<INewClient, 'data_nascimento'> {
    data_nascimento: Date;
}

export const RegisterNewClient = async (input: ICorporateAPIRoute | INewClientRoute) => {
    try {
        const response = await baseURLAppTest.post(
            `/k-vendas/novo-cliente`,
            input, {
            headers: { 'Accept': 'application/json' }
        });
        return Promise.resolve(response);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

type IGetSellersPriceTable = { empresa_id: number; };
export const GetSellers = async ({ empresa_id }: IGetSellersPriceTable) => {
    try {
        const response = await baseURLAppTest.get(
            `/k-vendas/vendedores?empresa_id=${empresa_id}`
        );
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const GetPriceTable = async ({ empresa_id }: IGetSellersPriceTable) => {
    try {
        const response = await baseURLAppTest.get(
            `/k-vendas/tabela-preco-id?empresa_id=${empresa_id}`
        );
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};