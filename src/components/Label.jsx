
import React from 'react';

export default function Label(props) {
  return (
    <p className="text-neutral-400 text-xs mb-1 dark:text-neutral-300">{props.children}</p>
  );
}
