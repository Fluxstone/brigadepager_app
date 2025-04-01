import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react'
import { Certification, Staff } from '@/scripts/types';
import { getStaffCertifications } from '@/scripts/getRequests/getStaffCertifications';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { saveCertification } from '@/scripts/postRequests/saveCertification';
import { editStaffFirstLastName } from '@/scripts/postRequests/editStaffFirstLastName'

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
      <TextInput
        style={styles.textInput}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Vorname"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Nachname"
      />

      <View style={{ flexDirection: 'column', gap: 8 }}>
        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={atemschutzGeraetetraeger} onPress={(isChecked: boolean) => setAtemschutzGeraetetraeger(isChecked)} />
          <Text>AtemschutzGeraetetraeger</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={gruppenfuehrer} onPress={(isChecked: boolean) => setGruppenfuehrer(isChecked)} />
          <Text>Gruppenführer</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={maschinist} onPress={(isChecked: boolean) => setMaschinist(isChecked)} />
          <Text>Maschinist</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={sanitaeter} onPress={(isChecked: boolean) => setSanitaeter(isChecked)} />
          <Text>Sanitäter</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={truppfuehrer} onPress={(isChecked: boolean) => setTruppfuehrer(isChecked)} />
          <Text>Truppführer</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={truppmann} onPress={(isChecked: boolean) => setTruppmann(isChecked)} />
          <Text>Truppmann</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <BouncyCheckbox isChecked={zugfuehrer} onPress={(isChecked: boolean) => setZugfuehrer(isChecked)} />
          <Text>Zugführer</Text>
        </View>
      </View>


      <Pressable onPress={saveCerts} style={styles.loginButton} android_ripple={{ color: "#ffffff50" }}>
        <Text style={styles.loginButtonText}>Speichern</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  loginButtonText: {
    color: "white",
  },
  textInput: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
});