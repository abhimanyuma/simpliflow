// @flow

import TextComponentContainer from './blocks/TextComponentContainer.jsx';
import PasswordComponentContainer from './blocks/PasswordComponentContainer.jsx';
import SubmitButtonComponentContainer from './blocks/SubmitButtonComponentContainer.jsx';
import TextAreaComponentContainer from './blocks/TextAreaComponentContainer.jsx';
import FileComponentContainer from './blocks/FileComponentContainer.jsx';
import RichTextComponentContainer from './blocks/RichTextComponentContainer.jsx';

import SelectListComponentContainer from './blocks/custom/SelectListComponentContainer.jsx';


export const FormComponents = {
  "text": TextComponentContainer,
  "password": PasswordComponentContainer,
  "submit": SubmitButtonComponentContainer,
  "textarea": TextAreaComponentContainer,
  "selectlist": SelectListComponentContainer,
  "file": FileComponentContainer,
  "rich_text": RichTextComponentContainer
}