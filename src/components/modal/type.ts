import { ReactNode } from 'react';
import { To } from 'react-router-dom';

export type TModalProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};
