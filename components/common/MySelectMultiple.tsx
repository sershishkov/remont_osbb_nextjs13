import { useState, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MySelectMultiple = ({
  selectName,
  selectLabel,
  fieldToShow,
  handleChangeMultipleSelects,
  selectedOptions,
  arrToSelect,
}: {
  selectName: string;
  selectLabel: string;
  fieldToShow: string;
  handleChangeMultipleSelects: (
    targetName: string,
    targetValue: string[]
  ) => void;
  selectedOptions?: string[];
  arrToSelect: any[];
}) => {
  const [thisSelect, set_thisSelect] = useState<string[]>([]);

  const handleChangeMultipleSelect = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    set_thisSelect(typeof value === 'string' ? value.split(',') : value);
    handleChangeMultipleSelects(name, value as string[]);
  };

  useEffect(() => {
    if (selectedOptions) {
      set_thisSelect(selectedOptions);
    }
  }, [selectedOptions]);

  return (
    <FormControl fullWidth>
      <InputLabel id={`${selectName}-label`}>{`${selectLabel}`}</InputLabel>
      <Select
        multiple
        labelId={`${selectName}-label`}
        id={selectName}
        name={selectName}
        value={thisSelect ?? []}
        onChange={handleChangeMultipleSelect}
        input={<OutlinedInput label={`${selectLabel}`} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => {
              const newItem = arrToSelect?.find((item) => item._id === value);
              return <Chip key={value} label={`${newItem[fieldToShow]}`} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {arrToSelect?.map((item: any) => (
          <MenuItem key={item._id} value={item._id}>
            <Checkbox checked={thisSelect!.indexOf(item._id!) > -1} />
            <ListItemText primary={`${item[fieldToShow]}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MySelectMultiple;
