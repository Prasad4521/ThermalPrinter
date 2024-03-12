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

import SamplePrint from './SamplePrint';

export default App = () => {
  const [data, setData] = useState([]);
  const [foundData, setFoundData] = useState([]);
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
            setData(paired);
            setFoundData(found);
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

  const ConnectBluetooth = async address => {
    await BluetoothManager.connect(address)
      .then(resolve => {
        console.log(resolve);
      })
      .catch(reject => {
        console.log('reject : ' + reject);
      });
  };

  const Item = ({name, address}) => (
    <TouchableOpacity onPress={() => ConnectBluetooth(address)}>
      <View
        style={{
          margin: 5,
          backgroundColor: 'blue',
          height: 50,
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#ffffff'}}>{name}</Text>
        <Text style={{color: '#ffffff'}}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
  const Item1 = ({name, address}) => (
    <TouchableOpacity onPress={() => ConnectBluetooth(address)}>
      <View
        style={{
          margin: 5,
          backgroundColor: 'blue',
          height: 50,
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#ffffff'}}>{name}</Text>
        <Text style={{color: '#ffffff'}}>{address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <SamplePrint />
      <Button title="enable" onPress={enableBluetooth} />
      <Button title="scan" onPress={acessLocation} />
      <Text>Paired Devices</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item name={item.name} address={item.address} />
        )}
        keyExtractor={item => item.address}
      />
      <Text>Found devices</Text>
      <FlatList
        data={foundData}
        renderItem={({item}) => (
          <Item1 name={item.name} address={item.address} />
        )}
        keyExtractor={item => item.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
