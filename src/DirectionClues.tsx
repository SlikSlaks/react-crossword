import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { ThemeContext } from 'styled-components';
import { CrosswordContext } from './context';
import type { Direction, EnhancedProps } from './types';

import Clue from './Clue';

// interface ClueInfo {
//   number: string;
//   clue: string;
//   correct?: boolean;
// }

const directionCluesPropTypes = {
  /** direction of this list of clues ("across" or "down") */
  direction: PropTypes.string.isRequired,

  /** a label to use instead of the (English) default */
  label: PropTypes.string,
};

export type DirectionCluesProps = EnhancedProps<
  typeof directionCluesPropTypes,
  { direction: Direction }
>;

export default function DirectionClues({
  direction,
  label,
}: DirectionCluesProps) {
  const { clues } = useContext(CrosswordContext);
  const { focusBackground, highlightBackground } = useContext(ThemeContext);

  const directionIcon = (type: Direction) => (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="6.5"
        width="4"
        height="4"
        rx="1"
        fill={type === 'across' ? focusBackground : highlightBackground}
      />
      <rect
        x="1"
        y="11.5"
        width="4"
        height="4"
        rx="1"
        fill={highlightBackground}
      />
      <rect
        x="1"
        y="1.5"
        width="4"
        height="4"
        rx="1"
        fill={highlightBackground}
      />
      <rect x="6" y="6.5" width="4" height="4" rx="1" fill={focusBackground} />
      <rect
        x="6"
        y="11.5"
        width="4"
        height="4"
        rx="1"
        fill={type === 'across' ? highlightBackground : focusBackground}
      />
      <rect
        x="6"
        y="1.5"
        width="4"
        height="4"
        rx="1"
        fill={type === 'across' ? highlightBackground : focusBackground}
      />
      <rect
        x="11"
        y="6.5"
        width="4"
        height="4"
        rx="1"
        fill={type === 'across' ? focusBackground : highlightBackground}
      />
      <rect
        x="11"
        y="11.5"
        width="4"
        height="4"
        rx="1"
        fill={highlightBackground}
      />
      <rect
        x="11"
        y="1.5"
        width="4"
        height="4"
        rx="1"
        fill={highlightBackground}
      />
    </svg>
  );

  return (
    <div className="direction">
      {/* use something other than h3? */}
      <h3 className="header">
        {label || direction.toUpperCase()}
        {directionIcon(direction)}
      </h3>
      <div className="cluesWrapper">
        {clues?.[direction].map(({ number, clue, complete, correct }) => (
          <Clue
            key={number}
            direction={direction}
            number={number}
            complete={complete}
            correct={correct}
          >
            {clue}
          </Clue>
        ))}
      </div>
    </div>
  );
}

DirectionClues.propTypes = directionCluesPropTypes;

DirectionClues.defaultProps = {
  label: undefined,
};
