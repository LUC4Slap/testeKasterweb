import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BottomSheet } from '../../components';
import { RootStackParamList } from '../../App';
import { Brand, Product, Unit, RealmContext } from '../../frameworks/realm/context';
const { useObject } = RealmContext;
import { Color, Spacing } from '../../styles';
import {
  Container,
  DescriptionText,
  dimension,
  HeaderArrow,
  ImageOverlay,
  ProductImage,
  ProductRowSubtitle,
  ProductRowValues,
  SectionHeader,
  SheetContentContainer,
  SheetContentHeader,
} from './Components';

type Props = NativeStackScreenProps<RootStackParamList, 'InformacoesProduto'>;
export function ProductInfo({ navigation, route }: Props) {
  const { product_id } = route.params;
  const product: Product | undefined = useObject(Product, product_id);
  const brand: Brand | undefined = useObject(Brand, product?.marca_id || 0);
  const unit: Unit | undefined = useObject(Unit, product?.unidade_id || 0);

  //TODO: add dynamic status to product status
  const goBack = () => navigation.goBack();
  return (
    <Container>
      <ProductImage>
        <ImageOverlay />
        <HeaderArrow
          text='Detalhes'
          colorText={Color.neutral.white}
          colorIcon={Color.primary.riptide}
          onPress={goBack} />
      </ProductImage>
      <BottomSheet initialY={dimension.height * 0.34}>
        <SheetContentContainer>
          <SheetContentHeader title={product?.nome || 'Default'} stock={product?.estoque || 0 > 0 ? true : false} />
          <ProductRowSubtitle
            first="Código do Produto"
            second="Estoque Disp."
            third="Preço de Venda"
            alignLastColum="center"
          />
          <ProductRowValues
            first={product?.sku || '0'}
            second={product?.estoque.toString() || '0'}
            third={`R$ ${product?.preco.toFixed(2) || 0}`}
            alignLastColum="center"
            priceHighlight={true}
          />

          <SectionHeader title="Descrição" marginTop={Spacing[16]} />
          <DescriptionText text={product?.complemento_sem_tags || 'Default'} />

          <SectionHeader title="Características" marginTop={Spacing[16]} />
          <ProductRowSubtitle first="Marca" second="Grupo" third="Sub-Grupo" />
          <ProductRowValues
            first={brand?.nome || 'Default'}
            second={product?.grupo_nome || 'Default'}
            third="Sem categoria"
          />

          <ProductRowSubtitle
            first="Cor"
            second="Comprimento"
            third="Largura"
          />
          <ProductRowValues first="Azul" second={`${product?.comprimento_cm || 0} cm`} third={`${product?.largura_cm || 0} cm`} />

          <ProductRowSubtitle first="Volume" second="Peso" third="Unidade" />
          <ProductRowValues first="0" second={`${product?.peso_kg_bruto || 0} kg`} third={unit?.nome || 'Default'} />
        </SheetContentContainer>
      </BottomSheet>
    </Container>
  );
}
