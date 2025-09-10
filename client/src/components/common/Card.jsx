import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, icon, children, className, onClick }) => {
  const isClickable = !!onClick;

  const cardProps = {
    className: `${styles.card} ${isClickable ? styles.clickable : ''} ${className || ''}`,
    onClick: onClick,
    onKeyDown: isClickable ? e => (e.key === "Enter" ? onClick() : null) : undefined,
    tabIndex: isClickable ? 0 : undefined,
    role: isClickable ? 'button' : undefined,
  };

  return (
    <div {...cardProps}>
      {icon && <div className={styles.cardIcon}>{icon}</div>}
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default Card;