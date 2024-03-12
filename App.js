import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

export default App = () => {
  const [data, setData] = useState([]);
  let arr = [];
  const enableBluetooth = () => {
    BluetoothManager.isBluetoothEnabled()
      .then(enabled => {
        if (enabled) {
          alert('Bluetooth enabled');
        } else {
          BluetoothManager.enableBluetooth()
            .then(() => {
              alert('Bluetooth turned on');
            })
            .catch(error => {
              alert(error);
            });
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const acessLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location access granted ');
        BluetoothManager.scanDevices()
          .then(resolve => {
            let objects = JSON.parse(resolve);
            const {paired, found} = objects;
            // for (let i = 0; i < paired.length; i++) {
            //   let device = paired[i];
            //   const {name, address} = device;
            //   console.log(name, address);
            // }
            setData(paired);
          })
          .catch(reject => {
            alert(reject);
          });
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const Item = ({name}) => (
    <TouchableOpacity>
      <View
        style={{
          margin: 5,
          backgroundColor: 'red',
          height: 50,
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#ffffff'}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Button title="enable" onPress={enableBluetooth} />
      <Button title="scan" onPress={acessLocation} />
      <FlatList
        data={data}
        renderItem={({item}) => <Item name={item.name} />}
        keyExtractor={item => item.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
