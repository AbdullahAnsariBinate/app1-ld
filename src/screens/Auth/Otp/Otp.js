import React, { useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomBackground from '../../../components/CustomBackground';
import NavService from '../../../helpers/NavService';
import {appLogos} from '../../../assets/index';
import styles from './styles';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils';

const Otp = ({navigation, route}) => {
  const {screenName, phoneNumbers, mail} = route.params;
  let timer;
  const [code, setCode] = useState('');
  const [timerCode, setTimerCode] = useState(59);
  const [resend, setResend] = useState(false);
  const [key, setKey] = useState(0);

  const handleCodeFilled = code => {
    setCode(code);
    const {role, phoneNumbers, mail} = route?.params;
    // console.log(code, 'otppp');
    if (!code || code.length === 0) {
      Toast.show({
        text1: 'OTP field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (code !== '123456') {
      Toast.show({
        text1: 'Invalid OTP verification code.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      NavService.replace('CompleteProfile', {
        phoneNumbers: phoneNumbers,
        mail: mail,
      });
      Keyboard.dismiss();
    }
  };

  const onCompleteTimer = () => {
    // setResendOtpActive(true);
    setResend(true);
  };
  const handleReset = () => {
    const phoneAlert =
      'OTP verification code has been resend to your Phone Number.';
    const emailAlert =
      'OTP verification code has been resend to your Email Address.';
    if (resend) {
      Keyboard.dismiss();
      setTimerCode(59);
      Toast.show({
        text1: phoneNumbers ? phoneAlert : emailAlert,
        type: 'success',
        visibilityTime: 3000,
      });
      setResend(false);
      setCode('');
      setKey(prevKey => prevKey + 1); // Update the key value to trigger re-render

      // Show a toast message when the "Resend" button is pressed
      // Toast.show({
      //   text1: 'We have resend you the verification code.',
      //   type: 'success',
      //   visibilityTime: 3000,
      // });
    } else {
      Toast.show({
        text1: 'Please wait until the timer finishes!',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <CustomBackground
      showLogo={false}
      backgroundImage
      titleText={'Verification'}
      onBack={() => NavService.navigate('AppStarter')}>
      <View style={styles.container}>
        <View style={[styles.container, {marginTop: 10}]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -20,
            }}>
            <CustomText
              style={styles.title}
              text="We have sent you a six-digits onetime "
            />
            <CustomText
              style={styles.title}
              text="password on your email address / phone"
            />
            <CustomText
              style={styles.title}
              text="
            number with instructions. Please follow the"
            />
            <CustomText
              style={styles.title}
              text="
            instructions to sign-in."
            />
          </View>
          <OTPInputView
            keyboardType="numeric"
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad={false}
            onCodeChanged={c => setCode(c)}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={c => handleCodeFilled(c)}
            code={code}
          />
          <View style={styles.clock}>
            <CountdownCircleTimer
              isPlaying
              rotation={'counterclockwise'}
              key={key}
              duration={59}
              colors={[colors.secondary, colors.primary]}
              colorsTime={[6, 4]}
              size={120}
              onComplete={onCompleteTimer}>
              {({remainingTime}) => {
                const minutes = Math.floor((remainingTime % 3600) / 59);
                const seconds = remainingTime % 59;
                return (
                  <View
                    style={{
                      backgroundColor: '#7AD8FC',
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomText
                      text={`00:${
                        minutes < 10 ? '0' + minutes && seconds : minutes && seconds
                      }`}
                      style={styles.time}
                    />
                  </View>
                );
              }}
            </CountdownCircleTimer>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.textNormal}>Code didn't received? </Text>
          <TouchableOpacity
            disabled={resend ? false : true}
            onPress={() => handleReset()}>
            <Text
              style={[
                styles.textNormalWithColor,
                !resend ? styles.disabledResend : {},
              ]}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBackground>
  );
};

export default Otp;
