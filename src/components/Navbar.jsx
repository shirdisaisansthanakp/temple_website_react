import { useState } from 'react';
import { NAV_LINKS } from '../helpers/constants';
import {getActivePage} from '../helpers/utils';

export default function Navbar() {
    const [activePage, setActivePage] = useState(getActivePage);

    return (
        <nav>
            <ul className="d-flex justify-content-evenly">
                {NAV_LINKS.map(({id, title}) => (
                    <li key={id} className={`${(activePage === id) ? 'active' : 'inactive'}`}>
                        <a 
                            href={id} 
                            onClick={() => {
                                setActivePage(id);
                            }}
                        >
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};