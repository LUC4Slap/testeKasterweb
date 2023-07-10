import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity, FlatList, Linking, Dimensions } from 'react-native';
import { RootStackParamList } from '../../App';


import {
  Header,
  InputWithIconAndClear,
  BasicButton,
  BottomSheetPureReact,
} from '../../components';
import { Color, Spacing } from '../../styles';
import { BottomSheetHeader, ContactImage, ContactRow, Container, ImageContactWrapper, Question, QuestionText } from './Components';

// const newLineURI = '%0A';
// const newLineTag = '<br>';

type Props = NativeStackScreenProps<RootStackParamList, 'AjudaESuporte'>;
export function Help({ navigation }: Props) {
  const goBack = () => navigation.goBack();

  const [input, setInput] = useState('');
  const clearFn = () => setInput('');

  const [currentIndex, setIndex] = useState<string | undefined>('0');
  const switchQuestion = (index: string) =>
    setIndex(prevIndex => (typeof prevIndex === 'string' ? undefined : index));

  const openURL = (url: string) => Linking.openURL(url);

  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);

  return (
    <>
      <Container>
        <Header text="Suporte" leftIconFn={goBack} />
        <InputWithIconAndClear
          input={input}
          setInput={text => setInput(text)}
          placeholder="Buscar"
          leftIcon={true}
          clearIcon={input.length > 0 ? true : false}
          clearFn={clearFn}
          marginHorizontal={Spacing[16]}
          marginTop={Spacing[16]}
          marginBottom={28}
        />
        <FlatList
          data={mockQuestions}
          keyExtractor={item => item.id}
          renderItem={({ item: { id, header, text } }) => (
            <Question
              index={id}
              text={header}
              currentIndex={currentIndex}
              toggle={() => switchQuestion(id)}>
              <QuestionText text={text} />
            </Question>
          )}
        />
        <BasicButton
          text="Entrar em contato"
          colorText={Color.primary.riptide}
          colorButton={Color.primary.royalBlue}
          marginHorizontal={Spacing[16]}
          marginTop={Spacing[32]}
          marginBottom={Spacing[14]}
          onPress={toggleVisibility}
        />

        <BottomSheetPureReact
          isVisible={isVisible}
          onClose={() => setVisible(false)}
          height={dimension.height * 0.39}>
          <BottomSheetHeader />
          <ContactRow
            icon="mail"
            title="E-mail"
            text="meajuda@kasterweb.com.br"
            onPress={() => undefined
              // openURL(
              //   `mailto:meajuda@kasterweb.com.br?subject=Kvendas2 - Suporte App&body=${supportText(
              //     newLineTag,
              //     {company: '123', user: '123'},
              //   )}`,
              // )
            }
          />

          <ContactRow
            icon="incoming-call"
            title="Telefone"
            text="(65) 2127-1459"
            onPress={() => openURL('tel:+556521271459')}
          />

          <ContactRow
            icon="smartphone"
            title="Celular"
            text="(65) 9 9202-6267"
            onPress={() => openURL('tel:+5565992026267')}
          />

          <ImageContactWrapper>
            <ContactRow
              icon="whats-app"
              title={"What's App"}
              text="(65) 9 9202-6267"
              onPress={() => undefined
                // openURL(
                //   `https://wa.me/+5565992026267?text=${supportText(newLineURI, {
                //     company: company[0],
                //     user: user[0],
                //   })}`,
                // )
              }
            />
            <TouchableOpacity
              onPress={() => openURL('https://kasterweb.com.br')}>
              <ContactImage />
            </TouchableOpacity>
          </ImageContactWrapper>
        </BottomSheetPureReact>
      </Container>
    </>
  );
}



const mockQuestions = [
  {
    id: '0',
    header: 'Como adicionar novo cliente?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
  {
    id: '1',
    header: 'Como cadastrar novo pedido?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
  {
    id: '2',
    header: 'Como editar um pedido já cadastrado?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
  {
    id: '3',
    header: 'Como compartilhar um pedido com um cliente?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
  {
    id: '4',
    header: 'Como alterar o vendedor?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
  {
    id: '5',
    header: 'Como sincronizar os dados?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
  {
    id: '6',
    header: 'Não consigo sincronizar os dados?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim ipsum ex, eget volutpat sapien mattis ac. Donec sodales augue at interdum interdum. Mauris turpis nisi, posuere eu nibh sed, facilisis tincidunt urna. Nullam vulputate, velit non venenatis feugiat, ligula tortor ultricies magna, ac viverra nulla neque dapibus enim. Nullam vel enim porttitor, porttitor nibh eget, rhoncus magna. Praesent pharetra, ipsum sit amet fringilla venenatis, odio eros sollicitudin odio, nec lacinia neque libero feugiat nisl.',
  },
];



const dimension = Dimensions.get('screen');