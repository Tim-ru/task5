import React from 'react';
import { View } from 'react-native';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import TabMenu from '@components/base/form/elements/menu';

export class Main extends Page {
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
        style: tailwind('mt-5 w-1/2'),
        onPress: () => {
          this.props.setSelect({
            list: [
              { title: 'Общая', value: 'public' },
              { title: 'Приватная', value: 'private' },
            ],
            onChange: (value) => console.log(value),
          });
        }
      },
      {
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Описание',
        name: 'description',
        style: tailwind('mt-10'),
      },
      {
        elementType: Form.CustomElementTypes.ImageView,
      },
      {
        elementType: Form.BaseElementTypes.Submit,
        title: 'Отправить',
        style: tailwind('mt-auto'),
        status: "control",
        size: "giant",
        style: tailwind('mb-10'),
        onPress: this.onSubmit
      },
    ];
  }

  onSubmit = ({ body }) => {
    console.log(body);
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')}>
          <Form
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />

          <TabMenu 
            {...this}
          />

        </ImageOverlay>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(Main);
