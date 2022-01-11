import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Vendor from './Vendor';
import { saveVendor, searchVendorById } from './VendorApi';

const VendorEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string, id: string }>();
  const [vendor, setVendor] = useState<Vendor>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== 'new') {
      let result = searchVendorById(id);
      setVendor(result);
    }
    // const result = searchVendors();
    // setClients(result);
  };

  const save = () => {
    saveVendor(vendor);
    history.push('/page/vendors');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>

      <IonContent>
        <IonCard>
          <IonTitle size="large">{ id === 'new' ? 'Add vendor' : 'Edit vendor'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput onIonChange={e => vendor.firstName = String(e.detail.value)} value={vendor.firstName}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Last name</IonLabel>
                <IonInput onIonChange={e => vendor.lastName = String(e.detail.value)} value={vendor.lastName}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Phone number</IonLabel>
                <IonInput onIonChange={e => vendor.phone = String(e.detail.value)} value={vendor.phone}> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput onIonChange={e => vendor.email = String(e.detail.value)}value={vendor.email}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput onIonChange={e => vendor.address = String(e.detail.value)} value={vendor.address}> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
              <IonIcon icon={checkmark} /> Save
            </IonButton>
          </IonItem>
      
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VendorEdit;
