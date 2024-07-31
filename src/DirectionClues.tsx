import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import styled, { ThemeContext } from 'styled-components';
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

interface CluesWrapperProps {
  background: string | null;
  padding: string | null;
  gridTemplateColumns: string | null;
  mobileGridTemplateColumns: string | null;
  headerColor: string | null;
  columnBreakpoint: string | null;
  maxHeight: string | null;
  overflow: string | null;
}

const CluesWrapper = styled.div.attrs<CluesWrapperProps>(() => ({
  className: 'cluesWrapper',
}))<CluesWrapperProps>`
  padding: ${(props) => props.padding};
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns};
  max-height: ${(props) => props.maxHeight};
  overflow: ${(props) => props.overflow};

  @media (max-width: ${(props) => props.columnBreakpoint}) {
    grid-template-columns: ${(props) => props.mobileGridTemplateColumns};
  }

  .direction {
    margin-bottom: 2em;
    display: grid;
    grid-auto-columns: 1fr;
    grid-row-gap: 15px;

    .header {
      margin: 0;
      display: grid;
      grid-template-columns: min-content min-content;
      align-items: center;
      grid-column-gap: 10px;
      color: ${(props) => props.headerColor};
    }

    .cluesWrapper {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 25px;
    }
  }
`;

export default function DirectionClues({
  direction,
  label,
}: DirectionCluesProps) {
  const { clues } = useContext(CrosswordContext);
  const {
    focusBackground,
    highlightBackground,
    cluesContainerBackground,
    cluesContainerGridTemplateColumns,
    cluesContainerPadding,
    cluesContainerMobileGridTemplateColumns,
    cluesHeaderColor,
    columnBreakpoint,
    cluesContainerMaxHeight,
    cluesContainerOverflow,
  } = useContext(ThemeContext);

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
    <CluesWrapper
      background={cluesContainerBackground}
      columnBreakpoint={columnBreakpoint}
      headerColor={cluesHeaderColor}
      padding={cluesContainerPadding}
      gridTemplateColumns={cluesContainerGridTemplateColumns}
      mobileGridTemplateColumns={cluesContainerMobileGridTemplateColumns}
      overflow={cluesContainerOverflow}
      maxHeight={cluesContainerMaxHeight}
    >
      <div className="direction">
        {/* use something other than h3? */}
        <h3 className="header">
          {label || direction.toUpperCase()}
          {directionIcon(direction)}
        </h3>
      </div>
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
    </CluesWrapper>
  );
}

DirectionClues.propTypes = directionCluesPropTypes;

DirectionClues.defaultProps = {
  label: undefined,
};
