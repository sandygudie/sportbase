import { createTheme } from "@mui/material/styles";
import tw, { theme as tailwindTheme } from "twin.macro";

const theme = createTheme({
  typography: {
    fontFamily: "Futura",
  },
  palette: {
    primary: {
      main: tailwindTheme`colors.primary`,
      contrastText: tailwindTheme`colors.white`,
    },
    secondary: {
      main: tailwindTheme`colors.primary-light`,
      contrastText: tailwindTheme`colors.primary`,
    },
    error: {
      main: tailwindTheme`colors.error`,
      contrastText: tailwindTheme`colors.white`,
    },
    success: {
      main: tailwindTheme`colors.success`,
      contrastText: tailwindTheme`colors.white`,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&.MuiPickersDay-root": {
            backgroundColor: "inherit " + "!important",
          },
          "&.MuiPickersDay-root:not(.Mui-disabled)": {
            color: tailwindTheme`textColor.base` + "!important",
          },
          "&.MuiPickersDay-root.Mui-selected": {
            backgroundColor: tailwindTheme`colors.primary` + "!important",
            color: tailwindTheme`colors.white` + "!important",
          },
        },
      },
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       color: tailwindTheme`textColor.base` + "!important",
    //       fontWeight: 300,
    //     },
    //   },
    // },
    // MuiFormHelperText: {
    //   styleOverrides: {
    //     contained: {
    //       marginLeft: 0,
    //     },
    //   },
    // },
    // MuiSkeleton: {
    //   defaultProps: {
    //     animation: "wave",
    //   },
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: tailwindTheme`backgroundColor.light`,
    //     },
    //   },
    // },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "large",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          ...tw`bg-primary`,
          color: tailwindTheme`colors.white` + "!important",
          "&.Mui-disabled:disabled": {
            backgroundColor: tailwindTheme`colors.gray.200`,
            color: tailwindTheme`colors.white`,
          },
        },
        outlinedPrimary: {
          borderColor: tailwindTheme`colors.gray.200`,
          color: tailwindTheme`colors.gray.200`,
        },
        sizeLarge: {
          height: "3.5rem",
          ...tw`px-8 text-base`,
        },
      },
    },
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       ...tw`text-base`,
    //       "&.Mui-disabled:disabled": {
    //         ...tw`dark:text-white/[.26]`,
    //       },
    //     },
    //   },
    // },
    // MuiCheckbox: {
    //   styleOverrides: {
    //     root: {
    //       ...tw`p-1`,
    //     },
    //   },
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: tailwindTheme`backgroundColor.skin.input`,
    //       color: tailwindTheme`textColor.base`,
    //       caretColor: tailwindTheme`caretColor.primary`,
    //       "&:hover .MuiOutlinedInput-notchedOutline": {
    //         borderColor: tailwindTheme`colors.primary` + "!important",
    //       },
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       ...tw`border-gray-100 dark:border-transparent`,
    //     },
    //   },
    // },
    // MuiAutocomplete: {
    //   styleOverrides: {
    //     root: {
    //       "& div.MuiFilledInput-root": {
    //         padding: "10px" + "!important",
    //       },
    //     },
    //   },
    // },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "4px",
    //       borderWidth: "1px",
    //       borderColor: "transparent",
    //       backgroundColor: tailwindTheme`backgroundColor[light-blue]`,
    //       padding: "0px",
    //       ":before": {
    //         border: "none",
    //       },
    //       ":after": {
    //         border: "none",
    //       },
    //       "&.Mui-error": {
    //         borderWidth: "1px",
    //         borderColor: tailwindTheme`colors.error` + "!important",
    //       },
    //       "&.Mui-focused": {
    //         borderWidth: "1px",
    //         borderColor: tailwindTheme`colors.primary` + "!important",
    //         backgroundColor: tailwindTheme`backgroundColor[light-blue]`,
    //       },
    //       "&:hover": {
    //         borderColor: tailwindTheme`colors.primary` + "!important",
    //         backgroundColor: tailwindTheme`backgroundColor[light-blue]`,
    //         "&:before": {
    //           borderBottom: "none" + "!important",
    //         },
    //       },
    //       "&.Mui-disabled::before": {
    //         borderBottom: "none" + "!important",
    //       },
    //     },
    //     input: { padding: "16.5px 14px" },
    //   },
    // },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       ...tw`text-xs text-gray-300 dark:text-gray-200`,
    //       position: "relative",
    //       transform: "none",
    //       textTransform: "uppercase",
    //       marginBottom: "10px",
    //       "&:hover": {
    //         color: "tailwindTheme`colors.gray.300`" + "!important",
    //       },
    //       "&.Mui-focused": {
    //         color: "tailwindTheme`colors.gray.300`" + "!important",
    //       },
    //     },
    //   },
    // },
    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     root: {
    //       "&.MuiFormControlLabel-root": {
    //         cursor: "default",
    //       },
    //     },
    //     label: {
    //       ...tw`text-xs text-gray-300 dark:text-gray-200`,
    //     },
    //   },
    // },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       "&.MuiSelect-icon": {
    //         color: "inherit",
    //       },
    //     },
    //   },
    // },
    // MuiTabs: {
    //   defaultProps: {
    //     TabIndicatorProps: {
    //       children: <span className="MuiTabs-indicatorSpan" />,
    //     },
    //   },
    //   styleOverrides: {
    //     root: {
    //       "& .MuiTabs-indicator": {
    //         display: "flex",
    //         ...tw`justify-start lg:justify-center`,
    //         backgroundColor: "transparent",
    //         height: "0.2rem",
    //       },
    //       "& .MuiTabs-indicatorSpan": {
    //         maxWidth: "5rem",
    //         width: "100%",
    //         backgroundColor: "tailwindTheme`textColor.base`",
    //       },
    //       "& .MuiTabs-adminIndicatorSpan": {
    //         maxWidth: "5rem",
    //         width: "100%",
    //         backgroundColor: tailwindTheme`textColor.primary`,
    //       },
    //     },
    //   },
    // },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "inherit",
    //       ...tw`font-lex items-start lg:items-center`,
    //       "&.Mui-selected": {
    //         fontWeight: 600,
    //         fontSize: "1.25rem" + "!important",
    //         ...tw`font-clash`,
    //         color: tailwindTheme`textColor.base` + "!important",
    //       },
    //     },
    //   },
    // },
    // MuiSnackbar: {
    //   styleOverrides: {
    //     root: {
    //       ...tw`lg:left-[60%]`,
    //       top: "6rem" + "!important",
    //       "& .MuiPaper-root": {
    //         ...tw`shadow-md dark:bg-gray-600 bg-white font-light`,
    //         color: tailwindTheme`textColor.base`,
    //       },
    //     },
    //   },
    // },
    // MuiMenuItem: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 300,
    //       "&.Mui-selected": {
    //         ...tw`text-primary`,
    //         backgroundColor: "hsla(18, 90%, 57%, 0.1)",
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
