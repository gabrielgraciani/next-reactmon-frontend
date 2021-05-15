import {
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { ITextareaProps } from './Textarea.types';
import {
  Container,
  TextareaContainer,
  Label,
  StyledTextarea,
  ErrorMessage,
} from './Textarea.styles';

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  ITextareaProps
> = ({ name, label, error = null, ...rest }, ref): JSX.Element => {
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChangeMouseActive = useCallback(() => {
    setIsTextareaActive(false);
  }, []);

  const handleClickOutside = useCallback(
    e => {
      if (
        isTextareaActive &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        handleChangeMouseActive();
      }
    },
    [handleChangeMouseActive, isTextareaActive],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, handleChangeMouseActive]);

  const textareaVariationClass = `${isTextareaActive ? 'active' : ''} ${
    error ? 'error' : ''
  }`;

  return (
    <Container>
      {label && (
        <Label
          htmlFor={name}
          isInvalid={!!error}
          isActive={isTextareaActive}
          className={textareaVariationClass}
        >
          {label}
        </Label>
      )}

      <TextareaContainer
        onClick={() => setIsTextareaActive(true)}
        isInvalid={!!error}
        isActive={isTextareaActive}
        className={textareaVariationClass}
        ref={wrapperRef}
      >
        <StyledTextarea
          name={name}
          id={name}
          ref={ref}
          {...rest}
          autoComplete="off"
        />
      </TextareaContainer>

      {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

const Textarea = forwardRef(TextareaBase);
export default Textarea;
