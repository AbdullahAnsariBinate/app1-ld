import {ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import styles from './styles';
import ProfileImage from '../../../components/ProfileImage';
import {colors} from '../../../utils';
import {appIcons} from '../../../assets';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import ModalPopup from '../../../containers/Popup/modalPopup/modalPopup';
import NavService from '../../../helpers/NavService';
class EditProfile extends Component {
  state = {
    profileImage: null,
    Firstname: 'John Smith',
    Backimage: null,
    frontimage: null,
    location: '',
    showModal: false,
  };
  callback = (address, geometry) => {
    this.setState({latitude: geometry?.location.lat});
    this.setState({longitude: geometry?.location.lng});
    this.setState({location: address});
  };
  onSubmit = () => {
    this?.setState({showModal: true});
    setTimeout(() => {
      this?.setState({showModal: false});
      NavService.goBack();
    }, 2400);
  };
  render() {
    const {
      Firstname,
      phoneNumbers,
      DesiredName,
      Backimage,
      frontimage,
      profileImage,
      location,
      showModal,
    } = this.state;
    const updateImageInGallery = (path, mime, type) => {
      this.setState({
        profileImage: {path, mime, type},
      });
    };
    const updateImageInGallery1 = (path, mime, type) => {
      this.setState({
        frontimage: {path, mime, type},
      });
    };
    const updateImageInGallery2 = (path, mime, type) => {
      this.setState({
        Backimage: {path, mime, type},
      });
    };
    const handleGoBack = () => {
      this.setState({showModal: false});
      NavService.goBack();
    };
    const handleClose = () => {
      this.setState({showModal: false});
    };
    return (
      <AppBackground
        showLogo={false}
        title={'Edit Profile'}
        back
        backgroundImage={null}
        titleText={'Edit Profile'}
        onBack={() => this.props.navigation.goBack()}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 15,
              bottom: 20,
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

              <GooglePlaceAutocomplete
                addressText={location}
                placeholder={'Washington, USA '}
                handleAddressText={location => this.setState({location})}
                iconColor={true}
                editprofile={true}
                valueEdit={'Nagan Chowrangi'}
                rightIcon={appIcons.location}
                CheckIn={true}
                val={location}
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
                        marginTop: 0,
                        height: 105,
                        width: 170,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        backgroundColor: 'white',
                        borderRadius: 10,
                      }}
                      label
                      style={{
                        // tintColor: !Backimage?.path ? null : null,
                        borderRadius: frontimage?.path ? 10 : 0,
                        marginTop: 15,
                      }}
                      widthsize={165}
                      heightsize={100}
                      ImageborderRadius={frontimage?.path ? 0 : 0}
                      ViewBorderWidth={2}
                      ViewborderColor={colors.secondary}
                      innerAsset={frontimage == null ? true : false}
                      imageUri={
                        frontimage == null
                          ? appIcons.certificate
                          : frontimage?.path
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
                        height: 105,
                        width: 170,
                        borderWidth: 1,
                        borderStyle: 'dashed',

                        backgroundColor: 'white',
                        borderRadius: 10,
                      }}
                      label
                      style={{
                        // tintColor: !Backimage?.path ? null : null,
                        borderRadius: Backimage?.path ? 10 : 0,
                        marginTop: 15,
                      }}
                      widthsize={165}
                      heightsize={100}
                      ImageborderRadius={Backimage?.path ? 0 : 0}
                      ViewBorderWidth={2}
                      ViewborderColor={colors.secondary}
                      innerAsset={Backimage == null ? true : false}
                      imageUri={
                        Backimage == null
                          ? appIcons.certificate
                          : Backimage?.path
                      }
                    />
                  </ImagePicker>
                </View>
              </View>
              <ModalPopup
                congratulation
                modalActive
                value={'Success'}
                isVisible={showModal}
                desc={`Profile updated successfully.`}
                onPress={handleGoBack}
                handleClose={handleClose}
                onBackButtonPress={handleClose}
                onBackdropPress={handleClose}
                // onGoBack={() =>

                // }
              />
            </View>
            <CustomButton
              title="Save"
              onPress={this.onSubmit}
              buttonStyle={styles.btn}
              textStyle={styles.btntext}
            />
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

export default EditProfile;
