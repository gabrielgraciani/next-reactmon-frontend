import { Loading } from '../Loading';

import { Container } from './Button.styles';
import { IButtonProps } from './Button.types';

const Button = ({
  onClick,
  type = 'button',
  children,
  isLoading = false,
  disabled = false,
}: IButtonProps): JSX.Element => {
  return (
    <Container onClick={onClick} type={type} disabled={isLoading || disabled}>
      {isLoading ? <Loading size="small" /> : children}
    </Container>
  );
};

export default Button;
