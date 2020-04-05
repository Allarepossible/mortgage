import Contact from './pages/Contact';
import Home from './pages/Home';

export default [{
    ...Home,
    path: '/',
    exact: true,
}, {
    ...Contact,
    path: '/contact',
}];
