import React, { useReducer, createContext } from 'react';

const initialOrderEmpty: IOrder = {
    type: '',
    client: '',
    payment: '',
    address: '',
    products: [],
    total: 0,
    totalProductsWithoutDiscount: 0,
    totalProductsWithDiscount: 0,
    generalDiscountPercentage: 0,
    generalDiscountReais: 0,
    // totalWithoutDiscount: 0,
    discountPercentage: 0,
    discountReais: 0,
    deliveryFee: 0,
};

export const OrderContext = createContext<IOrder>(initialOrderEmpty);
export const OrderDispatchContext = createContext<React.Dispatch<any> | null>(null);

export function OrderProvider({ children }: { children: React.ReactElement; }) {
    const [orders, dispatch] = useReducer(ordersReducer, initialOrder);
    return (
        <OrderContext.Provider value={orders}>
            <OrderDispatchContext.Provider value={dispatch}>
                {children}
            </OrderDispatchContext.Provider>
        </OrderContext.Provider>
    );
}

function ordersReducer(state: IOrder, action: IAction): IOrder {
    switch (action.type) {
        case "new-order": {
            return Object.assign(state, action.payload);
        }
        case "select-product": {
            state.products = state.products.concat(action.payload);
            state.totalProductsWithoutDiscount = state.products.reduce((acc: number, curr: IProductCtx) => acc + Number(curr.price * curr.quantity), 0);
            state.totalProductsWithDiscount = state.products.reduce((acc: number, curr: IProductCtx) => acc + Number(curr.total), 0);
            state.discountReais = state.products.reduce((acc: number, curr: IProductCtx) => acc + curr.discountReais, 0);
            return state;
        }
        case "edit-product": {
            const { data, idx } = action.payload;
            state.products[idx] = data;
            return state;
        }
        case "edit-order-discounts": {
            const orderEdits = action.payload;
            state.generalDiscountPercentage = orderEdits.generalDiscountPercentage;
            state.generalDiscountReais = orderEdits.generalDiscountReais;
            state.deliveryFee = orderEdits.deliveryFee;
            state.total = orderEdits.total;
            return state;
        }
        default:
            return state;
    }
}

const initialOrder: IOrder = {
    type: 'Orçamento',
    // client: '152 - Bjarne Stroustrup',
    client: '',
    payment: '2 - Pix',
    // address: 'Av. Agrícola Paes de Barros, 790 - Cuiabá (MT)',
    address: '',
    products: [],
    discountPercentage: 0,
    discountReais: 0,
    deliveryFee: 0,
    // totalWithoutDiscount: 0,
    totalProductsWithoutDiscount: 0,
    totalProductsWithDiscount: 0,
    generalDiscountPercentage: 0,
    generalDiscountReais: 0,
    total: 0,
};

export type IProductCtx = {
    id: number,
    nome: string;
    name: string,
    preco: any;
    price: number,
    total: number;
    estoque: any;
    quantity: number;
    discountPercentage: number;
    discountReais: number;
};

export type IOrder = {
    type: string;
    client: string;
    payment: string;
    address: string;
    deliveryFee: number;
    discountReais: number;
    products: Array<IProductCtx>;
    total: number;
    // totalWithoutDiscount: number;
    totalProductsWithDiscount: number;
    totalProductsWithoutDiscount: number;
    generalDiscountPercentage: number;
    generalDiscountReais: number;
    discountPercentage: number;
};

type IAction = { type: string, payload: any; };