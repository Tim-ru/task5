import { useTheme } from '@ui-kitten/components';

export function Themed({ children }) {
  const theme = useTheme();
  return children({ theme });
}

export default Themed;
