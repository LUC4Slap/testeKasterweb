import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, FlatList, Text, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, ScrollView } from 'react-native';

import { FirstAccess, RealmContext } from '../frameworks/realm/context';
import { Button, Color, Heading, Spacing, Subtitle, UnorderedList } from '../styles';
import { Icon } from './Icon';
import { FirstSlideSVG, FourthtSlideSvg, SecondSlideSvg, ThirdSlideSvg } from './Svgs';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'IntroSlides'>;

const { useRealm, useQuery } = RealmContext;

export const IntroSlides = ({ navigation }: Props) => {
    const intervals = calculateIntervals(demo);
    const [selected, setSelected] = React.useState(0);
    const handleScroll = (input: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize } = input.nativeEvent;
        const currentPercentage = calculatePercentage(contentOffset.x, contentSize.width);
        const pageNumberIs = calculatePageNumber(intervals, currentPercentage);
        setSelected(pageNumberIs);
    };
    const scrollRef = React.useRef<null | FlatList<IDemo>>(null);
    const goToSlide = (input: number) => {
        if (scrollRef.current !== null) {
            const offSetX = input * width;
            scrollRef.current.scrollToOffset({ offset: offSetX });
        }
    };

    const db = useRealm();
    const firstAccess: Realm.Results<FirstAccess> = useQuery(FirstAccess);
    const changeFirstAccess = (state: boolean) =>
        db.write(() => {
            firstAccess[0].isFirstAccess = state;
        });
    return (
        <>
            <FlatList
                ref={scrollRef}
                data={demo}
                horizontal={true}
                onScroll={handleScroll}
                pagingEnabled={true}
                snapToInterval={width}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />
            <SlidesNavigator>
                <Dots dots={demo} selected={selected} />
                <SlideButtons
                    selected={selected}
                    goNext={() => goToSlide(selected + 1)}
                    goBack={() => goToSlide(selected - 1)}
                    goToLogin={() => {
                        navigation.replace('Login');
                        changeFirstAccess(false);
                    }}
                />
            </SlidesNavigator>
        </>
    );
};

const renderItem = ({ item }: { item: IDemo; }) => {
    return (
        <View style={styles.slideContainer}>
            <Text style={[Heading.h1, styles.header]}>{item.header}</Text>
            <Text style={[Subtitle[2], styles.subtitle]}>{item.subtitle}</Text>
            <View style={styles.svgContainer}>{item.svg}</View>
        </View>
    );
};

const SlidesNavigator = ({ children }: any) => {
    return (
        <View style={styles.navigatorContainer}>
            {children}
        </View>
    );
};

const Dots = ({ dots, selected }: { dots: IDemo[]; selected: number; }) => {
    return (
        <View style={styles.dotsContainer}>
            {dots.map((_, index) => (
                <Text key={index} style={[
                    UnorderedList.large, {
                        marginLeft:
                            index === 0 || index === dots.length
                                ? undefined
                                : Spacing[12],
                        color:
                            selected === index
                                ? Color.primary.riptide
                                : Color.primary.royalBlue,
                    }]}>{'\u2B24'}</Text>
            ))}
        </View>
    );
};

type IDemo = {
    id: string;
    header: string;
    subtitle: string;
    svg: JSX.Element;
};
const demo: IDemo[] = [
    { id: '1', header: 'Faça Suas Vendas', subtitle: 'Controle tudo pelo aplcativo', svg: FirstSlideSVG() },
    { id: '2', header: 'Cadastre Sua Empresa', subtitle: 'Seus clientes em um só lugar ', svg: SecondSlideSvg() },
    { id: '3', header: 'Cadastro de Produtos', subtitle: 'Controle de estoque e produtos', svg: ThirdSlideSvg() },
    { id: '4', header: 'Empresa Organizada', subtitle: 'Organização gera harmonia', svg: FourthtSlideSvg() },
];

const { width, height } = Dimensions.get('screen');

type ISlideButtons = {
    selected: number;
    goNext: () => void;
    goBack: () => void;
    goToLogin: () => void;
};
const SlideButtons = ({ selected, goNext, goBack, goToLogin }: ISlideButtons) => {
    return (
        <View style={styles.buttonsContainer}>
            <View style={{ flex: 1 }}>
                {selected > 0 && (
                    <TouchableOpacity
                        style={[styles.button, { left: Spacing[16] }]}
                        onPress={goBack}>
                        <Icon name="arrow" size={12} color={Color.primary.royalBlue} />
                        <Text style={[Button.default, styles.buttonText, styles.buttonPrevious]}>
                            Anterior
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                {selected != (demo.length - 1) && (
                    <TouchableOpacity
                        style={[styles.button, { right: Spacing[16] }]}
                        onPress={goNext}>
                        <Text style={[Button.default, styles.buttonText, styles.buttonNext]}>
                            Próximo
                        </Text>
                        <Icon name="arrow" size={12} color={Color.primary.royalBlue} style={{ transform: [{ rotateY: '180deg' }] }} />
                    </TouchableOpacity>
                )}
                {selected === (demo.length - 1) && (
                    <TouchableOpacity
                        style={[styles.button, { right: Spacing[16] }]}
                        onPress={goToLogin}>
                        <Text style={[Button.default, styles.buttonText, styles.buttonNext]}>
                            Login
                        </Text>
                        <Icon name="arrow" size={12} color={Color.primary.royalBlue} style={{ transform: [{ rotateY: '180deg' }] }} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const calculateIntervals = (values: IDemo[]): Array<number> => {
    const oneInterval = Math.round(100 / values.length);
    const intervals = values.map((_, index) => Math.round(oneInterval * index));
    return intervals;
};

const calculatePercentage = (currentOffSet: number, totalSize: number) => Math.round((Math.round(currentOffSet) / Math.round(totalSize)) * 100);

const calculatePageNumber = (intervals: Array<number>, percentage: number) => intervals.findIndex(elem => elem >= percentage);

const styles = StyleSheet.create({
    slideContainer: {
        width,
        height,
        backgroundColor: Color.neutral.white,
        paddingTop: '9.36%',
    },
    header: {
        color: Color.primary.royalBlue,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: Spacing[8],
        textAlign: 'center',
        color: Color.neutral.mineShaft,
    },
    svgContainer: {
        alignItems: 'center',
    },
    dotsContainer: {
        height: Spacing[24],
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    navigatorContainer: {
        backgroundColor: 'white',
        height: height * .24
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 24,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: Color.primary.royalBlue,
        paddingBottom: Spacing[2]
    },
    buttonPrevious: {
        marginLeft: Spacing[12],
    },
    buttonNext: {
        marginRight: Spacing[12],
    },
});