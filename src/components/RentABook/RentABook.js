import React, {useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Image} from 'react-native';
import usePost from '../../hooks/usePost';
import {AuthContext} from '../../context/AuthContext';
import usePatch from '../../hooks/usePatch';

import {BASE_URL} from '../../../config';
import styles from './RentABook.style';
import {Button} from './Button';
import {DateButton} from './DateButton';
import {SetDatePicker} from './DatePicker';
import DeliverBook from '../DeliverBook';

const RentABook = ({route, navigation}) => {
  const {item, qrcode} = route.params;

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {userInfo, setCheckData, checkData, userData} = useContext(AuthContext);
  const [deliverVisible, setDeliverVisible] = useState(false);

  const {data, err, loading, info, post} = usePost();
  const {patchData, patchErr, patchLoading, patchInfo, patch} = usePatch();

  function rentBook() {
    let postData = {
      bookId: item.kitapNo,
      username: userInfo.username,
      password: userInfo.password,
      date: date,
    };
    post(BASE_URL + '/api/rentbook', postData, navigation);
    setCheckData(!checkData); // kullanici datalarini yeniden kontrol etmek icin tetikleme
  }
  function deliver(bookId, bookcaseId) {
    let patchData = {
      bookId: bookId,
      bookcaseId: bookcaseId,
      userId: userInfo.userId,
    };
    patch(BASE_URL + '/api/rentbook', patchData, navigation);
    setCheckData(!checkData);
  }
  //kitabin durumunu kontrol etme
  useEffect(() => {
    let filterBook = userData
      .filter(book => book.kitapNo === item.kitapNo)
      .filter(result => result.islemtipi === 'kiralama')
      .map(res => res.islemtipi === 'kiralama');
    console.log('rentfilterbook');
    filterBook[0] && setDeliverVisible(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bookDetails}>
        <Image
          source={{uri: BASE_URL + item.kapakresmi}}
          style={styles.image}
        />
        <View style={styles.bookInfoContainer}>
          <Text style={styles.bookTitle}>{item.adi}</Text>
          <Text style={styles.authorTitle}>{item.yazar}</Text>
        </View>
      </View>
      {deliverVisible ? (
        <DeliverBook
          deliver={deliver}
          navigation={navigation}
          item={item}
          route={route}
          qrcode={qrcode ? true : false}
        />
      ) : (
        <>
          <View style={styles.dateContainer}>
            <Text style={styles.dateTitle}>
              Kiralamak istediginiz sureyi seciniz
            </Text>
            <DateButton date={date} setOpen={setOpen} />
            <SetDatePicker
              date={date}
              open={open}
              setDate={setDate}
              setOpen={setOpen}
              patchErr={patchErr}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              textColor="white"
              bgColor="green"
              btnLabel="Kirala"
              Width={150}
              Press={() => {
                rentBook();
              }}
              loading={loading}
              touch={loading}
            />
            <Button
              textColor="white"
              bgColor="red"
              btnLabel="iptal et"
              Width={150}
              Press={() => {
                null;
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default RentABook;
