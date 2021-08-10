import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Text } from '@ui-kitten/components';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import { BASEURL, PORT } from '@core/generated/config';
import style from '../style';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import Routes from '@core/generated/routes'
import Button from '../../core/components/base/form/elements/button';
import Select from '@core/components/base/form/elements/select';
import imageViewer from '@core/components/base/imageViewer';
import { setImageViewer } from '@core/generated/actions';
import Icon from '@core/components/base/icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { Button } from '@ui-kitten/components';

export class AuthSignin extends Page {
  constructor(_props) {
    super(_props);

    this.state.elements = [
      {
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Тема',
        name: 'theme',
      },
      {
        elementType: Form.BaseElementTypes.Button,
        title: 'Тема',
        name: 'select',
        style: tailwind('mt-5'),
        onPress: () => {
          this.props.setSelect({
            list: [
              { title: 'Общая', value: 'public' },
              { title: 'Приватная', value: 'private' },
            ],
            onChange: (value) => false,
          });
        }
      },
      {
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Описание',
        name: 'theme',
        style: tailwind('mt-10'),
      },

      {
        elementType: Form.BaseElementTypes.Submit,
        title: 'Отправить',
        style: tailwind('mt-auto'),
        status: "control",
        size: "giant",
        onPress: this.onSubmit
      },

    ];
  }

  onSubmit = ({ data }) => {
    console.log(data);
  }

  addPhotoMenu = () => {
    this.props.setPopupMenu({
      title: 'Выберите действие:',
      groups: [
        {
          list: [
            { title: 'Выбрать из галереи', onPress: () => {
              return
            } },
            { title: 'Сделать фото' },
            { title: 'Отменить изменения', onPress: () => false },
          ],
        },
      ],
    });
  }

  openPhoto = () => {
    this.props.setImageViewer({ images: ['https://crm.q-digital.org/assets/gentelella/public/images/logo.png', 'https://crm.q-digital.org/assets/gentelella/public/images/logo.png'], id: 0 })
  }

  alert = () => {
    this.props.setAlert({
      title: 'Удалить фото?',
      buttons: [
        {
          text: 'Да',
          onPress: async () => {
          },
        },
        {
          text: 'Нет',
          style: tailwind('text-red'),
        },
      ],
    });
  }



  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')}>
          <View
            style={{
              ...tailwind('justify-center items-center'),
              ...style.signupView,
            }}
          >
            <Text style={tailwind('mt-4')} category="s1" status="control">
              main
            </Text>
          </View>
          <Form
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />

          <View style={tailwind('justify-center items-center pt-4 pb-4 border-gray-400 border-t-2 border-b-2')}>
            <ScrollView horizontal={true}>
              <View style={tailwind('relative h-24 w-28 mr-2')}>
                <TouchableOpacity
                  style={tailwind('justify-center items-center h-24 w-28')}
                  onPress={this.addPhotoMenu}
                >
                  <Icon
                    name='plus'
                    size={30}
                  />
                </TouchableOpacity>
              </View>

              <View style={tailwind('relative h-24 w-28 mr-2')}>
                <TouchableOpacity onPress={this.openPhoto}>
                  <ImageBackground style={tailwind('h-24 w-28 z-0')} source={require('../style/0.jpg')}>
                    <TouchableOpacity style={tailwind('absolute right-0 top-0')} onPress={this.alert} >
                      <Icon
                        name='close'
                        size={30}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              </View>

              <View style={tailwind('relative h-24 w-28 mr-2')}>
                <ImageBackground style={tailwind('h-24 w-28 z-0')} source={require('../style/0.jpg')}>
                  <TouchableOpacity style={tailwind('absolute right-0 top-0')} onPress={this.alert} >
                    <Icon
                      name='close'
                      size={30}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>

              <View style={tailwind('relative h-24 w-28 ')}>
                <ImageBackground style={tailwind('h-24 w-28 z-0')} source={require('../style/0.jpg')}>
                  <TouchableOpacity style={tailwind('absolute right-0 top-0')} onPress={this.alert} >
                    <Icon
                      name='close'
                      size={30}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>

            </ScrollView>
          </View>

          

        </ImageOverlay>
      </KeyboardAvoidingView>,
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(AuthSignin);