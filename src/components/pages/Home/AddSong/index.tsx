import axios from 'axios';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../../common/Modal';

import { logout } from '../../../_redux/features/user';

import styles from '../Home.module.scss';

const songTypes = [
    {
        id: 1,
        name: 'mood',
    },
    {
        id: 2,
        name: 'sadness',
    },
    {
        id: 3,
        name: 'chill',
    },
    {
        id: 4,
        name: 'lofi',
    },
    {
        id: 5,
        name: 'study',
    },
];

const AddSong = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);

    const [artist, setArtist] = useState<string>('');
    const [artistAvatar, setArtistAvatar] = useState<string>('');
    const [song, setSong] = useState<string>('');
    const [songThumbnail, setSongThumbnail] = useState<string>('');
    const [songUrl, setSongUrl] = useState<string>('');
    const [songType, setSongType] = useState<string[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);

    const data = {
        artist: artist,
        artist_avatar: artistAvatar,
        name: song,
        song_thumbnail: songThumbnail,
        song_url: songUrl,
        song_types: songType,
    };

    const handleAddSong = async () => {
        if (
            !artist ||
            !artistAvatar ||
            !song ||
            !songThumbnail ||
            !songUrl ||
            !songType.length
        ) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            setIsPending(true);
            await axios.post(
                `${process.env.REACT_APP_API_URL}/song/create`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: user.tokens.accessToken,
                        'x-client-id': user.user.id,
                    },
                }
            );
            setIsPending(false);
            toast.success('Add song successfully');
            navigate('/');
        } catch (error: any) {
            setIsPending(false);
            if (error.response.status === 401) {
                setOpen(true);
            }

            console.log(error);
        }
    };

    const handleAddSongType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement & EventTarget;
        const isChecked = e.target.checked;
        if (isChecked) {
            setSongType((prev) => [...prev, value]);
        } else {
            setSongType((prev) => prev.filter((item) => item !== value));
        }
    };

    return (
        <>
            <section className={styles.wrapperAddSong}>
                <header className='add-song--header'>
                    <h3 className='title'>Add new song</h3>
                </header>

                <div className={`${styles.wrapperEditModal} add-song--content`}>
                    <div className='modal-content'>
                        <form className='modal-form'>
                            <div className='wrapper-group'>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        id='input-song-name'
                                        required
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setSong(e.target.value)}
                                    />
                                    <label
                                        htmlFor='input-song-name'
                                        className='label'>
                                        Song name
                                    </label>
                                </div>

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        id='input-song-url'
                                        required
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setSongUrl(e.target.value)}
                                    />
                                    <label
                                        htmlFor='input-song-url'
                                        className='label'>
                                        Song url
                                    </label>
                                </div>
                            </div>

                            <div className='wrapper-group'>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        id='input-artis'
                                        required
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setArtist(e.target.value)}
                                    />
                                    <label
                                        htmlFor='input-artis'
                                        className='label'>
                                        Artist
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        id='input-artis-avatar'
                                        required
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setArtistAvatar(e.target.value)}
                                    />
                                    <label
                                        htmlFor='input-artis-avatar'
                                        className='label'>
                                        Avatar
                                    </label>
                                </div>
                            </div>

                            <div className='form-group'>
                                <input
                                    type='text'
                                    id='input-song-thumbnail'
                                    required
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setSongThumbnail(e.target.value)}
                                />
                                <label
                                    htmlFor='input-song-thumbnail'
                                    className='label'>
                                    Thumbnail
                                </label>
                            </div>

                            <div className='form-checkbox'>
                                {songTypes.map((item) => {
                                    return (
                                        <div
                                            className='form-checkbox--item'
                                            key={item.id}>
                                            <input
                                                type='checkbox'
                                                value={item.name}
                                                onChange={handleAddSongType}
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={handleAddSong}
                                disabled={isPending}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {open && (
                <Modal title={'Error'} show={open} close={() => setOpen(false)}>
                    <div className={styles.wrapperExpModal}>
                        <div className='modal-content'>
                            <p> Expried token, please login again!</p>
                        </div>

                        <div className='modal-footer'>
                            <button
                                onClick={() => {
                                    dispatch(logout());
                                    setOpen(false);
                                }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default AddSong;
