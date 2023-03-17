import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

// type AxiosRes = {
//     message: string;
//     data: {
//         _id: string;
//         name: string;
//         artist: string;
//         artist_avatar: string;
//         song_thumbnail: string;
//         song_url: string;
//         type: string[];
//         slug: string;
//         createdAt: string;
//         updatedAt: string;
//     };
// };

const AddSong = () => {
    const navigate = useNavigate();

    const [artist, setArtist] = useState<string>('');
    const [artistAvatar, setArtistAvatar] = useState<string>('');
    const [song, setSong] = useState<string>('');
    const [songThumbnail, setSongThumbnail] = useState<string>('');
    const [songUrl, setSongUrl] = useState<string>('');
    const [songType, setSongType] = useState<string[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);

    const data = {
        artist: artist,
        artist_avatar: artistAvatar,
        name: song,
        song_thumbnail: songThumbnail,
        song_url: songUrl,
        song_types: songType,
    };

    const handleAddSong = async () => {
        try {
            setIsPending(true);
            await axios.post(`${process.env.REACT_APP_API_URL}/create`, data);
            setIsPending(false);
            toast.success('Add song successfully');
            navigate('/');
        } catch (error: unknown) {
            toast.error(error as string);
            setIsPending(false);
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
                                <label htmlFor='input-artis' className='label'>
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

                        <button onClick={handleAddSong} disabled={isPending}>
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddSong;
