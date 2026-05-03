import { ThemeProvider } from '@/context/theme-provider';
import { Routes } from '@/routes/Routes';

export function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}
