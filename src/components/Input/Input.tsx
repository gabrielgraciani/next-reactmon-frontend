import {
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { IInputProps } from './Input.types';
import {
  Container,
  InputContainer,
  Label,
  StyledInput,
  ErrorMessage,
} from './Input.styles';

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { name, label, error = null, ...rest },
  ref,
): JSX.Element => {
  const [isInputActive, setIsInputActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChangeMouseActive = useCallback(() => {
    setIsInputActive(false);
  }, []);

  const handleClickOutside = useCallback(
    e => {
      if (
        isInputActive &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        handleChangeMouseActive();
      }
    },
    [handleChangeMouseActive, isInputActive],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, handleChangeMouseActive]);

  const inputVariationClass = `${isInputActive ? 'active' : ''} ${
    error ? 'error' : ''
  }`;

  return (
    <Container>
      {label && (
        <Label
          htmlFor={name}
          isInvalid={!!error}
          isActive={isInputActive}
          className={inputVariationClass}
        >
          {label}
        </Label>
      )}

      <InputContainer
        onClick={() => setIsInputActive(true)}
        isInvalid={!!error}
        isActive={isInputActive}
        className={inputVariationClass}
        ref={wrapperRef}
      >
        <StyledInput
          name={name}
          id={name}
          ref={ref}
          {...rest}
          autoComplete="off"
        />
      </InputContainer>

      {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

const Input = forwardRef(InputBase);
export default Input;
