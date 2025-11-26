import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends BaseProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface SectionProps extends BaseProps {
  id?: string;
  delay?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
