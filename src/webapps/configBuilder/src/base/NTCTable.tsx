import React from 'react'
import { Table, TableContainer, TableRow, useTheme } from '@mui/material'

export const NTCTable = ({ children }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: null, boxShadow: 0 }} size="small" stickyHeader>
                {children}
            </Table>
        </TableContainer>
    )
}

export const NTCTableRow = ({ children }) => {
    let theme = useTheme()
    return (
        <TableRow sx={{
            '&:nth-of-type(even)': {
                backgroundColor: theme.palette.primary.main
            },
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.custom.oddTableStripe
            }, '&:last-child td, &:last-child th': { border: 0 }
        }}>
            {children}
        </TableRow>
    )
}
