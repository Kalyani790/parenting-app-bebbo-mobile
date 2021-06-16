import ChildDate from '@components/ChildDate';
import {
  ButtonPrimary, ButtonRow, ButtonText
} from '@components/shared/ButtonGlobal';
import {
  ChildCenterView,
  ChildContentArea, ChildRelationList, ChildSection, FormDateAction, FormDateText, FormInputBox, FormInputGroup, LabelText
} from '@components/shared/ChildSetupStyle';
import Icon from '@components/shared/Icon';
import OnboardingContainer from '@components/shared/OnboardingContainer';
import OnboardingHeading from '@components/shared/OnboardingHeading';
import { RootStackParamList } from '@navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { createRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {
  Heading1Centerw,
  Heading3
} from '../styles/typography';


type ChildSetupNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChildSetupList'
>;

type Props = {
  navigation: ChildSetupNavigationProp;
};

const ChildSetup = ({navigation}: Props) => {
  const [relationship, setRelationship] = useState('');
  const genders = ['Father', 'Mother', 'Other'];
  const actionSheetRef = createRef();
  return (
    <>
      <OnboardingContainer>
        <OnboardingHeading>
          <ChildCenterView>
            <Heading1Centerw>
              Please take a moment to personalize your app
            </Heading1Centerw>
          </ChildCenterView>
        </OnboardingHeading>

        <ChildContentArea>
          <ChildSection>
            <ChildDate />

            <FormInputGroup
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}>
              <LabelText>Relationship with child</LabelText>

              <FormInputBox>
                <FormDateText>
                  <Text>{relationship ? relationship : 'Select'}</Text>
                </FormDateText>
                <FormDateAction>
                  <Icon name="ic_angle_down" size={10} color="#000" />
                </FormDateAction>
              </FormInputBox>
            </FormInputGroup>
          </ChildSection>
        </ChildContentArea>

        <ActionSheet ref={actionSheetRef}>
          <View>
            {genders.map((item, index) => {
              return (
                <ChildRelationList key={index}>
                  <Pressable
                    onPress={() => {
                      setRelationship(item);
                      actionSheetRef.current?.hide();
                    }}>
                    <Heading3>{item}</Heading3>
                  </Pressable>
                </ChildRelationList>
              );
            })}
          </View>
        </ActionSheet>

        <ButtonRow>
          <ButtonPrimary
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'ChildSetupList'}],
              });
              // navigation.navigate('ChildSetupList')
            }}>
            <ButtonText>Continue</ButtonText>
          </ButtonPrimary>
        </ButtonRow>
      </OnboardingContainer>
    </>
  );
};

export default ChildSetup;
