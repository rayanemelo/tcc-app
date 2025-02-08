import InfoMessage from "@/components/InfoMessage";
import CloseButton from "@/components/shared/CloseButton";
import { CameraView } from "expo-camera";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  cameraRef: any;
  onClose: () => void;
  takePicture: () => void;
}

const RenderCamera = ({ cameraRef, onClose, takePicture }: Props) => (
  <CameraView style={styles.camera} ref={cameraRef} facing='back'>
    <View style={styles.infos}>
      <CloseButton onClick={onClose} />
      <InfoMessage text="Capture e envie uma imagem do alagamento para ajudar na verificação." />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={takePicture}>
        <MaterialCommunityIcons name="circle-slice-8" size={90} color="white" />
      </TouchableOpacity>
    </View>
  </CameraView>
);


const styles = StyleSheet.create({
  infos: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  camera: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginBottom: 20,
  },
 
});


export default RenderCamera;