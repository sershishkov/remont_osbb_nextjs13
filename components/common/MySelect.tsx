import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MySelect = ({
  selectName,
  selectLabel,
  fieldToShow,
  handleChangeSelects,
  selectedOption,
  arrToSelect,
}: {
  selectName: string;
  selectLabel: string;
  fieldToShow: string;
  handleChangeSelects: (targetName: string, targetValue: string) => void;
  selectedOption: string;
  arrToSelect: any[];
}) => {
  const [thisSelectValue, set_thisSelectValue] = useState('');

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_thisSelectValue(value);
    handleChangeSelects(name, value);
  };

  useEffect(() => {
    if (selectedOption) {
      set_thisSelectValue(selectedOption);
    }
  }, [selectedOption]);

  return (
    <FormControl fullWidth>
      <InputLabel id={`${selectName}-label`}>{`${selectLabel}`}</InputLabel>
      <Select
        labelId={`${selectName}-label`}
        id={selectName}
        name={selectName}
        value={thisSelectValue ?? ''}
        label={selectLabel}
        onChange={handleChangeSelect}
      >
        {arrToSelect?.map((item: any) => (
          <MenuItem key={item._id} value={item._id}>
            {item[fieldToShow]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MySelect;
