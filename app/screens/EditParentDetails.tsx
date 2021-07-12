import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import { ButtonContainer, ButtonPrimary, ButtonText } from '@components/shared/ButtonGlobal';
import {
  ChildRelationList,
  FormContainer,
  FormDateAction, FormDateText,
  FormInputBox,
  FormInputGroup,
  LabelText,
  TextAreaBox
} from '@components/shared/ChildSetupStyle';
import { MainContainer } from '@components/shared/Container';
import Icon from '@components/shared/Icon';
import { RootStackParamList } from '@navigation/types';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { createRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable, SafeAreaView, Text, TextInput, View
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { ThemeContext } from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../App';
import { dataRealmCommon } from '../database/dbquery/dataRealmCommon';
import { ConfigSettingsEntity, ConfigSettingsSchema } from '../database/schema/ConfigSettingsSchema';
import { getAllChildren, getAllConfigData } from '../services/childCRUD';
import {
  Heading2w,
  Heading3, ShiftFromTop10
} from '../styles/typography';

type ChildSetupNavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  route:any,
  navigation: ChildSetupNavigationProp;
};

const EditParentDetails = ({route,navigation}: Props) => {
  const {userParentalRoleData,parentEditName}=route.params;
  const [relationship, setRelationship] = useState(userParentalRoleData?userParentalRoleData:"");
  const [relationshipName, setRelationshipName] = useState("");
  // const genders = ['Father', 'Mother', 'Other'];
  const relationshipData = useAppSelector(
    (state: any) =>
      JSON.parse(state.utilsData.taxonomy.allTaxonomyData).parent_gender,
  );
  let relationshipValue = relationshipData.length>0 && userParentalRoleData!="" ? relationshipData.find((o:any) => String(o.id) === userParentalRoleData):'';
  // console.log(relationshipName,"..relationshipName..");

  const actionSheetRef = createRef<any>();
  const themeContext = useContext(ThemeContext);
  const dispatch=useAppDispatch();
  const {t} = useTranslation();
  const [parentName, setParentName] = React.useState(parentEditName?parentEditName:"");
  const headerColor = themeContext.colors.PRIMARY_COLOR;
  useFocusEffect(
    React.useCallback(() => {
      getAllChildren(dispatch);
      getAllConfigData(dispatch);
     // console.log(relationshipValue.name,"..relationshipValue.name")
      setRelationshipName(relationshipValue!="" && relationshipValue!=null && relationshipValue!=undefined?relationshipValue.name:'');
 
       },[])
  );
  const saveParentData=async (relationship:String,parentName:any)=>{
    console.log(typeof(relationship),"typeof");
    var relationshipnew:any=relationship;
    if (typeof relationshipnew === 'string' || relationshipnew instanceof String){
      relationship=relationshipnew
    }
    else{
      relationship=String(relationshipnew);
    }
    let userParentalRole = await dataRealmCommon.updateSettings<ConfigSettingsEntity>(ConfigSettingsSchema, "userParentalRole", relationship);
    let userNames = await dataRealmCommon.updateSettings<ConfigSettingsEntity>(ConfigSettingsSchema, "userName",parentName);
    // console.log(userParentalRole,"..userParentalRole")
    // console.log(userNames,"..userNames")
    navigation.navigate('ChildProfileScreen');
  }
   
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: headerColor}}>
        <FocusAwareStatusBar animated={true} backgroundColor={headerColor} />
        <View
            style={{
              flexDirection: 'row',
              flex: 1,
              backgroundColor: headerColor,
              maxHeight: 50,
            }}>
            <View style={{flex: 1, padding: 15}}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name={'ic_back'} color="#FFF" size={15} />
              </Pressable>
            </View>
            <View style={{flex: 9, padding: 7}}>
              <Heading2w>
                {t('editParentTxt')}
              </Heading2w>
            </View>
          </View>
       
<MainContainer>
        <FormInputGroup
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}>
              <LabelText>{t('relationShipTxt')}</LabelText>

              <FormInputBox>
                <FormDateText>
                  <Text>{relationshipName ? relationshipName : 'Select'}</Text>
                </FormDateText>
                <FormDateAction>
                  <Icon name="ic_angle_down" size={10} color="#000" />
                </FormDateAction>
              </FormInputBox>
            </FormInputGroup>
            
        <ActionSheet ref={actionSheetRef}>
          <View>
            {
            relationshipData.map((item, index) => {
              return (
                <ChildRelationList key={index}>
                  <Pressable
                    onPress={() => {
                      if (typeof item.id === 'string' || item.id instanceof String){
                        setRelationship(item.id);
                      }
                      else{
                        setRelationship(String(item.id));
                      }
                      setRelationshipName(item.name);
                      actionSheetRef.current?.hide();
                    }}>
                    <Heading3>{item.name}</Heading3>
                  </Pressable>
                </ChildRelationList>
              );
            })}
          </View>
        </ActionSheet>
          <FormContainer>
            <LabelText>{t('parentNameTxt')}</LabelText>
            <TextAreaBox>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={30}
              clearButtonMode="always"
              onChangeText={(value:any) => { setParentName(value) }}
              value={parentName}
              // onChangeText={queryText => handleSearch(queryText)}
              placeholder={t('parentPlaceNameTxt')}
              
            /></TextAreaBox>
          </FormContainer>
          </MainContainer>
          <ShiftFromTop10>
          <ButtonContainer>
            
            <ButtonPrimary
              onPress={() => {
                saveParentData(relationship,parentName);
              }}>
              <ButtonText>{t('childSetupListsaveBtnText')}</ButtonText>
            </ButtonPrimary>
          </ButtonContainer>
          </ShiftFromTop10>
      </SafeAreaView>
    </>
  );
};

export default EditParentDetails;
