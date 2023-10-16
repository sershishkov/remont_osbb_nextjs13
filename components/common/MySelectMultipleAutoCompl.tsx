import { useState, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const MySelectMultipleAutoCompl = ({
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
  const [arr_Objects, setArr_Objects] = useState<any | null>(null); //for using autocomplete
  // prettier-ignore
  const [inputShowValue, setInputShowValue] = useState("");

  const handleChangeMultipleSelect = (newValue: any) => {
    const arrSelectedIDs = newValue.map((item: any) => item._id);

    handleChangeMultipleSelects(selectName, arrSelectedIDs);
  };

  useEffect(() => {
    if (selectedOptions) {
      const arrSelectedObjects = arrToSelect.filter((item) =>
        selectedOptions.includes(item._id)
      );

      setArr_Objects(arrSelectedObjects);
    }
  }, [selectedOptions, arrToSelect]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        multiple
        fullWidth
        options={arrToSelect ?? []}
        // prettier-ignore
        getOptionLabel={(option: any) => option[fieldToShow] || ""}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        id={selectName}
        value={arr_Objects ?? []}
        // prettier-ignore
        inputValue={inputShowValue ?? ""}
        onChange={(event: any, newValue: any | null) => {
          setArr_Objects(newValue);
          handleChangeMultipleSelect(newValue);
        }}
        onInputChange={(_, newInputValue) => {
          setInputShowValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={selectLabel} variant='standard' />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[fieldToShow]}
          </li>
        )}
      />
    </FormControl>
  );
};

export default MySelectMultipleAutoCompl;
