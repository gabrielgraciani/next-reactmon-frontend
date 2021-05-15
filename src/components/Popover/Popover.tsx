import React, { cloneElement, useRef, useEffect } from 'react';
import { useTransition } from 'react-spring';

import { Container, PopoverContent, PopoverTriangle } from './Popover.styles';
import { IPopoverTypes } from './Popover.types';

const Popover = ({
  visible,
  children,
  content: Content,
  onClose,
  onVisibleChange,
}: IPopoverTypes): JSX.Element => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleOpenPopover = () => {
    onVisibleChange();
  };

  const handleClick = (e: MouseEvent) => {
    const popover = e.target as HTMLDivElement;
    if (popoverRef.current && !popoverRef.current.contains(popover)) {
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }

    return null;
  });

  const popoverWithTransition = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  return (
    <Container ref={popoverRef}>
      {cloneElement(children, {
        onClick: handleOpenPopover,
        style: {
          cursor: 'pointer',
        },
      })}

      {visible && (
        <PopoverContent>
          <Content />
          <PopoverTriangle />
        </PopoverContent>
      )}

      {popoverWithTransition(
        (style, item) =>
          item && (
            <PopoverContent style={style}>
              <Content />
              <PopoverTriangle />
            </PopoverContent>
          ),
      )}
    </Container>
  );
};

export default Popover;
