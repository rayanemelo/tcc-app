import { useCameraPermissions } from 'expo-camera';
import { StyleSheet, View } from 'react-native';
import CameraPermissions from './CameraPermissions';
import { useRef, useState } from 'react';
import RenderCamera from './RenderCamera';
import RenderPhoto from './RenderPhoto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFloodAreaForm } from '@/stores/flood-area-form';

type Props = {
  onClose: () => void;
  sendPhoto: () => void;
};

const Camera = ({ onClose, sendPhoto }: Props) => {
  const { floodAreaForm, setFloodAreaForm } = useFloodAreaForm();

  const [permission] = useCameraPermissions();
  const cameraRef = useRef<any | null>();
  const [photoUri, setPhotoUri] = useState<string | null>();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermissions />;
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setPhotoUri(photo?.uri);

      setFloodAreaForm({
        ...floodAreaForm,
        image: photo?.uri,
      });
    }
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        {photoUri ? (
          <RenderPhoto
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
            onClose={onClose}
            sendPhoto={sendPhoto}
          />
        ) : (
          <RenderCamera
            cameraRef={cameraRef}
            onClose={onClose}
            takePicture={takePicture}
          />
        )}
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '91%',
    flex: 1,
    justifyContent: 'center',
  },
  infos: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
  photoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  capturedImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  retakeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  retakeButtonText: { color: '#000' },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  closeButtonText: { color: '#fff' },
});

export default Camera;
