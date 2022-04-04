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
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Supplier from './Supplier';
import { saveSupplier, searchSupplierById } from './SupplierApi';

const SupplierEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [supplier, setSupplier] = useState<Supplier>({});
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/supplier/:id");
  let id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if(id === 'new') {
      setSupplier({});
    } else {
      let result = await searchSupplierById(id);
      setSupplier(result);
    }
  };

  const save = async() => {
    await saveSupplier(supplier);
    history.push('/page/suppliers');
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
          <IonTitle size="large">{ id === 'new' ? 'Add supplier' : 'Edit supplier'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput onIonChange={e => supplier.name = String(e.detail.value)} value={supplier.name}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput onIonChange={e => supplier.email = String(e.detail.value)} value={supplier.email}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Phone number</IonLabel>
                <IonInput onIonChange={e => supplier.phone = String(e.detail.value)} value={supplier.phone}> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        
          <IonRow>
          <IonCol>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput onIonChange={e => supplier.address = String(e.detail.value)} value={supplier.address}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Web</IonLabel>
                <IonInput onIonChange={e => supplier.web = String(e.detail.value)}value={supplier.web}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Contact</IonLabel>
                <IonInput onIonChange={e => supplier.contact = String(e.detail.value)}value={supplier.contact}> </IonInput>
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

export default SupplierEdit;
