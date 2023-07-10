import { Realm, createRealmContext } from '@realm/react';
import { ITableNames } from '../../screens/sync/Sync';

export type IUser = {
    id: number,
    name: string,
    email: string,
    isLogged: boolean,
    empresas_id: Array<number>,
    current_company_id?: number;
};

export class User extends Realm.Object {
    id!: number;
    name!: string;
    email!: string;
    isLogged!: boolean;
    companies_id!: Array<number>;
    current_company_id?: number;

    static generate(user: IUser) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isLogged: user.isLogged,
            companies_id: user.empresas_id,
            current_company_id: user.current_company_id || undefined
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
            email: 'string',
            isLogged: 'bool',
            companies_id: 'int[]',
            current_company_id: 'int?'
        },
    };
}

export type ICompany = {
    id: number,
    cnpj: string,
    nome_razao: string,
    logo_blob: string;
};
export class Company extends Realm.Object {
    id!: number;
    cnpj!: string;
    nome_razao!: string;
    logo_blob!: string;

    static generate(company: ICompany) {
        return {
            id: company.id,
            cnpj: company.cnpj,
            logo_blob: company.logo_blob,
            nome_razao: company.nome_razao
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Company',
        primaryKey: 'id',
        properties: {
            id: 'int',
            nome_razao: 'string',
            cnpj: 'string',
            logo_blob: 'string'
        },
    };
}

export type ISync = {
    id?: string,
    user_id: number,
    name: string,
    last_sync?: Date;
};
export class Syncing extends Realm.Object {
    id?: string;
    user_id!: number;
    name!: ITableNames;
    last_sync?: Date;

    static generate(sync: ISync) {
        return {
            id: sync.id || new Realm.BSON.ObjectID().toHexString(),
            user_id: sync.user_id,
            name: sync.name,
            last_sync: sync.last_sync
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Sync',
        primaryKey: 'id',
        properties: {
            id: 'string',
            user_id: 'int',
            name: 'string',
            last_sync: 'date?'
        }
    };
}

//TODO: Pendente, atualmente depende da array access retornar outro valor além de vazio/nulo.
export type IAccess = {
    id: number,
    user_id: number,
    empresa_id: number,
    cod_sistema: number;
};
export class Access extends Realm.Object {
    id!: number;
    user_id!: number;
    empresa_id!: number;
    cod_sistema!: number;

    static generate(access: IAccess) {
        return {
            id: access.id,
            user_id: access.user_id,
            empresa_id: access.empresa_id,
            cod_sistema: access.cod_sistema
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Access',
        primaryKey: 'id',
        properties: {
            id: 'int',
            user_id: 'int',
            empresa_id: 'int',
            cod_sistema: 'string'
        }
    };
}

export type IProduct = {
    id: number,
    sku: string;
    nome: string,
    preco: number,
    estoque: number,
    marca_id: number,
    altura_cm: number,
    grupo_nome: string,
    largura_cm: number,
    unidade_id: number,
    empresa_id: number,
    categoria_id: number,
    peso_kg_bruto: number,
    comprimento_cm: number,
    complemento_sem_tags: string,
};
export class Product extends Realm.Object {
    id!: number;
    sku!: string;
    nome!: string;
    preco!: number;
    estoque!: number;
    unidade_id!: number;
    marca_id!: number;
    altura_cm!: number;
    largura_cm!: number;
    grupo_nome!: string;
    empresa_id!: number;
    categoria_id!: number;
    peso_kg_bruto!: number;
    comprimento_cm!: number;
    complemento_sem_tags!: string;

    static generate(product: IProduct): IProduct {
        return {
            id: product.id,
            sku: product.sku,
            nome: product.nome,
            preco: product.preco,
            estoque: product.estoque,
            marca_id: product.marca_id,
            altura_cm: product.altura_cm,
            empresa_id: product.empresa_id,
            largura_cm: product.largura_cm,
            unidade_id: product.unidade_id,
            grupo_nome: product.grupo_nome,
            categoria_id: product.categoria_id,
            peso_kg_bruto: product.peso_kg_bruto,
            comprimento_cm: product.comprimento_cm,
            complemento_sem_tags: product.complemento_sem_tags
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Product',
        primaryKey: 'id',
        properties: {
            id: 'int',
            sku: 'string',
            nome: 'string',
            preco: 'float',
            marca_id: 'int',
            estoque: 'float',
            empresa_id: 'int',
            unidade_id: 'int',
            categoria_id: 'int',
            altura_cm: 'double',
            largura_cm: 'double',
            grupo_nome: 'string',
            peso_kg_bruto: 'double',
            comprimento_cm: 'double',
            complemento_sem_tags: 'string',
        }
    };
}

export type IBrand = { id: number, nome: string, empresa_id: number; };
export class Brand extends Realm.Object {
    id!: number;
    nome!: string;
    empresa_id!: number;

