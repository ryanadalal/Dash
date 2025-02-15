/**
 * A type for passing children as props to elemnts for ts
 */
export interface ModalRendererProps {
  class?: string;
  title?: string;
  children?: JSX.Element | JSX.Element[];
}
