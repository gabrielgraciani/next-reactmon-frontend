import { Container } from './Loading.styles';
import { ILoadingProps } from './Loading.types';

const Loading = ({ size = 'normal' }: ILoadingProps): JSX.Element => {
  return <Container size={size} />;
};

export default Loading;
