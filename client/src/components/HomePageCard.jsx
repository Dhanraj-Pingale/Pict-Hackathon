import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HomePageCard(props) {
    return (
        <>
            <div className="relative bg-customDark bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-md hover:scale-105 transform transition-all duration-300 shadow-[0_0_15px_5px_rgba(0,191,255,0.3)]">
                <h2 className="text-3xl font-semibold">{props.title}</h2>
                <div className="text-4xl mt-8">{props.emoji}</div>
                <span className="absolute bottom-6 right-6 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-white text-black">
                    <NavLink to={props.path}>
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                    </NavLink>
                </span>
            </div>
        </>
    );
}
