import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { connect } from 'react-redux';
import { setImageViewer } from '@core/generated/actions';
import ImageViewerLib from 'react-native-image-zoom-viewer';
import { Text, Button } from '@ui-kitten/components';
import { tailwind } from '@tailwind';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from '@core/components/base/icon';
import FormElement from '@core/components/abstract/formElement';
import { setAlert, setPopupMenu } from '@core/generated/actions';
import Page from '@core/components/abstract/page';


export class ImageView extends React.Component {
  constructor(props) {
    super(props);
  }

  addPhotoMenu = () => {
    this.props.setPopupMenu({
      title: 'Выберите действие:',
      groups: [
        {
          list: [
            {
              title: 'Выбрать из галереи', onPress: () => {
                return  
              }
            },
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
    return (
      <View style={tailwind('justify-center items-center mt-4 pt-4 pb-4 border-gray-400 border-t-2 border-b-2')}>
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
              <ImageBackground
                style={tailwind('h-24 w-28 z-0')}
                source={{ uri: 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg' }}
              >
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
            <TouchableOpacity onPress={this.openPhoto}>
              <ImageBackground
                style={tailwind('h-24 w-28 z-0')}
                source={{ uri: 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg' }}
              >
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
            <TouchableOpacity onPress={this.openPhoto}>
              <ImageBackground
                style={tailwind('h-24 w-28 z-0')}
                source={{ uri: 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg' }}
              >
                <TouchableOpacity style={tailwind('absolute right-0 top-0')} onPress={this.alert} >
                  <Icon
                    name='close'
                    size={30}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setAlert, setPopupMenu, setImageViewer
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageView)