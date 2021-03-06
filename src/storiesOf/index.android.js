import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StorybookView from './StorybookView';

export default function(...args) {
  return storiesOf(...args).addDecorator(getStory => (
    <StorybookView>{getStory()}</StorybookView>
  ));
}
