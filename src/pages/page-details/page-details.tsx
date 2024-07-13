import { FC, ReactNode } from 'react';
import styles from './page-details.module.css';

interface PageDetailsComponentProps {
  children: ReactNode;
  title: string;
}

export const PageDetailsComponent: FC<PageDetailsComponentProps> = ({
  title,
  children
}) => (
  <div className={styles.wrapper}>
    <h1 className={'text text_type_main-large'}>{title}</h1>
    {children}
  </div>
);
