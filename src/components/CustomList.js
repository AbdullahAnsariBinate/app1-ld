import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, family, size} from '../utils';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import Shadows from '../helpers/Shadows';
import {appIcons} from '../assets';
import appStyles from '../screens/appStyles';
import GroupImages from './GroupImages';
import GroupList from './GroupList';
import {_grouplist} from '../utils/dummyData';
const {height, width} = Dimensions?.get('screen');

const CustomList = props => {
  const {
    _item,
    color,
    customStylesRow2,
    onPress,
    customContainer,
    statusColor,
    Board,
    Status,
    Star,
    _title2,
  } = props;

  return (
    <View style={[styles?.container, customContainer]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles?.innerContainer}>
        {_item?.profile && (
          <View style={styles?.imgWrapper}>
            <CustomIcon
              size={height / 18}
              src={_item?.profile}
              resizeMode="cover"
              customIconStyle={styles?.customIconStyle}
              customIconWrapper={styles?.customIconWrapper}
            />
          </View>
        )}
        <View style={styles?.middle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              text={_item?.name ? _item?.name : _title2}
              color={color ? color : colors?.secondary}
              font={family?.Poppins_SemiBold}
              size={size?.small}
            />
            {Board ? (
              <CustomIcon
                src={appIcons.searchno}
                resizeMode="contain"
                customIconStyle={styles?.customIconStyle}
                customIconWrapper={styles?.searchno}
              />
            ) : Status ? (
              <CustomText
                text={_item?.status ? _item?.status : _title2}
                color={statusColor ? statusColor : colors?.primary}
                font={family?.Poppins_SemiBold}
                size={size?.xxsmall}
              />
            ) : null}
          </View>
          {_item?.message ? (
            <CustomText
              text={
                _item?.message?.length <= 25
                  ? _item?.message
                  : `${_item?.message?.slice(0, 26)}...`
              }
              color={color ? color : colors?.black}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
              numberOfLines={1}
            />
          ) : _item?.description ? (
            <CustomText
              text={_item?.description}
              color={color ? color : colors?.gray}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
            />
          ) : null}
          {Board && (
            <View
              style={[
                appStyles.directionRow,
                appStyles.justifySpaceBetween,
                {alignItems: 'center'},
              ]}>
              <FlatList
                contentContainerStyle={styles.groupListCont}
                data={_grouplist}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return <GroupList item={item} />;
                }}
              />
              <CustomText
                text={_item?.status ? _item?.status : _title2}
                color={statusColor ? statusColor : colors?.secondary}
                font={family?.Poppins_Medium}
                size={size?.xsmall}
              />
            </View>
          )}
        </View>
        {Star && (
          <View style={styles?.rightContainer}>
            <CustomIcon
              src={appIcons.star}
              resizeMode="contain"
              customIconStyle={styles?.customIconStyle}
              customIconWrapper={styles?.searchno}
            />
            <CustomText
              text={_item?.price ? _item?.price : _title2}
              color={colors?.secondary}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors?.white,
    paddingHorizontal: width / 26,
    paddingVertical: height / 90,
    ...Shadows?.shadow3,
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  middle: {
    flex: 2,
    justifyContent: 'center',
  },
  customIconStyle: {
    borderRadius: 30,
  },
  searchno: {
    height: 30,
    width: 30,
  },
  customIconWrapper: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 2,
    borderStyle: 'dashed',
    borderColor: colors?.secondary,
  },
  imgWrapper: {
    // height: height / 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
