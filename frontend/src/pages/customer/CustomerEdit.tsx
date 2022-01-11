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
import Customer from './Customer';
import { saveCustomer, searchCustomerById } from './CustomerApi';

const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string, id: string }>();
  const [customer, setCustomer] = useState<Customer>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== 'new') {
      let result = searchCustomerById(id);
      setCustomer(result);
    }
    // const result = searchCustomers();
    // setClients(result);
  };

  const save = () => {
    saveCustomer(customer);
    history.push('/page/customers');
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
          <IonTitle size="large">{ id === 'new' ? 'Add customer' : 'Edit customer'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput onIonChange={e => customer.firstName = String(e.detail.value)} value={customer.firstName}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Last name</IonLabel>
                <IonInput onIonChange={e => customer.lastName = String(e.detail.value)} value={customer.lastName}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Phone number</IonLabel>
                <IonInput onIonChange={e => customer.phone = String(e.detail.value)} value={customer.phone}> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput onIonChange={e => customer.email = String(e.detail.value)}value={customer.email}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput onIonChange={e => customer.address = String(e.detail.value)} value={customer.address}> </IonInput>
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

export default CustomerEdit;
