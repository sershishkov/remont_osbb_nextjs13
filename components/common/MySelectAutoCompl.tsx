import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MySelectAutoComl = ({
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
  // prettier-ignore
  const [inputShowValue, setInputShowValue] = useState("");

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
        // prettier-ignore
        getOptionLabel={(option: any) => option[fieldToShow] || ""}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        // prettier-ignore
        id={selectName?? ""}
        // prettier-ignore
        value={objToDisplay?? "" }
        // prettier-ignore
        inputValue={inputShowValue ?? ""}
        onChange={(event: any, newValue: any | null) => {
          if (newValue === null) {
            // prettier-ignore
            newValue = "";
          }
          setObjToDisplay(newValue);
          // prettier-ignore
          handleChangeSelects(selectName, newValue._id ?? "");
        }}
        onInputChange={(_, newInputValue) => {
          setInputShowValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={selectLabel} variant='standard' />
        )}
      />
    </FormControl>
  );
};

export default MySelectAutoComl;
