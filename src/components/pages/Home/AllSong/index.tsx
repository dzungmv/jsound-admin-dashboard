import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../common/Modal';
import useFetch from '../../../hooks/useFetch';

import styles from '../Home.module.scss';

type songTypes = {
    _id: string;
    artist: string;
    artist_avatar: string;
    name: string;
    song_thumbnail: string;
    song_url: string;
};

const AllSong = () => {
    const navigate = useNavigate();
    const { data, isPending, error } = useFetch(
        `${process.env.REACT_APP_API_URL}/all-songs`
    );

    const [deleteModal, setDeleteModal] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);

    const [songDataModal, setSongDataModal] = React.useState<songTypes>();

    const songs = data?.data;

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleOpenEditModal = (id: string) => {
        setEditModal(true);
        const song = songs?.find((song: songTypes) => song._id === id);
        setSongDataModal(song);
    };

    const handleOpenDeleteModal = (id: string) => {
        setDeleteModal(true);
        const song = songs?.find((song: songTypes) => song._id === id);
        setSongDataModal(song);
    };
    const handleDeleteSong = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/delete/${songDataModal?._id}`
            );
            setDeleteModal(false);
            navigate(0);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <section className={styles.wrapperAllSong}>
                <header className='song-header'>
                    <h2 className='song-header--title'>All Song</h2>
                    <figure className='avatar'>
                        <img
                            src='https://jungjung261.blob.core.windows.net/nextjs-project/user/avatar.jpg'
                            alt='avatar'
                            loading='lazy'
                        />
                    </figure>
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
                                    <th>Artist</th>
                                    <th>Avatar</th>
                                    <th>Song</th>
                                    <th>Thumbnail</th>
                                    <th>Song url</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((item: songTypes) => {
                                    return (
                                        <tr
                                            key={item._id}
                                            className='table-item'>
                                            <td>{item.artist}</td>
                                            <td>{item.artist_avatar}</td>
                                            <td>{item.name}</td>
                                            <td>{item.song_thumbnail}</td>
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
                                })}
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
                        setSongDataModal(undefined);
                    }}
                    size='auto'>
                    <section className={styles.wrapperEditModal}>
                        <div className='modal-content'>
                            {songDataModal?.name}
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
