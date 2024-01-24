import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function AudioScreen() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


  const { audios, saveAudio, deleteAudio, deleteAllAudios } = useAudioService();
  const recordingTextRef = useRef(null);






  async function stopRecording() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        await saveAudio({ uri });
        setRecording(undefined);
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error al parar audio:', error);
    }
  }


  async function playSound(uri) {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);


      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }


      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error al reproducir audio:', error);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota de Voz</Text>


      <TouchableOpacity
        style={styles.actionButton}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <AntDesign name={isRecording ? 'pausecircle' : 'play'} size={24} color="black" />
        <Text style={styles.buttonText}>
          {isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
        </Text>
      </TouchableOpacity>


      {recording && (
        <Animatable.Text
          ref={recordingTextRef}
          style={styles.recordingText}
          animation={isRecording ? 'swing' : undefined}
        >
          Grabando...
        </Animatable.Text>
      )}


      {audios.map((audio, index) => (
        <View key={index} style={styles.audioItem}>


          <TouchableOpacity style={styles.playButton} onPress={() => playSound(audio.uri)}>
            <AntDesign name={isPlaying ? 'pause' : 'caretright'} size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.audioText}>Audio {index + 1}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAudio(index)}>
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ))}


      <TouchableOpacity style={styles.deleteAllButton} onPress={() => deleteAllAudios()}>
        <MaterialCommunityIcons name="delete-sweep" size={24} color="black" />
        <Text style={styles.buttonText}> Eliminar Audios</Text>
      </TouchableOpacity>
    </View>
  );
}









export default AudioScreen;

