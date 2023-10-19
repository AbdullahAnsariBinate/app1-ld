import {
  Dimensions,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Toast from 'react-native-toast-message';
// import {Colors} from '../../../config';
import {colors, family, size} from '../../utils';
import CustomBackground from '../../components/CustomBackground';
// import SocialSignin from '../../../components/SocialSignin';
// import Icons from '../../../assets/Icons';
import {appIcons, appLogos} from '../../assets/index';
import Logo from '../../components/Logo';
import styles from './styles';
import CustomText from '../../components/CustomText';
import NavService from '../../helpers/NavService';
const {width} = Dimensions.get('window');

class App extends Component {
  state = {
    agreementModal: false,
    terms: false,
    policy: false,
    navigator: '',
  };

  render() {
    const {agreementModal, terms, policy, navigator} = this.state;
    const methods = [
      {
        name: 'Email',
        icon: appIcons.email,
        onPress: () => NavService.navigate('Login'),
        color: colors.primary,
      },
      {
        name: 'Phone Number',
        icon: appIcons.phone,
        color: colors.secondary,
        // onPress: () =>
        //   Toast.show({
        //     text1: 'Facebook login for app is not setup',
        //     type: 'error',
        //     visibilityTime: 3000,
        //   }),
        onPress: () => NavService.navigate('PhoneLogin'),

        // onPress: SocialSignin.Facebook,
      },

      {
        name: 'Apple',
        icon: appIcons.apple,
        color: colors.black,
        onPress: () =>
          Toast.show({
            text1: 'Apple login for app is not setup',
            type: 'error',
            visibilityTime: 3000,
          }),
        // onPress: SocialSignin.Apple,
      },
      {
        name: 'Google',
        icon: appIcons.googlePlus,
        color: colors.google,
        onPress: () =>
          Toast.show({
            text1: 'Google login for app is not setup',
            type: 'error',
            visibilityTime: 3000,
          }),
        // onPress: SocialSignin.Google,
      },
    ];
    const {navigation} = this.props;
    return (
      <CustomBackground
        backgroundImage
        back={false}
        showLogo={false}
        titleText={'Pre-Login'}>
        <View style={[styles.container, {padding: 50}]}>
          <View style={styles.space}>
            <Logo size={220} />
          </View>
          <View style={styles.space}>
            {methods.map((method, i) => {
              const {color, name, icon, onPress} = method;
              if (Platform.OS !== 'ios' && name === 'Apple') return null;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={i}
                  activeOpacity={0.8}
                  style={[styles.buttonContainer, {backgroundColor: color}]}>
                  <Image source={icon} style={styles.buttonInnerImage} />

                  <Text style={styles.buttonInnerText}>
                    Sign-in with {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.bottomView}>
            <CustomText
              style={styles.txt1}
              text={'By Sign-in, You Agree to our'}
            />

            <View style={styles.main}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://google.com/')}>
                <CustomText font={family?.Poppins_Bold} size={size?.xsmall} color={colors?.secondary} text={'Terms & Conditions'} />

              </TouchableOpacity>
              <CustomText font={family?.Poppins_Medium} size={size?.xsmall} color={colors?.black} style={{marginHorizontal:4
              }} text={'and'} />

              <TouchableOpacity
                onPress={() => Linking.openURL('https://google.com/')}>
                <CustomText font={family?.Poppins_Bold} size={size?.xsmall} color={colors?.secondary} text={'Privacy Policy'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}

export default App;
