import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import PhoneInput from 'react-native-phone-number-input';

// import DocumentPicker from 'react-native-document-picker';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import ImagePicker from '../../../components/ImagePicker';
import ProfileImage from '../../../components/ProfileImage';
import NavService from '../../../helpers/NavService';
import {colors, size} from '../../../utils';
import {appLogos, appImages, appIcons} from '../../../assets/index';
import {loginUser} from '../../../redux/actions/authAction';
import styles from './styles';
import Shadows from '../../../helpers/Shadows';
import CustomText from '../../../components/CustomText';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import appStyles from '../../appStyles';
import Img from '../../../components/Img';

class CompleteProfile extends Component {
  state = {
    Firstname: '',
    DesiredName: '',
    phoneNumber: '',
    profileImage: null,
    Backimage: null,
    frontimage: null,
    pickedDocument: null,
    latitude: '',
    longitude: '',
    location: '',
    address: '',
  };

  onSubmit = () => {
    const {Firstname, phoneNumbers, DesiredName, Backimage, location} =
      this.state;
    console.log(phoneNumbers, 'phoneNumbersphoneNumbers');

    if (Firstname == '') {
      Toast.show({
        text1: 'First Name field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (DesiredName == '') {
      Toast.show({
        text1: 'Desired Name field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (location == '') {
      Toast.show({
        text1: 'location field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        role: 'user',
        Firstname: Firstname,
        DesiredName: DesiredName,
        email: 'abc@gmail.com',
        password: '123456',
      };
      Toast.show({
        text1: 'User Login Successfully',
        type: 'success',
        visibilityTime: 3000,
      });
      this.props.loginUser(payload);
    }
  };
  handleBackButtonClick() {
    NavService.replace('AppStarter');
  }
  componentWillUnmount() {
    // this?.handleBackButtonClick();
  }

  // pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     console.log(
  //       result.uri,
  //       result.type, // mime type
  //       result.name,
  //       result.size,
  //     );

  //     this.setState({pickedDocument: result});
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User canceled the picker
  //     } else {
  //       throw err;
  //     }
  //   }
  // };
  callback = (address, geometry) => {
    if (address) {
      this.setState({
        latitude: geometry?.location.lat,
        location: address,
        longitude: geometry?.location.lng,
      });
    } else {
      this.setState({location: ''});
    }
  };
  render() {
    const {
      Firstname,
      DesiredName,
      Backimage,
      frontimage,
      profileImage,
      pickedDocument,
      address,
      latitude,
      longitude,
      location,
    } = this.state;
    const {phoneNumbers, mail} = this?.props?.route?.params;
    console.log('address', address);
    // console.log(mail, 'mail');

    const updateImageInGallery = (path, mime, type) => {
      this.setState({
        profileImage: {path, mime, type},
      });
    };
    const updateImageInGallery1 = (path, mime, type) => {
      this.setState({frontimage: {path, mime, type}});
    };
    const updateImageInGallery2 = (path, mime, type) => {
      this.setState({Backimage: {path, mime, type}});
    };

    return (
      <CustomBackground
        showLogo={false}
        backgroundImage
        titleText={'Create Profile'}
        onBack={() => this.props.navigation.goBack()}>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 30,
            gap: 20,
          }}>
          <View style={styles.mainContainer}>
            <ImagePicker
              onImageChange={(path, mime, type) => {
                updateImageInGallery(path, mime, type);
              }}>
              <ProfileImage
                ViewStyle={{
                  justifyContent: 'center',
                  marginTop: 0,
                }}
                viewHeight={130}
                ViewWidth={130}
                widthsize={profileImage?.path ? 130 : 30}
                heightsize={profileImage?.path ? 130 : 30}
                ImageborderRadius={profileImage?.path ? 100 : 0}
                ViewBorderWidth={2}
                ViewborderColor={colors.secondary}
                // name={'aa'}
                innerAsset={profileImage == null ? true : false}
                imageUri={
                  profileImage !== null ? profileImage?.path : appIcons.camera
                }
              />
            </ImagePicker>
          </View>
          <View style={{gap: 10}}>
            <CustomTextInput
              label
              labeltext={'First Name'}
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={'First Name'}
              value={Firstname}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({Firstname: value})}
              containerStyle={styles.emailinput}
            />
            <CustomTextInput
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              textInputStyles={styles?.textInputStyles}
              placeholder={'Desired Name'}
              value={DesiredName}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({DesiredName: value})}
              containerStyle={styles.emailinput}
            />
            {mail ? (
              <CustomTextInput
                Lineiconcolor={colors.gray}
                Iconcolor={colors.secondary}
                placeholder={'Email'}
                editable={false}
                value={
                  mail.length <= 23
                    ? mail
                    : `${mail.toString().slice(0, 24)}...`
                }
                rightImage={appIcons.verify}
                tintColor={colors.secondary}
                keyboardType={'email-address'}
                rightimagetext={'Verified'}
                rightimagetextstyle={{color: 'red'}}
                onChangeText={value => this.setState({mail: value})}
                containerStyle={[
                  styles.emailinput,
                  {borderWidth: 1.5, borderColor: colors.secondary},
                ]}
                textInputStyles={
                  {
                    // width: 240,
                  }
                }
              />
            ) : (
              <View style={[appStyles.directionRow]}>
                <View>
                  <PhoneInput
                    ref={this.phoneInput}
                    codeTextStyle={{color: colors.gray}}
                    textInputProps={{
                      maxLength: 13,
                      color: 'black',
                      right: 10,
                      editable: false,
                      placeholderTextColor: colors.gray,
                    }}
                    disabled={true}
                    defaultValue={phoneNumbers ? phoneNumbers : phoneNumber}
                    defaultCode="US"
                    disableArrowIcon={true}
                    layout="second"
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textContainerPhone}
                    textInputStyle={{
                      padding: 0,
                      fontSize: size.small,
                    }}
                    textStyle={{fontSize: 10, color: colors.lightGray}}
                    countryPickerButtonStyle={[styles.countryPickerButtonStyle]}
                    onChangeText={text => {
                      this.setState({phoneNumber: text});
                    }}
                    onChangeFormattedText={text => {
                      this.setState({formattedValue: text});
                    }}
                    withDarkTheme
                    autoFocus
                  />
                  <Img
                    tintColor={colors.gray}
                    local
                    src={appIcons.line}
                    resizeMode={'cover'}
                    style={{
                      height: 40,
                      width: 0.75,
                      left: 55,
                      top: 8,
                      position: 'absolute',
                    }}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    // bottom: 0,
                    height: 55,
                    alignItems: 'center',
                    flexDirection: 'row',
                    right: 10,
                  }}>
                  <Img
                    tintColor={colors.secondary}
                    local
                    src={appIcons.verify}
                    resizeMode={'contain'}
                    style={{height: 20, width: 20, right: 5}}
                  />
                  <CustomText
                    text="Verified"
                    size={size?.xxsmall}
                    color={colors.secondary}
                    style={{
                      marginRight: 10,
                      ...appStyles.family_Poppins_SemiBold,
                    }}
                  />
                </View>
              </View>
            )}
            <GooglePlaceAutocomplete
              // addressText={location}
              handleAddressText={location => {
                this.setState({location: '', latitude: '', longitude: ''});
              }}
              placeholder={address ? address : 'Location'}
              rightIcon={appIcons.location}
              CheckIn={true}
              // val={location}
              isBorderShow
              callback={this.callback}
            />
            <View style={styles.uploadView}>
              <CustomText
                text="Upload Documents"
                style={styles.uploaddoctext}
              />
              <CustomText
                style={styles.uploaddocsubtext}
                text="(ldentification Government Card or Business Sales License)"
              />

