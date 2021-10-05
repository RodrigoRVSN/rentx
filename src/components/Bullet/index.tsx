import React from 'react';

import {
  ImageIndex
} from './styles';

interface Props {
  active?: boolean;
}

export function Bullet ({active}: Props) {
   return (
    <ImageIndex active={active} />
   );
 }