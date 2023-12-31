import React, {Component} from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import styles from './styles';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Chats from '../../../components/Chats';
import Img from '../../../components/Img';
import {colors} from '../../../utils';
import ImagePicker from '../../../components/ImagePicker';
import SocialSheetPopup from '../../../containers/Popup/socialSheetPopup/socialSheetPopup';
import {goChatPops, goDetailsPops} from '../../../utils/dummyData';
import NavService from '../../../helpers/NavService';
import ModalPopup from '../../../containers/Popup/modalPopup/modalPopup';

class GroupChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          image: appIcons.dummy1,
          username: 'Jay Smith',
          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: false,
        },
        {
          image: appIcons.dummy1,
          username: 'Jay Smith',
          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: false,
        },
        {
          image: appIcons.dummy2,
          username: 'John Smith',
          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: true,
        },
        {
          image: appIcons.dummy2,
          username: 'John Smith',

          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: true,
        },
      ],
      isVisible: false,
      isModal: false,
      path: '',
    };
  }

  render() {
    const {messages, isVisible, isModal} = this.state;
    const {name} = this.props.route.params;

    console.log(name, 'name');
    let messageInput = React.createRef(null);
    let message = React.createRef('');

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    const sendNewMessage = async (type, image) => {
      console.log(type, '===type');
      console.log(image, '==image');
      if (message?.current?.length > 0 || image) {
        const currentMessages = [...messages];
        // currentMessages.push({
        //   message: image ? image : this.message.current,
        //   createdAt: '15 min',
        //   isMine: true,
        //   image: appImages.dummy2,
        //   username: 'User Name',
        // });
        image
          ? currentMessages.push({
              username: 'John Smith ',
              createdAt: '12:00 PM',
              isMine: true,
              dataImage: image,
            })
          : currentMessages.push({
              username: 'John Smith',
              message: message?.current,
              createdAt: '12:00 PM',
              isMine: true,
            });

        currentMessages.reverse();

        this.setState({messages: currentMessages});
        message.current = '';
        messageInput?.clear();
        // LayoutAnimation.linear();
        Keyboard.dismiss();
      } else {
        Toast.show({
          text1: 'Enter message',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    };
    const handleModalOption = _id => {
      if (_id == 0) {
        this?.setState({isVisible: false});
        NavService?.navigate('Information');
      } else if (_id == 2) {
        this?.setState({isVisible: false});
        NavService?.navigate('Participants');
      } else {
        this?.setState({isVisible: false});
        setTimeout(() => {
          this?.setState({isModal: true});
        }, 650);
      }
    };
    const handleClose = () => {
      this.setState({isVisible: false});
    };
    const handleClosed = () => {
      this.setState({isModal: false});
    };
    const handleSuccess = () => {
      this.setState({isModal: false});
      NavService?.navigate('DiscussionBoard');
    };
    return (
      <AppBackground
        title={name ? name : 'Lorem ispum dolor sit amet'}
        Rightimage
        rightIcon={appIcons?.dots}
        OnPressRight={() => {
          this?.setState({isVisible: true});
        }}
        back
        marginHorizontal={false}
        marginBottom={20}>
        <View style={styles.mainCont}>
          <FlatList
            inverted
            data={messages}
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
            contentContainerStyle={styles.listcont}
            renderItem={({item}) => <Chats item={item} />}
          />

          <View style={[styles.flexRow, styles.messageView]}>
            <View style={[styles.flexRow, styles.inputCont]}>
              <TouchableOpacity>
                <ImagePicker
                  onImageChange={(path, mime) => {
                    this.setState({path: path});
                    sendNewMessage('image', path);
                  }}>
                  <Img
                    local
                    src={appIcons.attachement}
                    style={styles.attachmentIcon}
                    resizeMode={'cover'}
                  />
                </ImagePicker>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9}>
                <Img
                  local
                  src={appIcons.line}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TextInput
                ref={input => {
                  messageInput = input;
                }}
                style={styles.textInput}
                placeholder="Your message here.....!"
                placeholderTextColor={colors.black}
                value={message}
                onChangeText={text => {
                  message.current = text;
                }}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  sendNewMessage('text');
                }}
                style={styles.sendCont}>
                <Img
                  local
                  src={appIcons.send}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <ModalPopup
                modalActive
                value={'Confirmation'}
                isVisible={isModal}
                desc={`Are you sure you want to leave this Discussion Board?`}
                sucessText="Yes"
                unsuccessText="No"
                handleClose={handleClosed}
                onBackButtonPress={handleClosed}
                onBackdropPress={handleClosed}
                onYesPress={handleSuccess}
                onNoPress={handleClosed}
              />
              <SocialSheetPopup
                isVisible={isVisible}
                data={goChatPops}
                onPress={handleModalOption}
                handleClose={handleClose}
                onBackButtonPress={handleClose}
                onBackdropPress={handleClose}
              />
            </View>
          </View>
        </View>
      </AppBackground>
    );
  }
}

export default GroupChat;
