import { HashRouter as Router, Route, Routes as RouterRoutes } from 'react-router';
import { Main } from '@/pages/main';

export const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path='/' element={<Main />} />
      </RouterRoutes>
    </Router>
  );
};
