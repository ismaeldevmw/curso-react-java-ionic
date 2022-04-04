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
import Supplier from './Supplier';
import { removeSupplier, searchSuppliers } from './SupplierApi';

const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clients, setClients] = useState<Array<Supplier>>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    const result = await searchSuppliers();
    setClients(result);
  };

  const remove = async (id: string) => {
    await removeSupplier(id);
    search();
  };

  const addSupplier = () => {
    history.push('/page/supplier/new');
  };
  const editSupplier = (id: string) => {
    history.push('/page/supplier/' + id);
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
          <IonTitle size="large">Suppliers list</IonTitle>
          <IonItem>
            <IonButton
              onClick={addSupplier}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} /> Add supplier
            </IonButton>
          </IonItem>
          <IonGrid className="table">
            <IonRow></IonRow>
            <IonRow>
              <IonCol>Name</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Phone</IonCol>
              <IonCol>Address</IonCol>
              <IonCol>Web</IonCol>
              <IonCol>Contact</IonCol>
              <IonCol>Actions</IonCol>
            </IonRow>

            {clients.map((client: Supplier) => (
              <IonRow key={client.id}>
                <IonCol>
                  {client.name}
                </IonCol>
                <IonCol>{client.email}</IonCol>
                <IonCol>{client.phone}</IonCol>
                <IonCol>{client.address}</IonCol>
                <IonCol>{client.web}</IonCol>
                <IonCol>{client.contact}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editSupplier(String(client.id))}
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

export default SupplierList;
