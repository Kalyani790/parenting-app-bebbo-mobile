import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import BurgerIcon from '@components/shared/BurgerIcon';
import WalkthroughContainer, {
  Slide,
  WalkthroughContentArea,
  WalkthroughImagebox,
  WalkthroughImageContainer,
  WalkthroughSubtext,
  WalkthroughTitle
} from '@components/shared/WalkthroughStyle';
import { HomeDrawerNavigatorStackParamList } from '@navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Heading2w } from '@styles/typography';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import VectorImage from 'react-native-vector-image';
import { ThemeContext } from 'styled-components';
type DashboardNavigationProp =
  StackNavigationProp<HomeDrawerNavigatorStackParamList>;
type Props = {
  navigation: DashboardNavigationProp;
};

const UserGuide = ({navigation}: Props) => {
  const {t} = useTranslation();
  const data = [
    {
      title: t('walkthroughTexts.1.title'),
      image: require('@assets/svg/ic_activity_color.svg'),
      colors: ['#0FD87E', '#CFF7E5'],
      textcolor:'#000',
      subtitle: t('walkthroughTexts.1.subtitle'),
    },
    {
      title: t('walkthroughTexts.2.title'),
      image: require('@assets/svg/ic_tools_color.svg'),
      colors: ['#00AEEF', '#50C7F3', '#97DEF8', '#B3E7FA'],
      textcolor:'#000',
      subtitle: t('walkthroughTexts.2.subtitle'),
    },
    {
      title: t('walkthroughTexts.3.title'),
      image: require('@assets/svg/ic_article_color.svg'),
      colors: ['#FF8D6B', '#FFD2C4'],
      textcolor:'#000',
      subtitle:t('walkthroughTexts.3.subtitle'),
    },
  ];
  const themeContext = useContext(ThemeContext);
  const headerColor = themeContext.colors.PRIMARY_COLOR;
  type Item = typeof data[0];
  const keyExtractor = (item: Item) => item.title;
  const [isDotsRequired, setIsDotsRequired] = useState(true);
  const getDotStyle = (colorString: string) => {
    return isDotsRequired
      ? {backgroundColor: colorString}
      : {backgroundColor: 'transparent'};
  };
  const renderItem = (item: typeof data[0], index: number) => {
    return (
      <>
        <WalkthroughContainer>
          <LinearGradient
            style={{flex: 1}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={item.colors}>
            <Slide>
              <WalkthroughImageContainer>
                {index == 0 ? (
                  <VectorImage source={item.image} />
                ) : index == 1 ? (
                  <WalkthroughImagebox>
                    <VectorImage
                      source={item.image}
                      style={{width: 130, height: 140}}
                    />
                  </WalkthroughImagebox>
                ) : index == 2 ? (
                  <WalkthroughImagebox>
                    <VectorImage
                      source={item.image}
                      style={{width: 123, height: 150}}
                    />
                  </WalkthroughImagebox>
                ) : (
                  <WalkthroughImagebox>
                    <VectorImage
                      source={item.image}
                      style={{width: 160, height: 123}}
                    />
                  </WalkthroughImagebox>
                )}
              </WalkthroughImageContainer>
              <WalkthroughContentArea>
                <WalkthroughTitle
                  style={[styles.titleText, {color: item.textcolor}]}>
                  {item.title}
                </WalkthroughTitle>
                <WalkthroughSubtext
                  style={[styles.title, {color: item.textcolor}]}>
                  {item.subtitle}
                </WalkthroughSubtext>
              </WalkthroughContentArea>
            </Slide>
          </LinearGradient>
        </WalkthroughContainer>
      </>
    );
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <FocusAwareStatusBar animated={true} backgroundColor={headerColor} />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: headerColor,
            maxHeight: 50,
          }}>
          <View style={{flex: 1}}>
            <BurgerIcon />
          </View>
          <View style={{flex: 5, padding: 8}}>
            <Heading2w> {t('userGuide.headerTitle')}</Heading2w>
          </View>
        </View>

        <View style={{flexDirection: 'column', flex: 1}}>
          <AppIntroSlider
            keyExtractor={keyExtractor}
            // renderItem={renderItem}
            renderItem={({item, index}) => renderItem(item, index)}
            // bottomButton
            dotClickEnabled
            showDoneButton={false}
            activeDotStyle={getDotStyle('black')}
            dotStyle={getDotStyle('white')}
            showSkipButton={false}
            showPrevButton={false}
            showNextButton={false}
            data={data}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default UserGuide;
const styles = StyleSheet.create({
  titleText: {
    color: '#fff',
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'roboto-bold',
    marginBottom: 20,
  },

  title: {
    padding: 5,
    // width: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#1cb278',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});
