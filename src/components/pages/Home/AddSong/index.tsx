import React from 'react';

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
                                <input type='text' required />
                                <label className='label'>Artist</label>
                            </div>
                            <div className='form-group'>
                                <input type='text' required />
                                <label className='label'>Avatar</label>
                            </div>
                        </div>

                        <div className='form-group'>
                            <input type='text' required />
                            <label className='label'>Song</label>
                        </div>
                        <div className='form-group'>
                            <input type='text' required />
                            <label className='label'>Thumbnail</label>
                        </div>

                        <div className='form-checkbox'>
                            {songTypes.map((item) => {
                                return (
                                    <div className='form-checkbox--item'>
                                        <input
                                            type='checkbox'
                                            value={item.name}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className='form-group'>
                            <input type='text' required />
                            <label className='label'>Trending</label>
                        </div>

                        <button>Add</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddSong;
