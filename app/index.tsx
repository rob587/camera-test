import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  // hook della camera
  const [permesso, richiestaPermesso] = useCameraPermissions();

  //stati generali
  const [foto, setFoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
