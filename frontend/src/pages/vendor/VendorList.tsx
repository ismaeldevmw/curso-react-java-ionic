import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add, pencil, close } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Vendor from './Vendor';
import { removeVendor, searchVendors } from './VendorApi';

const VendorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clients, setClients] = useState<Array<Vendor>>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    const result = searchVendors();
    setClients(result);
  };

  const remove = (id: string) => {
    removeVendor(id);
    search();
  };

  const addVendor = () => {
    history.push('/page/vendor/new');
  };
  const editVendor = (id: string) => {
    history.push('/page/vendor/' + id);
  };

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

        <IonCard>
          <IonTitle size="large">Vendors list</IonTitle>
          <IonItem>
            <IonButton
              onClick={addVendor}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} /> Add vendor
            </IonButton>
          </IonItem>
          <IonGrid className="table">
            <IonRow></IonRow>
            <IonRow>
              <IonCol>Name</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Phone</IonCol>
              <IonCol>Address</IonCol>
              <IonCol>Actions</IonCol>
            </IonRow>

            {clients.map((client: Vendor) => (
              <IonRow key={client.id}>
                <IonCol>
                  {client.firstName} {client.lastName}
                </IonCol>
                <IonCol>{client.email}</IonCol>
                <IonCol>{client.phone}</IonCol>
                <IonCol>{client.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editVendor(String(client.id))}
                    color="primary"
                    fill="clear"
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton
                    onClick={() => remove(String(client.id))}
                    color="danger"
                    fill="clear"
                  >
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VendorList;
