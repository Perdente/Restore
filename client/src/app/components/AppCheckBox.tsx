import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

const AppCheckBox = (props: Props) => {
  const { field } = useController({ ...props, defaultValue: false });
  const [disabledProp, setDisabledProp] = useState(props.disabled);

  useEffect(() => {
    setDisabledProp(props.disabled);
  }, []);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="secondary"
          disabled={disabledProp}
        />
      }
      label={props.label}
    />
  );
};

export default AppCheckBox;
