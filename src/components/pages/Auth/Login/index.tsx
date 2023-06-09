import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../_redux/features/user';

import LoadingScreen from '../../../common/LoadingScreen';
import styles from './Login.module.scss';

interface LoginResponse {
    data: {
        message: string;
        metadata: {
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
            user: {
                id: string;
                username: string;
                email: string;
            };
        };
    };
}

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);

    const checkLogin = user?.tokens?.accessToken;

    useEffect(() => {
        if (checkLogin) {
            navigate('/');
        }
    }, [checkLogin, navigate]);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [validateUsername, setValidateUserName] = useState<string>('');
    const [validatePassword, setValidatePassword] = useState<string>('');

    const [loginPending, setLoginPending] = useState<boolean>(false);

    const handleLogin = async () => {
        if (username === '') {
            setValidateUserName('Username is required');
            return;
        }

        if (password === '') {
            setValidatePassword('Password is required');
            return;
        }

        try {
            setLoginPending(true);
            const response: LoginResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                {
                    username,
                    password,
                }
            );

            console.log(response.data);

            await dispatch(getUser(response.data.metadata));

            setLoginPending(false);
            toast.success('Login successfully!');
            // navigate('/');
        } catch (error: any) {
            if (error.response.data.message.includes('User')) {
                setValidateUserName(error.response.data.message);
            }

            if (error.response.data.message.includes('Password')) {
                setValidatePassword(error.response.data.message);
            }

            setLoginPending(false);
        }
    };

    useEffect(() => {
        if (username !== '') {
            setValidateUserName('');
        }

        if (password !== '') {
            setValidatePassword('');
        }
    }, [username, password]);

    return (
        <>
            <section className={styles.wrapperLogin}>
                <div className='login-container'>
                    <div className='login-left'>
                        <h3 className='login-left-hi'>
                            Hi, stranger
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '100px',
                                    height: '100px',
                                }}>
                                <Player
                                    src={
                                        'https://assets1.lottiefiles.com/packages/lf20_myejiggj.json'
                                    }
                                    autoplay
                                    loop
                                />
                            </span>
                        </h3>
                        <div className='form'>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className='form-validate'>
                                {validateUsername && (
                                    <span className='validate'>
                                        {validateUsername}
                                    </span>
                                )}
                                <span className='hidden'>A</span>
                            </div>

                            <div className='form-group'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='form-validate'>
                                {validatePassword && (
                                    <span className='validate'>
                                        {validatePassword}
                                    </span>
                                )}
                                <span className='hidden'>A</span>
                            </div>

                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                    <figure className='login-right'>
                        <img
                            src={
                                'https://jungjung261.blob.core.windows.net/nextjs-project/notes_app/hero-login.png'
                            }
                            alt='Login page'
                        />
                    </figure>
                </div>
            </section>

            {loginPending && <LoadingScreen content={'Login...'} />}
        </>
    );
};

export default LoginPage;
