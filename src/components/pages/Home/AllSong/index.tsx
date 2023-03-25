import axios from 'axios';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../common/Modal';
import useFetch from '../../../hooks/useFetch';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../_redux/features/user';
import styles from '../Home.module.scss';

type songTypes = {
    _id: string;
    artist: string;
    artist_avatar: string;
    name: string;
    song_thumbnail: string;
    song_url: string;
    createdAt: string;
    updatedAt: string;
};

const songType = [
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

const AllSong = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const { data, isPending, error } = useFetch(
        `${process.env.REACT_APP_API_URL}/song/all-songs`
    );

    const filterDataByDate = data?.data.sort((a: any, b: any) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    });

    const songs = filterDataByDate;

    const [songDataModal, setSongDataModal] = React.useState<songTypes>();

    const [songId, setSongId] = React.useState<string>('');
    const [song, setSong] = React.useState<string | undefined>('');
    const [songUrl, setSongUrl] = React.useState<string>('');
    const [songThumbnail, setSongThumbnail] = React.useState<string>('');
    const [artist, setArtist] = React.useState<string>('');
    const [artistAvatar, setArtistAvatar] = React.useState<string>('');
    const [songTypeI, setSongTypeI] = React.useState<string[]>([]);
    const [updateSongPending, setUpdateSongPending] =
        React.useState<boolean>(false);

    const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
    const [editModal, setEditModal] = React.useState<boolean>(false);

    if (error) return <div>{error}</div>;

    const handleOpenEditModal = (id: string) => {
        setEditModal(true);
        const song = songs?.find((song: songTypes) => song._id === id);

        setSongId(song?._id);
        setSong(song?.name);
        setSongUrl(song?.song_url);
        setSongThumbnail(song?.song_thumbnail);
        setArtist(song?.artist);
        setArtistAvatar(song?.artist_avatar);
        setSongTypeI(song?.song_types);
    };

    const handleEditSong = async () => {
        try {
            setUpdateSongPending(true);
            await axios.put(
                `${process.env.REACT_APP_API_URL}/song/update/${songId}`,
                {
                    name: song,
                    song_url: songUrl,
                    song_thumbnail: songThumbnail,
                    artist: artist,
                    artist_avatar: artistAvatar,
                    song_types: songTypeI,
                },
                {
                    headers: {
                        authorization: user.tokens.accessToken,
                        'x-client-id': user.user.id,
                    },
                }
            );
            setUpdateSongPending(false);
            setEditModal(false);
            navigate(0);
        } catch (error: any) {
            setUpdateSongPending(false);
            if (error.response.status === 401) {
                await dispatch(logout());
            }
        }
    };

    const handleOpenDeleteModal = (id: string) => {
        setDeleteModal(true);
        const song = songs?.find((song: songTypes) => song._id === id);
        setSongDataModal(song);
    };
    const handleDeleteSong = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/song/delete/${songDataModal?._id}`,
                {
                    headers: {
                        authorization: user.tokens.accessToken,
                        'x-client-id': user.user.id,
                    },
                }
            );
            setDeleteModal(false);
            navigate(0);
        } catch (error: any) {
            if (error.response.status === 401) {
                await dispatch(logout());
            }
        }
    };

    return (
        <>
            <section className={styles.wrapperAllSong}>
                <header className='song-header'>
                    <h2 className='song-header--title'>All Song</h2>
                    <div className='song-header--right'>
                        <div
                            className='add-song'
                            onClick={() => navigate('/add-song')}>
                            <i className='fa-solid fa-plus'></i>
                            <span>Add new song</span>
                        </div>
                    </div>
                </header>

                <section className='song-content'>
                    <div className='song-content--header'>
                        <h3 className='title'>Current songs</h3>
                        <div className='search'>
                            <i className='fa-solid fa-search'></i>
                            <input />
                        </div>
                    </div>

                    <div className='song-table-section'>
                        <table id='table-song'>
                            <thead>
                                <tr className='table-header'>
                                    <th>Song</th>
                                    <th className='table-header--col1 center'>
                                        Artist
                                    </th>
                                    <th className='table-header--col1 center'>
                                        Artist avatar
                                    </th>
                                    <th className='table-header--col1 center'>
                                        Thumbnail
                                    </th>
                                    <th>Song url</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {isPending ? (
                                    <tr>
                                        <td>
                                            <Skeleton />
                                        </td>
                                        <td>
                                            <Skeleton />
                                        </td>
                                        <td>
                                            <Skeleton />
                                        </td>
                                        <td>
                                            <Skeleton />
                                        </td>
                                        <td>
                                            <Skeleton />
                                        </td>
                                    </tr>
                                ) : (
                                    songs.map((item: songTypes) => {
                                        return (
                                            <tr
                                                key={item._id}
                                                className='table-item'>
                                                <td>{item.name}</td>
                                                <td className='center'>
                                                    {item.artist}
                                                </td>
                                                <td className='center'>
                                                    <img
                                                        className='table-item--avatar'
                                                        src={item.artist_avatar}
                                                        alt='avatar'
                                                        loading='lazy'
                                                    />
                                                </td>
                                                <td className='center'>
                                                    <img
                                                        className='table-item--thumbnail'
                                                        src={
                                                            item.song_thumbnail
                                                        }
                                                        alt='thumbnail'
                                                    />
                                                </td>
                                                <td>{item.song_url}</td>
                                                <td className='action'>
                                                    <div
                                                        className='action-item action-item-edit'
                                                        onClick={() =>
                                                            handleOpenEditModal(
                                                                item._id
                                                            )
                                                        }>
                                                        Edit
                                                    </div>
                                                    <div
                                                        className='action-item action-item-delete'
                                                        onClick={() =>
                                                            handleOpenDeleteModal(
                                                                item._id
                                                            )
                                                        }>
                                                        Delete
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>

            {editModal && (
                <Modal
                    title={'Edit song'}
                    show={editModal}
                    close={() => {
                        setEditModal(false);
                    }}
                    size='auto'>
                    <section className={styles.wrapperEditModal}>
                        <div className='modal-content'>
                            <form className='modal-form'>
                                <div className='wrapper-group'>
                                    <div className='form-group'>
                                        <input
                                            type='text'
                                            id='input-song-name'
                                            required
                                            value={song}
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
                                            value={songUrl}
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
                                            value={artist}
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
                                            value={artistAvatar}
                                            required
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setArtistAvatar(e.target.value)
                                            }
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
                                        value={songThumbnail}
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
                                    {songType.map((item) => {
                                        return (
                                            <div
                                                className='form-checkbox--item'
                                                key={item.id}>
                                                <input
                                                    type='checkbox'
                                                    value={item.name}
                                                    checked={songTypeI.includes(
                                                        item.name
                                                    )}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSongTypeI([
                                                                ...songTypeI,
                                                                item.name,
                                                            ]);
                                                        } else {
                                                            setSongTypeI(
                                                                songTypeI.filter(
                                                                    (type) =>
                                                                        type !==
                                                                        item.name
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span>{item.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </form>

                            <button
                                className='edit-modal-btn'
                                onClick={handleEditSong}
                                disabled={updateSongPending}>
                                Update
                            </button>
                        </div>
                    </section>
                </Modal>
            )}

            {deleteModal && (
                <Modal
                    title='Delete Song'
                    show={deleteModal}
                    close={() => {
                        setDeleteModal(false);
                        setSongDataModal(undefined);
                    }}
                    size='auto'>
                    <section className={styles.wrapperDeleteModal}>
                        <div className='modal-content'>
                            <h4 className='title'>Are you sure?</h4>
                            <p className='description'>{songDataModal?.name}</p>
                        </div>

                        <div className='modal-footer'>
                            <div
                                className='close'
                                onClick={() => {
                                    setDeleteModal(false);
                                    setSongDataModal(undefined);
                                }}>
                                Close
                            </div>
                            <button onClick={handleDeleteSong}>Delete</button>
                        </div>
                    </section>
                </Modal>
            )}
        </>
    );
};

export default AllSong;
