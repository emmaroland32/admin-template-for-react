import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { actions as authActions } from '../../service/auth';
import { actions as globalActions } from '../../service/global';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: 'auto',
            display: 'block',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing.unit * 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        },
        avatar: {
            margin: theme.spacing.unit,
            backgroundColor: theme.palette.secondary.main,
            width: 100,
            height: 100,
            fontSize: 110,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing.unit,
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });

interface LoginComponentProps {
    history: any;
    classes: any;
    onLogin: (username: string, password: string) => boolean;
}

interface LoginComponentState {
    username: string;
    password: string;
    rememberMe: boolean;
}

class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: true,
        };
        this.onLogin = this.onLogin.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleRounded fontSize='inherit' />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin='normal' required={true} fullWidth={true}>
                            <InputLabel htmlFor='username'>Username</InputLabel>
                            <Input
                                id='username'
                                name='username'
                                type='text'
                                autoComplete='username'
                                autoFocus={true}
                                onChange={(e) => {
                                    this.setState({ username: e.target.value });
                                }}
                            />
                        </FormControl>
                        <FormControl margin='normal' required={true} fullWidth={true}>
                            <InputLabel htmlFor='password'>Password</InputLabel>
                            <Input
                                name='password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                onChange={(e) => {
                                    this.setState({ password: e.target.value });
                                }}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value='remember'
                                    color='primary'
                                    checked={this.state.rememberMe}
                                    onChange={(e, v) => {
                                        this.setState({ rememberMe: v });
                                    }}
                                />
                            }
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth={true}
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={this.onLogin}>
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }

    private onLogin(event) {
        this.props.onLogin(this.state.username, this.state.password);
        event.preventDefault();
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogin: (username: string, password: string, rememberMe: boolean): boolean => {
        if (!username || !password) {
            dispatch(
                globalActions.notify({
                    message: 'Please enter your username and password!',
                    variant: 'error',
                    placement: 'bottom center',
                }),
            );
            return false;
        }
        dispatch(authActions.login({username, password, rememberMe}));
        return true;
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginComponent));
