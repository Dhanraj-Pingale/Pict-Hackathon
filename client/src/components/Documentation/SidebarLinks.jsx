import React from 'react';

export default function SidebarLinks(props) {
    const fn = props.onClick;
 
    return (
        <>
        <li className="text-lg flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        onClick={fn ? fn : undefined} // Show prompt window on click
        >
            {props.icon} {props.title}
           
        </li>

        </>
    );
}
