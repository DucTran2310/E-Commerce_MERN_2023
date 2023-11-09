import { Alert, Slide, Snackbar } from '@mui/material'
import { useEffect, useState, useRef } from 'react'

function SlideTransition(props) {
    return <Slide {...props} direction="left" />
}

export default function NotifySnackbar({
    open,
    onClosedListener,
    notifyType,
    content,
    isNoTime
}) {
    const getNotifyType = (type) => {
        switch (type) {
        case 0:
            return 'error'
        case 1:
            return 'success'
        case 2:
            return 'warning'
        case 3:
            return 'info'
        default:
            return ''
        }
    }

    const [isOpen, setIsOpen] = useState(true)
    const snackbarRef = useRef(null)

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    const handleSnackbarClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setIsOpen(false)
        if (onClosedListener) {
            onClosedListener(true)
        }
    }

    const handleContentMouseDown = (event) => {
        event.stopPropagation()
    }

    const handleSnackbarMouseDown = (event) => {
        if (isNoTime) {
            // Nếu isNoTime là true, ngăn chặn sự kiện mousedown trên Snackbar
            event.stopPropagation()
        }
    }

    return (
        <Snackbar
            ref={snackbarRef}
            open={isOpen}
            onClose={handleSnackbarClosed}
            autoHideDuration={isNoTime === true ? null : 3000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            TransitionComponent={SlideTransition}
            onMouseDown={handleSnackbarMouseDown}
        >
            <Alert
                onClose={handleSnackbarClosed}
                severity={getNotifyType(notifyType)}
                sx={{ width: '100%', whiteSpace: 'pre-line' }}
                onMouseDown={handleContentMouseDown}
            >
                {content}
            </Alert>
        </Snackbar>
    )
}