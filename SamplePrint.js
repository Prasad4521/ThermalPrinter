import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';

const printreciept = async value => {
  try {
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.setBlob(0);

    await BluetoothEscposPrinter.printText(value, {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    });
  } catch (e) {
    alert(e.message || 'ERROR');
  }
};

const SamplePrint = () => {
  const [value, setValue] = useState('Useless text');
  console.log(value);
  const handlePrint = () => {
    printreciept(value);
  };
  return (
    <View>
      <TextInput
        multiline
        numberOfLines={5}
        placeholder="Enter the Text To Print"
        style={{borderWidth: 2}}
        value={value}
        onChangeText={setValue}
      />
      <Text>Sample Print Instruction {value}</Text>
      <View style={styles.btn}>
        <Button title="Print Receipt" onPress={handlePrint} />
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
