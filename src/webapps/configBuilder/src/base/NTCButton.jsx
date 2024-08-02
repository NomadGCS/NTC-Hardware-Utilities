import Button from '@mui/material/Button'
import * as React from 'react'
import { useTheme } from '@mui/material'
// import { commonButtonStyles, commonHoverStyles } from './CommonButtonStyles'
import Typography from '@mui/material/Typography'

// interface ContrastButtonProps {
//     children?: any,
//     startIcon?: any,
//     endIcon?: any,
//     onClick: any;
//     text: string,
//     disabled?: boolean,
//     backgroundColor?: string,
//     sx?: any,
//     style?: any,
//     additionalText?: string;
//     onMouseEnter?: any,
//     onMouseLeave?: any,
// }

const commonButtonStyles = {
    borderRadius: '.7rem',
    textTransform: 'capitalize'
}
const commonHoverStyles = {
    boxShadow: 'none',
    filter: 'brightness(85%)'
}


/**
 * Button which contrasts the theme of the module
 *
 * @param children
 * @param startIcon icon to put at left side of the button
 * @param onClick {function} function to execute onClick
 * @param text {string} text to put on button
 * @param endIcon {HTMLElement} icon to put at right side of button
 * @param sx {object} extra styles passed in on component call
 * @param disabled {boolean} to disable or enable the button
 * @param backgroundColor {string} hex color to set button to
 * @param additionalText {string} text to display on underneath the text
 */

export default function NTCButton({
    children,
    startIcon,
    endIcon,
    onClick,
    text,
    sx,
    style,
    disabled,
    backgroundColor,
    additionalText,
    onMouseEnter,
    onMouseLeave,
}) {
    let theme = useTheme()




    return (
        <Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size={'medium'} variant={'contained'} disabled={disabled} aria-label={`${text} ${additionalText}`} sx={{
            ...sx, // Call extra styles
            ...commonButtonStyles, // Import common button styles
            backgroundColor: backgroundColor ? backgroundColor : theme.palette.custom.contrastButton,
            '&:hover': {
                ...commonHoverStyles, // Import common hover styles
                backgroundColor: backgroundColor ? backgroundColor : theme.palette.custom.buttonHoverColor
            }
        }}
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={onClick}>
            {children}
            <Typography sx={{ color: theme.palette.custom.whiteText, ...style }}>
                {text}
                {additionalText &&
                    <>
                        <br></br> {/* Need this to pass Lighthouse Accessibility testing */}
                        <Typography sx={{fontSize: '0.95rem', opacity: 0.75}} component="span">
                            {additionalText}
                        </Typography>
                    </>
                }
            </Typography>
        </Button>
    )
}
