import Deposit from './pages/Deposit';
import Home from './pages/Home';

export default [{
    ...Home,
    path: '/',
    exact: true,
}, {
    ...Deposit,
    path: '/deposit',
}];