    static generate(brand: IBrand) {
        return {
            id: brand.id,
            nome: brand.nome,
            empresa_id: brand.empresa_id
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Brand',
        primaryKey: 'id',
        properties: {
            id: 'int',
            nome: 'string',
            empresa_id: 'int'
        }
    };
}

export type ICategory = { id: number, empresa_id: number, nome: string; };
export class Category extends Realm.Object {
    id!: number;
    empresa_id!: number;
    nome!: string;

    static generate(category: ICategory) {
        return {
            id: category.id,
            empresa_id: category.empresa_id,
            nome: category.nome
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Category',
        primaryKey: 'id',
        properties: {
            id: 'int',
            nome: 'string',
            empresa_id: 'int'
        }
    };
}

//NOTE: HOW TO ADAPT FOR CLIENTS OF BOTH TYPES PESSOA FÍSICA E PESSOA JURÍDICA?
export type IClient = {
    id: number,
    email: number,
    user_id: number,
    telefone: string,
    cpf_cnpj: string,
    empresa_id: number,
    nome_completo: string,
    codigo_do_cliente: string;
};
export class Client extends Realm.Object {
    id!: number;
    user_id!: number;
    email!: string;
    telefone!: string;
    cpf_cnpj!: string;
    empresa_id!: number;
    nome_completo!: string;
    codigo_do_cliente!: string;

    static generate(client: IClient): IClient {
        return {
            id: client.id,
            user_id: client.user_id,
            email: client.email,
            cpf_cnpj: client.cpf_cnpj,
            telefone: client.telefone,
            empresa_id: client.empresa_id,
            nome_completo: client.nome_completo,
            codigo_do_cliente: client.codigo_do_cliente,
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Client',
        primaryKey: 'id',
        properties: {
            id: 'int',
            user_id: 'int',
            email: 'string',
            empresa_id: 'int',
            cpf_cnpj: 'string',
            telefone: 'string',
            nome_completo: 'string',
            codigo_do_cliente: 'string',
        }
    };
}

export type IAddress = {
    id: number;
    cep: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cliente_id: number;
    empresa_id: number;
    logradouro: string;
    complemento: string;
};

export class Address extends Realm.Object {
    id!: number;
    cep!: number;
    numero!: string;
    bairro!: string;
    cidade!: string;
    estado!: string;
    logradouro!: string;
    cliente_id!: number;
    empresa_id!: number;
    complemento!: string;


    static generate(address: IAddress) {
        return {
            id: address.id,
            cep: address.cep,
            numero: address.numero,
            bairro: address.bairro,
            cidade: address.cidade,
            estado: address.estado,
            logradouro: address.logradouro,
            cliente_id: address.cliente_id,
            empresa_id: address.empresa_id,
            complemento: address.complemento,
        };
    }


    static schema: Realm.ObjectSchema = {
        name: 'Address',
        primaryKey: 'id',
        properties: {
            id: 'int',
            cep: 'string',
            numero: 'string',
            bairro: 'string',
            cidade: 'string',
            estado: 'string',
            cliente_id: 'int',
            empresa_id: 'int',
            logradouro: 'string',
            complemento: 'string?'
        }
    };
}

export type IUnit = {
    id: number;
    nome: string;
    empresa_id: number;
};

export class Unit extends Realm.Object {
    id!: number;
    nome!: string;
    empresa_id!: number;

    static generate(unit: IUnit): IUnit {
        return {
            id: unit.id,
            nome: unit.nome,
            empresa_id: unit.empresa_id,
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'Unit',
        primaryKey: 'id',
        properties: {
            id: 'int',
            nome: 'string',
            empresa_id: 'int',
        }
    };
}

export type IProductPrice = {
    id: number;
    preco: number;
    produto_id: number;
    empresa_id: number;
    tabela_preco_id: number;
};

export class ProductPrice extends Realm.Object {
    id!: number;
    preco!: number;
    produto_id!: number;
    empresa_id!: number;
    tabela_preco_id!: number;

    static generate(productPrice: IProductPrice): IProductPrice {
        return {
            id: productPrice.id,
            preco: productPrice.preco,
            produto_id: productPrice.produto_id,
            empresa_id: productPrice.empresa_id,
            tabela_preco_id: productPrice.tabela_preco_id,
        };
    }

    static schema: Realm.ObjectSchema = {
        name: 'ProductPrice',
        primaryKey: 'id',
        properties: {
            id: 'int',
            preco: 'float',
            produto_id: 'int',
            empresa_id: 'int',
            tabela_preco_id: 'int',
        }
    };
}

export type IFirstAccess = { isFirstAccess?: boolean; };
export class FirstAccess extends Realm.Object {
    isFirstAccess?: boolean;

    static generate(firstAccess: IFirstAccess) {
        return { isFirstAccess: firstAccess.isFirstAccess };
    }

    static schema: Realm.ObjectSchema = {
        name: 'FirstAccess',
        properties: { isFirstAccess: { type: 'bool', default: true } }
    };
}
const configTask = {
    inMemory: true,
    schema: [
        User,
        Unit,
        Brand,
        Company,
        Syncing,
        Access,
        Client,
        Product,
        Address,
        Category,
        FirstAccess,
        ProductPrice,
    ]
};
export const RealmContext = createRealmContext(configTask);
