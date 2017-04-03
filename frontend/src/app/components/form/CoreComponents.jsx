// @flow

import React from 'react';
import { Link } from 'react-router';
import { debounce } from '../../common/common.js';

import TextComponentContainer from './blocks/TextComponentContainer.jsx';
import PasswordComponentContainer from './blocks/PasswordComponentContainer.jsx';
import SubmitButtonComponentContainer from './blocks/SubmitButtonComponentContainer.jsx';
import TextAreaComponentContainer from './blocks/TextAreaComponentContainer.jsx';

export const FormComponents = {
  "text": TextComponentContainer,
  "password": PasswordComponentContainer,
  "submit": SubmitButtonComponentContainer,
  "textarea": TextAreaComponentContainer
}