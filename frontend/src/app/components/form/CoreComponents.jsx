// @flow

import TextComponentContainer from './blocks/TextComponentContainer.jsx';
import PasswordComponentContainer from './blocks/PasswordComponentContainer.jsx';
import SubmitButtonComponentContainer from './blocks/SubmitButtonComponentContainer.jsx';
import TextAreaComponentContainer from './blocks/TextAreaComponentContainer.jsx';
import SelectListComponentContainer from './blocks/custom/SelectListComponentContainer.jsx';

export const FormComponents = {
  "text": TextComponentContainer,
  "password": PasswordComponentContainer,
  "submit": SubmitButtonComponentContainer,
  "textarea": TextAreaComponentContainer,
  "selectlist": SelectListComponentContainer
}