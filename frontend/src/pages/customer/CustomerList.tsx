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
import Customer from './Customer';
import { removeCustomer, searchCustomers } from './CustomerApi';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clients, setClients] = useState<Array<Customer>>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    const result = await searchCustomers();
    setClients(result);
  };

  const remove = async (id: string) => {
    await removeCustomer(id);
    search();
  };

  const addCustomer = () => {
    history.push('/page/customer/new');
  };
  const editCustomer = (id: string) => {
    history.push('/page/customer/' + id);
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
          <IonTitle size="large">Customers list</IonTitle>
          <IonItem>
            <IonButton
              onClick={addCustomer}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} /> Add customer
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

            {clients.map((client: Customer) => (
              <IonRow key={client.id}>
                <IonCol>
                  {client.firstname} {client.lastname}
                </IonCol>
                <IonCol>{client.email}</IonCol>
                <IonCol>{client.phone}</IonCol>
                <IonCol>{client.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editCustomer(String(client.id))}
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

export default CustomerList;
