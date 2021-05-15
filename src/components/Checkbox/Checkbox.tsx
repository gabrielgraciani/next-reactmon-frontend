import { forwardRef, ForwardRefRenderFunction } from 'react';

import { Container, Input } from './Checkbox.styles';
import { ICheckboxProps } from './Checkbox.types';

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  ICheckboxProps
> = ({ id, name, label, ...rest }, ref): JSX.Element => {
  return (
    <>
      <Container htmlFor={id}>
        <Input type="checkbox" id={id} name={name} ref={ref} {...rest} />
        {label}
      </Container>
    </>
  );
};

const Checkbox = forwardRef(CheckboxBase);
export default Checkbox;
