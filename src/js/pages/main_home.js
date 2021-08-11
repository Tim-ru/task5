import React from 'react';
import { View, Image } from 'react-native';
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
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Описание',
        name: 'theme',
        style: tailwind('mt-10'),
      },
      {
        elementType: Form.BaseElementTypes.Submit,
        title: 'Войти',
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
            url={`${BASEURL}:${PORT}/user/signin`}
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />
          <Button element={{
            title: "select",
            onPress: () => {
              this.props.setSelect({
                list: [
                  { title: 'Общая', value: 'common' },
                  { title: 'Приватная', value: 'private' },
                ],
                onChange: (value) => false,
              });
            }
          }} />
          {/* <Button element={{
            title: "alert",
            onPress: () => {
              this.props.setAlert({
                title: 'Удалить комментарий?',
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
          }} />

          <Button element={{
            title: "select",
            onPress: () => {
              this.props.setSelect({
                list: [
                  { title: 'Дубликат', value: 'dublicate' },
                  { title: 'В работе', value: 'inwork' },
                ],
                onChange: (value) => false,
              });
            }
          }} />

          <Button element={{
            title: "popup",
            onPress: () => {
              this.props.setPopupMenu({
                title: 'Выберите действие:',
                groups: [
                  {
                    list: [
                      { title: 'Сохранить', onPress: () => false },
                      { title: 'Вернуться к редактированию' },
                      { title: 'Отменить изменения', onPress: () => false },
                    ],
                  },
                ],
              });
            }
          }} />

          <Button element={{
            title: "Галлерея",
            onPress: () => {
              this.props.setImageViewer({ images: ['https://crm.q-digital.org/assets/gentelella/public/images/logo.png', 'https://crm.q-digital.org/assets/gentelella/public/images/logo.png'], id: 0 })
            }
          }} /> */}
        </ImageOverlay>
      </KeyboardAvoidingView>,
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(AuthSignin);