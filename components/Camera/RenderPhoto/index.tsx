import Button from "@/components/shared/Button";
import CloseButton from "@/components/shared/CloseButton";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
  onClose: () => void;
}

const RenderPhoto = ({ photoUri, setPhotoUri, onClose }: Props) => (
  <View style={styles.photoContainer}>
    <View style={styles.closeButton}>
      <CloseButton onClick={onClose} />
    </View>
    {photoUri ? (
      <Image source={{ uri: photoUri }} style={styles.capturedImage} />
    ) : null}

    <View style={styles.modal}>
      <Text style={styles.text}>
        Enviar foto para comprovar o alagamento neste local
      </Text>
      <View style={styles.buttons}>
        <Button type="outline" text="Tirar outra foto" onPress={() => setPhotoUri(null)} />
        <Button type="filled" text="Enviar Foto" onPress={() => console.log('Enviar')} />
      </View>

    </View>
  </View>
);


const styles = StyleSheet.create({
  closeButton: { 
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modal: {
    position: 'absolute',
    display: 'flex',
    bottom: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Elevação para Android
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },

});


export default RenderPhoto;