              <View style={[styles.uploaddocuments]}>
                <ImagePicker
                  onImageChange={(path, mime, type) => {
                    updateImageInGallery1(path, mime, type);
                  }}>
                  <ProfileImage
                    ViewStyle={{
                      justifyContent: 'center',
                      marginTop: 0,
                      height: 102,
                      width: 160,
                      backgroundColor: colors.white,
                      borderRadius: 10,
                    }}
                    label
                    style={{
                      tintColor: frontimage?.path ? null : colors.primary,
                      borderRadius: frontimage?.path ? 10 : 0,
                      marginTop: 15,
                    }}
                    widthsize={frontimage?.path ? 160 : 20}
                    heightsize={frontimage?.path ? 102 : 20}
                    ImageborderRadius={frontimage?.path ? 0 : 0}
                    ViewBorderWidth={2}
                    ViewborderColor={colors.secondary}
                    name={frontimage?.path ? '' : 'Upload Front Image'}
                    innerAsset={frontimage == null ? true : false}
                    imageUri={
                      frontimage !== null ? frontimage?.path : appIcons.upload
                    }
                  />
                </ImagePicker>
                <ImagePicker
                  onImageChange={(path, mime, type) => {
                    updateImageInGallery2(path, mime, type);
                  }}>
                  <ProfileImage
                    ViewStyle={{
                      marginTop: 0,
                      height: 102,
                      width: 160,
                      backgroundColor: colors.white,
                      borderRadius: 10,
                    }}
                    label
                    style={{
                      tintColor: Backimage?.path ? null : colors.primary,
                      borderRadius: Backimage?.path ? 10 : 0,
                      marginTop: 15,
                    }}
                    widthsize={Backimage?.path ? 160 : 20}
                    heightsize={Backimage?.path ? 102 : 20}
                    ImageborderRadius={Backimage?.path ? 0 : 0}
                    ViewBorderWidth={2}
                    ViewborderColor={colors.secondary}
                    name={Backimage?.path ? '' : 'Upload Back Image'}
                    innerAsset={Backimage == null ? true : false}
                    imageUri={
                      Backimage !== null ? Backimage?.path : appIcons.upload
                    }
                  />
                </ImagePicker>
              </View>

              {/* <Button title="Pick a Document" onPress={this.pickDocument} />
              {pickedDocument && (
                <View>
                  <Text>Document Name: {pickedDocument.name}</Text>
                  <Text>Document Type: {pickedDocument.type}</Text>
                  <Text>Document Size: {pickedDocument.size} bytes</Text>
                </View>
              )} */}
            </View>
          </View>
          <CustomButton
            title="Continue"
            onPress={this.onSubmit}
            buttonStyle={{borderRadius: 10, bottom: 10}}
            textStyle={{fontSize: 15}}
          />
        </View>
      </CustomBackground>
    );
  }
}

const actions = {loginUser};
export default connect(null, actions)(CompleteProfile);
