import { IconButton, InputAdornment, TextField } from '@material-ui/core';

const Input = (props) => {
  const { id, variant, placeholder, iconStart, iconEnd, label, type, className,
    value, handleChange, error, errorReason, isClickIcon, handleClickShowPassword } = props;

  const stylesCSS = {
    input: {
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    }
  }

  return (
    <TextField
      id={id ? id : "outlined-basic"}
      label={label}
      value={value}
      placeholder={placeholder}
      type={type}
      variant={variant ? variant : "outlined"}
      className={className}
      onChange={handleChange}
      sx={{ ...stylesCSS.input }}
      InputProps={{
        startAdornment: iconStart && (
          <InputAdornment position="start">
            {iconStart}
          </InputAdornment>
        ),
        endAdornment: isClickIcon ? (
          iconEnd && (
            <InputAdornment position="end">
              {iconEnd}
            </InputAdornment>
          )
        ) : (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {iconEnd}
            </IconButton>
          </InputAdornment>
        )
      }}
      error={error}
      helperText={error && errorReason}
    />
  );
};

export default Input;