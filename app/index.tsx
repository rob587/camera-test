import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  // hook della camera
  const [permesso, richiestaPermesso] = useCameraPermissions();

  //stati generali
  const [foto, setFoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  //nuovo stato per girare la fotocamera
  const [facing, setFacing] = useState<"front" | "back">("back");

  if (!permesso) return <View />;

  // se il permesso non è stato dato mostra messaggio

  if (!permesso.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.testo}>Serve il permesso della camera</Text>
        <Pressable style={styles.btn} onPress={richiestaPermesso}>
          <Text style={styles.btnTesto}>Dai il permesso</Text>
        </Pressable>
      </View>
    );
  }

  // funzione per scattare foto

  const scattaFoto = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync();
    if (result) setFoto(result.uri);
  };

  if (foto) {
    return (
      <View style={styles.contenitore}>
        <Image source={{ uri: foto }} style={styles.foto} />
        <Pressable style={styles.btn} onPress={() => setFoto(null)}>
          <Text style={styles.btnTesto}>Scatta un'altra</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.contenitore}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

      {/* bottoni in basso */}
      <View style={styles.controls}>
        {/* gira camera */}
        <Pressable
          style={styles.btnGira}
          onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
        >
          <Text style={styles.btnGiraTesto}>🔄</Text>
        </Pressable>

        {/* scatta */}
        <Pressable style={styles.btnScatta} onPress={scattaFoto}>
          <View style={styles.cerchio} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenitore: { flex: 1 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", gap: 16 },
  camera: { flex: 1 },
  foto: { flex: 1 },
  testo: { fontSize: 16, textAlign: "center", paddingHorizontal: 24 },
  btn: { backgroundColor: "#4f46e5", padding: 16, borderRadius: 12 },
  btnTesto: { color: "#fff", fontWeight: "600" },
  btnScatta: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  cerchio: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  btnGira: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  btnGiraTesto: {
    fontSize: 22,
  },
});
