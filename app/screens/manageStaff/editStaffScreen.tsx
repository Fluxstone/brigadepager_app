import { View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react'
import { Certification, Staff } from '@/scripts/types';
import { getStaffCertifications } from '@/scripts/getRequests/getStaffCertifications';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { saveCertification } from '@/scripts/postRequests/saveCertification';
import { editStaffFirstLastName } from '@/scripts/postRequests/editStaffFirstLastName'
import DefaultButton from '@/components/DefaultButton';
import DefaultTextBox from '@/components/DefaultTextBox';
import { Stack } from "expo-router";

export default function EditStaff() {
  const { staff } = useLocalSearchParams();
  const staffData: Staff = staff ? JSON.parse(staff as string) : null;

  const initStaffFirstName = staffData.firstName;
  const initStaffLastName = staffData.lastName;
  const initStaffId = staffData.id;
  const initStaffCertificationId = staffData.certificationsId;

  const [firstName, setFirstName] = useState(initStaffFirstName);
  const [lastName, setLastName] = useState(initStaffLastName);
  const [certification, setCertification] = useState(initStaffLastName);

  const [atemschutzGeraetetraeger, setAtemschutzGeraetetraeger] = useState(false);
  const [gruppenfuehrer, setGruppenfuehrer] = useState(false);
  const [maschinist, setMaschinist] = useState(false);
  const [sanitaeter, setSanitaeter] = useState(false);
  const [truppfuehrer, setTruppfuehrer] = useState(false);
  const [truppmann, setTruppmann] = useState(false);
  const [zugfuehrer, setZugfuehrer] = useState(false);

  useEffect(() => {
    const getCertification = async () => {
      var cert = await getStaffCertifications(initStaffCertificationId)
      setCertification(cert);

      setAtemschutzGeraetetraeger(cert.atemschutzGeraetetraeger || false);
      setGruppenfuehrer(cert.gruppenfuehrer || false);
      setMaschinist(cert.maschinist || false);
      setSanitaeter(cert.sanitaeter || false);
      setTruppfuehrer(cert.truppfuehrer || false);
      setTruppmann(cert.truppmann || false);
      setZugfuehrer(cert.zugfuehrer || false);
    }

    getCertification();
  }, []);

  //TODO: The calls here are redundant. There should only be one in the backend. I am calling two
  //right now. Also no error handling ect...
  async function saveCerts() {
    const certificationData: Certification = {
      id: initStaffCertificationId,
      atemschutzGeraetetraeger,
      gruppenfuehrer,
      maschinist,
      sanitaeter,
      truppfuehrer,
      truppmann,
      zugfuehrer,
    };

    await saveCertification(certificationData);
    await saveStaff();
  }

  async function saveStaff() {
    await editStaffFirstLastName(initStaffId, firstName, lastName)
  }

  return (
    <View>
      <Stack.Screen options={{ title: "Nutzer bearbeiten" }} />
      <View style={styles.textInputContainer}>
        <DefaultTextBox 
          onChangeText={setFirstName}
          textValue={firstName}
          placeholder={"Vorname"}
          secureTextEntry={false}
          style={{marginBottom: 6}}
        />

        <DefaultTextBox 
          onChangeText={setLastName}
          textValue={lastName}
          placeholder={"Nachname"}
          secureTextEntry={false}
          style={styles.textbox}
        />
      </View>

      <View style={styles.certsContainer}>
        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={atemschutzGeraetetraeger} 
            onPress={(isChecked: boolean) => setAtemschutzGeraetetraeger(isChecked) } 
            fillColor="#007AFF"
          />
          <Text>AtemschutzGeraetetraeger</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={gruppenfuehrer} 
            onPress={(isChecked: boolean) => setGruppenfuehrer(isChecked)} 
            fillColor="#007AFF"
          />
          <Text>Gruppenführer</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={maschinist} 
            onPress={(isChecked: boolean) => setMaschinist(isChecked)} 
            fillColor="#007AFF"
          />
          <Text>Maschinist</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={sanitaeter} 
            onPress={(isChecked: boolean) => setSanitaeter(isChecked)} 
            fillColor="#007AFF"
          />
          <Text>Sanitäter</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={truppfuehrer} 
            onPress={(isChecked: boolean) => setTruppfuehrer(isChecked)} 
            fillColor="#007AFF"
          />
          <Text>Truppführer</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={truppmann} 
            onPress={(isChecked: boolean) => setTruppmann(isChecked)} 
            fillColor="#007AFF"  
          />
          <Text>Truppmann</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox 
            isChecked={zugfuehrer} 
            onPress={(isChecked: boolean) => setZugfuehrer(isChecked)} 
            fillColor="#007AFF"
          />
          <Text>Zugführer</Text>
        </View>
      </View>
      
      <View style={styles.centerContainer}>
        <DefaultButton 
          title='Speichern' 
          onPress={saveCerts}
          style={styles.button} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    margin: 16
  },
  centerContainer: {
    flex: 1,
    alignItems: "center"
  },
  certsContainer: {
    flexDirection: 'column', 
    gap: 8,
    margin: 16
  },
  button: {
    width: "90%"
  },
  textbox: {
    marginBottom: 6
  }
});