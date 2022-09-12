import React, { useState } from 'react' 
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles';
import LockedOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';


const Auth = () => {
    const classes = useStyles();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isSignUp, setIsSignUp ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = jwt_decode(res?.credential); // ?. does not throw error if obj does not exist it throws undefined

        try {
            dispatch({ type: 'AUTH', data: { result }});

            history.push('/');
        } catch (error) {
            console.log(error)
        }
    };

    const googleFaliure = () => {
        console.log('Google sign in was unsuccessful. Try again later.')
    };


    return (
        <GoogleOAuthProvider clientId='980007145381-kb2encbgrleigjs7tehror49t0bp3u0e.apps.googleusercontent.com'>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockedOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography> 
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                        <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name='email' label='Email Address' handleChane={handleChange} type='email' />
                            <Input name='password' label='Password' handleChane={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                        </Grid>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            className={classes.googleButton}
                            theme='filled_blue'
                            onSuccess={googleSuccess}
                            onFailure={googleFaliure}
                            cookiePolicy='single_host_origin'
                        />
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form> 
                </Paper>
            </Container>
        </GoogleOAuthProvider>
    )
}

export default Auth