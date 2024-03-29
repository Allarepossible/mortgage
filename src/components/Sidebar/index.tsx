import React from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {IoIosStats, IoIosCalendar, IoIosMan, IoIosCalculator, IoIosSettings} from 'react-icons/io';

import {Wrap, Menu, Logo, Settings} from  './styles';

const Sidebar = () => (
    <Wrap>
        <IconContext.Provider value={{color: 'white', size: '30px'}}>
            <Link to="/"><Logo>
                <IconContext.Provider value={{color: 'white', size: '70px'}}>
                    <IoIosCalculator />
                </IconContext.Provider>
            </Logo></Link>
            <Menu>
                <div><IoIosCalendar /></div>
                <div><IoIosMan /></div>
                <div><IoIosStats /></div>
            </Menu>
            <Settings><IoIosSettings /></Settings>
        </IconContext.Provider>
    </Wrap>
);

export default Sidebar;
