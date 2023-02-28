import React from 'react';

import { Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => (
  <div>
    <label>
      <Input type="text" value={value} onChange={onChange} />
    </label>
  </div>
);
