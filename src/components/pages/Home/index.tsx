import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './Home.module.scss';

const ITEM_MENU = [
    {
        id: 1,
        name: 'Home',
        icon: 'fa-solid fa-home',
        url: '/',
    },
    {
        id: 2,
        name: 'Artists',
        icon: 'fa-solid fa-user',
        url: '/artists',
    },
];

const HomePage: React.FC = () => {
    return (
        <main className={styles.wrapperHome}>
            <section className='section-left'>
                <aside className='section-left--aside'>
                    <header className='section-left--header'>
                        <figure className='header-logo'>
                            <img
                                src={
                                    'https://jungjung261.blob.core.windows.net/nextjs-project/jmusic/j-brand.svg'
                                }
                                alt='Jsound'
                            />
                        </figure>
                        <h1>Jsound</h1>
                    </header>

                    <section className='section-left--content'>
                        <div className='main-content'>
                            {ITEM_MENU.map((item) => {
                                return (
                                    <NavLink
                                        to={item.url}
                                        className='item'
                                        key={item.id}>
                                        <i className={item.icon}></i>
                                        <span>{item.name}</span>
                                    </NavLink>
                                );
                            })}
                        </div>
                        <div className='footer-section'>
                            <div className='item'>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <span>Logout</span>
                            </div>
                        </div>
                    </section>
                </aside>
            </section>
            <section className='section-right'>
                <Outlet />
            </section>
        </main>
    );
};

export default HomePage;
