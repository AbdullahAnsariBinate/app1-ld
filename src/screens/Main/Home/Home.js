import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {appImages} from '../../../assets';
import {Dimensions, FlatList, ScrollView, Text, View} from 'react-native';
import CustomText from '../../../components/CustomText';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
import NavService from '../../../helpers/NavService';
import {
  _Challenges,
  _Home,
  _dailyGoal,
  homeCards,
} from '../../../utils/dummyData';
import CustomList from '../../../components/CustomList';
import {LineChart} from 'react-native-chart-kit';
import ListComponent from '../../../components/ListComponent';
import ModalPopup from '../../../containers/Popup/modalPopup/modalPopup';
import CustomCard from '../../../components/CustomCard';
const {height, width} = Dimensions.get('screen');
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleClose = () => {
    this?.setState({isVisible: false});
  };

  render() {
    const {isVisible} = this?.state;
    return (
      <AppBackground
        homePress={() => NavService.navigate('MyProfile')}
        menu
        title={'Home'}
        notification
        homeTitle={'Welcome,'}
        homeSubtitle={'John Smith'}
        home={true}
        homeimage={appImages.profile}
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 15}}>
            <View style={styles.ViewText}>
              {/* <CustomButton title="View Details" onPress={()=> NavService?.navigate('ChallengesParticipate')} /> */}

              <CustomText text="Daily Goal" style={styles.text1} />
              <TouchableOpacity onPress={() => NavService.navigate('MyGoals')}>
                <CustomText text="View Details" style={styles.ViewDetails} />
              </TouchableOpacity>
            </View>
            <FlatList
              bounces={false}
              contentContainerStyle={{
                flexGrow: 1,
                // paddingBottom: width * 0.32,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={_index => _index.toString()}
              data={_dailyGoal}
              // ItemSeparatorComponent={this?.ItemSeparatorComponent}
              renderItem={({item}) => (
                <CustomList
                  Status
                  _item={item}
                  statusColor={colors?.secondary}
                  customContainer={{
                    borderRadius: 15,
                    backgroundColor: colors?.lightBlue,
                  }}
                  onPress={() => NavService?.navigate('GoDetails')}
                />
              )}
            />
            <View style={styles.lineSeparator} />
            <View style={styles.ViewText1}>
              <CustomText text="Your Stats" style={styles.text1} />
              <TouchableOpacity onPress={() => NavService.navigate('MyStats')}>
                <CustomText text="View Details" style={styles.ViewDetails} />
              </TouchableOpacity>
            </View>
            <View>
              <LineChart
                data={{
                  labels: [
                    'Week 1',
                    'Week 2',
                    'Week 3',
                    'Week 4',
                    'Week 5',
                    'Week 6',
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={350} // from react-native
                height={200}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(16, 181, 250, ${opacity})`, // Set line color to #10B5FA
                  labelColor: (opacity = 1) => 'black', // Set label color to black

                  propsForDots: {
                    r: '1',
                    strokeWidth: '1',
                    stroke: colors.primary,
                  },
                }}
                bezier
                style={
                  {
                    // alignSelf:'center',
                    // marginVertical: 8,
                    // paddingHorizontal: 50,
                    // borderRadius: 16,
                  }
                }
              />
            </View>
            <View style={styles.lineSeparator} />
            <View style={styles.ViewText1}>
              <CustomText text="Challenges & Promotions" style={styles.text1} />

              <TouchableOpacity
                onPress={() => NavService.navigate('PromotionDetails')}>
                <CustomText text="View Details" style={styles.ViewDetails} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            bounces={false}
            horizontal
            style={{flex: 1, marginTop: height / 64}}
            // numColumns={0}

            contentContainerStyle={{
              flexGrow: 1,
              gap: 10,
              paddingBottom: width * 0.32,
            }}
            customContainer={{
              backgroundColor: 'red',
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={_index => _index.toString()}
            data={homeCards}
            // ItemSeparatorComponent={this?.ItemSeparatorComponent}
            renderItem={({item}) => {
              return (
                <CustomCard
                  onPress={() => NavService.navigate('PromotionDetails')}
                  item={item}
                />
              );
            }}
          />
        </ScrollView>
      </AppBackground>
    );
  }
}

export default Home;
