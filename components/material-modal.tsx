import { Box, Modal, Theme, useTheme } from "@mui/material"
import React from "react"

const style = (theme:Theme) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '100vw',
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: '70vw',
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '50vw',
    },
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
});

const MaterialModal = ({ children, open, onClose }
:
{
    children: React.ReactNode,
    open: boolean,
    onClose: () => void,
}
) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            >
            <Box sx={{ ...style(theme) }}>
                {children}
            </Box>
        </Modal>
    )
}

export default MaterialModal;