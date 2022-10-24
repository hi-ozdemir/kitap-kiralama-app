import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import newData from '../assets/data/newData';
import colors from '../assets/colors/colors';
import populerData from '../assets/data/populerData';
import LinearGradient from 'react-native-linear-gradient';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

Feather.loadFont();
const Home = ({navigation}) => {
  const renderPopulerBookItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            item: item,
          })
        }>
        <ImageBackground
          source={item.image}
          imageStyle={styles.populerBookItemImageBg}
          style={[
            styles.populerBookItemWrapper,
            {marginLeft: item.id === 1 ? 20 : 0},
          ]}>
          <Text numberOfLines={5} style={styles.populerBookItemTitle}>
            {item.title}
          </Text>
          <Text style={styles.populerBookItemAuthor}>{item.author}</Text>
        </ImageBackground>
        <View style={styles.populerBookItemWrapper}></View>
      </TouchableOpacity>
    );
  };
  const renderNewBookItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            item: item,
          })
        }>
        <ImageBackground
          source={item.image}
          imageStyle={styles.newBookItemImageBg}
          style={[
            styles.newBookItemWrapper,
            {marginLeft: item.id === 4 ? 20 : 0},
          ]}>
          <Text numberOfLines={5} style={styles.newBookItemTitle}>
            {item.title}
          </Text>
          <Text style={styles.newBookItemAuthor}>{item.author}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/*Title */}
        {/* <View style={styles.titlesWrapper}>j
        <Text style={styles.titlesTitle}>Hos Geldin</Text>
      </View> */}
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Image
              source={require('../assets/images/pImages.jpg')}
              style={styles.profileImage}
            />
            <Feather name="menu" size={24} color={colors.textDark} />
          </View>
        </SafeAreaView>

        {/*Search Area */}
        <View style={styles.searchWrapper}>
          <Feather name="search" size={24} color={colors.textDark} />
          <View style={styles.search}>
            <Text style={styles.searchText}>Kitap veya Yazar ara</Text>
          </View>
        </View>

        {/*Populer Books */}
        <View style={styles.populerBookWrapper}>
          <Text style={styles.populerBookTitle}>Önerilenler</Text>

          <View style={styles.populerBookList}>
            <FlatList
              data={populerData}
              renderItem={renderPopulerBookItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        {/*New Books */}
        <View style={styles.newBookWrapper}>
          <Text style={styles.newBookTitle}>Yeni Eklenenler</Text>

          <View style={styles.newBookList}>
            <FlatList
              data={newData}
              renderItem={renderNewBookItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {},
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  titlesWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  titlesTitle: {
    fontFamily: 'Poppins-Medium',
    color: colors.textDark,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textSecond,
    borderBottomWidth: 2,
  },
  searchText: {
    color: colors.textSecond,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  populerBookWrapper: {
    marginTop: 13,
  },
  populerBookTitle: {
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: colors.textDark,
    fontSize: 24,
  },
  populerBookList: {},
  populerBookItemWrapper: {
    marginTop: 10,

    marginRight: 20,
    width: 136,
    height: 215,
  },

  populerBookItemImageBg: {
    width: 136,
    height: 209,
    borderRadius: 12,
  },
  populerBookItemTitle: {
    marginTop: 181,

    fontSize: 16,
    color: 'white',
    backgroundColor: '#0D253Ca0',
    paddingHorizontal: 5,
    // borderTopRightRadius: 8,
    // borderTopLeftRadius: 8,
  },
  populerBookItemAuthor: {
    fontSize: 9,
    padding: 3,

    color: 'white',

    backgroundColor: '#0D253Cf6',
    paddingHorizontal: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  newBookWrapper: {marginTop: -210},
  newBookTitle: {
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: colors.textDark,
    fontSize: 24,
  },
  newBookList: {},
  newBookItemImageBg: {width: 110, height: 180, borderRadius: 12},
  newBookItemWrapper: {
    marginTop: 7,

    marginRight: 12,
    width: 112,
    height: 180,
  },
  newBookItemTitle: {
    marginTop: 150,

    fontSize: 11,
    color: 'white',
    backgroundColor: '#0D253Ca0',
    paddingHorizontal: 5,
  },
  newBookItemAuthor: {
    fontSize: 8,
    padding: 3,

    color: 'white',

    backgroundColor: '#0D253Cf6',
    paddingHorizontal: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default Home;
