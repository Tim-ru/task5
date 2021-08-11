import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

function ModalWindow() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={setModalVisible(!isModalVisible)} />

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={setModalVisible(!isModalVisible)} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalWindow;