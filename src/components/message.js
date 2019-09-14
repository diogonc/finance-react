import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as actions from '../redux/actions/appMainActions';

const messageComponent = function ShowMessage(props) {

    if(!props.message)
        return null;

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        props.closeMessage();
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open="true"
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{props.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        message: state.appMain.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeMessage: () => dispatch(actions.closeMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(messageComponent);