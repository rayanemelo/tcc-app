import { MarkerFloodProvider } from '@/context/MarkerFloodContext';
import MapScreen from '@/screens/Map';

export default function Screen() {
  return (
    <MarkerFloodProvider>
      <MapScreen />
    </MarkerFloodProvider>
  );
}
