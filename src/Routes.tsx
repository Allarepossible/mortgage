import Deposit from './pages/Deposit';
import Mortgage from './pages/Mortgage';
import Home from './pages/Home';

export default [{
    ...Home,
    path: '/',
    exact: true,
}, {
    ...Deposit,
    path: '/deposit',
}, {
    ...Mortgage,
    path: '/mortgage',
}];
