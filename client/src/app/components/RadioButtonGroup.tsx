import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  sortOptions: any[];
  onChange: (event: any) => void;
  selectedValue?: string;
}

export default function RadioButtonGroup({
  sortOptions,
  onChange,
  selectedValue,
}: Props) {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {sortOptions.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            label={label}
            control={<Radio />}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
