'use client';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MySelectAutoCompl = ({
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
  selectedOption?: string;
  arrToSelect: any[];
}) => {
  const [objToDisplay, setObjToDisplay] = useState<any | null>(null); //for using autocomplete

  const [inputShowValue, setInputShowValue] = useState('');

  useEffect(() => {
    if (selectedOption) {
      const selectedObj = arrToSelect.find(
        (item) => item._id === selectedOption
      );
      setObjToDisplay(selectedObj);
    }
  }, [selectedOption, arrToSelect]);

  // console.log('line 33', objToDisplay);

  return (
    <FormControl fullWidth>
      <Autocomplete
        fullWidth
        options={arrToSelect ?? []}
        getOptionLabel={(option: any) => option[fieldToShow] || ''}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === '' || option._id === value._id
        }
        id={selectName ?? ''}
        value={objToDisplay ?? null}
        inputValue={inputShowValue ?? ''}
        onChange={(event: any, newValue: any | null) => {
          if (newValue === null) {
            newValue = '';
          }
          setObjToDisplay(newValue);

          handleChangeSelects(selectName, newValue._id ?? '');
        }}
        onInputChange={(_, newInputValue) => {
          setInputShowValue(newInputValue);
        }}
        renderOption={(props, option) => {
          const { ...otherProps } = props;
          return (
            <li {...otherProps} key={option._id}>
              {option[fieldToShow]}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label={selectLabel} variant='standard' />
        )}
        // prettier-ignore
      />
    </FormControl>
  );
};

export default MySelectAutoCompl;
