import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { connect } from 'react-redux';
import { setImageViewer } from '@core/generated/actions';
import ImageViewerLib from 'react-native-image-zoom-viewer';
import { Text } from '@ui-kitten/components';
import { tailwind } from '@tailwind';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Icon from '@core/components/base/icon';
import FormElement from '@core/components/abstract/formElement';
import { setAlert, setPopupMenu } from '@core/generated/actions';
import { Button } from '@ui-kitten/components';

export class ImageView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: [
        {
          uri: 'https://im0-tub-ru.yandex.net/i?id=0a8dc1da8b47ac63e1b06dadc55e1a3f-l&n=27&h=384&w=480',
          key: Date.now()
        },
        {
          uri: 'https://klike.net/uploads/posts/2019-06/1560329641_2.jpg',
          key: Date.now()
        }
      ]
    }
  }

  addPhoto = () => {
    let arr = this.state.photo.concat({
      uri: 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg',
      key: Date.now()
    })
    this.setState({ photo: arr })
    console.log(this.state.photo)
  }

  addPhotoMenu = () => {
    this.props.setPopupMenu({
      title: 'Выберите действие:',
      groups: [
        {
          list: [
            { title: 'Выбрать из галереи', onPress: () => { this.addPhoto() } },
            { title: 'Сделать фото', onPress: () => { this.addPhoto() } },
          ],
        },
      ],
    });
  }

  openPhoto = () => {
    let uriArray = []
    this.state.photo.forEach((e) => {uriArray.push(e.uri)})
    this.props.setImageViewer({ images: uriArray, id: 0 })
  }

  deleteAlert = (key) => {
    this.props.setAlert({
      title: 'Удалить фото?',
      buttons: [
        {
          text: 'Да',
          onPress: () => {
            let arr = this.state.photo.splice(key, 1)
            this.setState({arr})
            console.log(key)
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
      <View
        style={tailwind('justify-center items-center mt-4 mb-4 pt-4 pb-4 border-gray-400 border-t-2 border-b-2')}
      >
        <ScrollView horizontal={true}>
          <View style={tailwind('relative h-24 w-28 mr-2')}>
            <TouchableOpacity
              style={tailwind('justify-center items-center h-24 w-28 bg-blue-600 rounded-md')}
              onPress={this.addPhotoMenu}
            >
              <Icon
                name='plus'
                size={35}
                style={tailwind('text-white')}
              />
            </TouchableOpacity>
          </View>

          {this.state.photo.map((e, key) => {
            return (
              <View key={key} style={tailwind('relative h-24 w-28 mr-2 overflow-hidden rounded-md')}>
                <TouchableOpacity onPress={this.openPhoto}>
                  <ImageBackground
                    style={tailwind('h-24 w-28 z-0')}
                    source={{ uri: e.uri }}
                  >
                    <TouchableOpacity
                      style={tailwind('absolute right-0 top-0 px-2 py-1 bg-blue-600 rounded-md')}
                      onPress={() => this.deleteAlert(key)}
                    >
                      <Icon
                        name='close'
                        size={22}
                        style={tailwind('text-white')}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )
          })}

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