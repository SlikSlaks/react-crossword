import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

import type { Direction, EnhancedProps } from './types';
import { CrosswordContext } from './context';

interface ClueWrapperProps {
  complete?: boolean | null;
  correct?: boolean | null;
  highlight?: boolean | null;
  clueHighlightBackground?: string | null;
  clueTextColor?: string | null;
  clueCorrectTextColor?: string | null;
  clueCorrectTextDecoration?: string | null;
  padding?: string | null;
  borderRadius?: string | null;
}

const ClueWrapper = styled.div.attrs<ClueWrapperProps>((props) => ({
  className: `clue${
    props.complete ? (props.correct ? ' correct' : ' incorrect') : ''
  }`,
}))<ClueWrapperProps>`
  cursor: default;
  height: fit-content;
  padding: ${(props) => props.padding};
  color: ${(props) =>
    props.correct ? props.clueCorrectTextColor : props.clueTextColor};
  border-radius: ${(props) => (props.highlight ? props.borderRadius : null)};
  text-decoration: ${(props) =>
    props.correct ? props.clueCorrectTextDecoration : null};
  background-color: ${(props) =>
    props.highlight ? props.clueHighlightBackground : 'transparent'};
`;

/**
 * Renders an individual clue, with its number. Makes use of `CrosswordContext`
 * to know whether to render as “highlighted” or not, and uses the theme to
 * provide the highlighting color.
 */
export default function Clue({
  direction,
  number,
  children,
  complete,
  correct,
  ...props
}: EnhancedProps<
  typeof Clue.propTypes,
  {
    /** direction of the clue: “across” or “down”; passed back in onClick */
    direction: Direction;
  }
>) {
  const {
    clueHighlightBackground,
    clueTextColor,
    clueCorrectTextColor,
    clueCorrectTextDecoration,
  } = useContext(ThemeContext);
  const { focused, selectedDirection, selectedNumber, handleClueSelected } =
    useContext(CrosswordContext);

  const handleClick = useCallback<React.MouseEventHandler>(
    (event) => {
      event.preventDefault();
      handleClueSelected(direction, number);
    },
    [direction, number, handleClueSelected]
  );

  return (
    <ClueWrapper
      clueHighlightBackground={clueHighlightBackground}
      borderRadius="10px"
      padding="10px"
      highlight={
        focused && direction === selectedDirection && number === selectedNumber
      }
      complete={complete}
      correct={correct}
      // clueCorrectTextDecoration={clueCorrectTextDecoration}
      clueCorrectTextColor={clueCorrectTextColor}
      clueTextColor={clueTextColor}
      {...props}
      onClick={handleClick}
      aria-label={`clue-${number}-${direction}`}
    >
      {number}&nbsp;&nbsp;&nbsp;
      <span
        style={{ textDecoration: correct ? clueCorrectTextDecoration : null }}
      >
        {children}
      </span>
    </ClueWrapper>
  );
}

Clue.propTypes = {
  /** direction of the clue: "across" or "down"; passed back in onClick */
  direction: PropTypes.string.isRequired,
  /** number of the clue (the label shown); passed back in onClick */
  number: PropTypes.string.isRequired,
  /** clue text */
  children: PropTypes.node.isRequired,
  /** whether the answer/guess is complete */
  complete: PropTypes.bool,
  /** whether the answer/guess is correct */
  correct: PropTypes.bool,
};

Clue.defaultProps = {
  // children: undefined,
  complete: undefined,
  correct: undefined,
};
