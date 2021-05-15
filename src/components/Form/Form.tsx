import { Container, FormItem } from './Form.styles';
import { IFormProps } from './Form.types';

const Form = ({ children, ...rest }: IFormProps): JSX.Element => {
  return <Container {...rest}>{children}</Container>;
};

Form.FormItem = FormItem;

export default Form;
