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
import Employee from './Employee';
import { removeEmployee, searchEmployees } from './EmployeeApi';

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clients, setClients] = useState<Array<Employee>>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    const result = await searchEmployees();
    setClients(result);
  };

  const remove = async (id: string) => {
    await removeEmployee(id);
    search();
  };

  const addEmployee = () => {
    history.push('/page/employee/new');
  };
  const editEmployee = (id: string) => {
    history.push('/page/employee/' + id);
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
          <IonTitle size="large">Employees list</IonTitle>
          <IonItem>
            <IonButton
              onClick={addEmployee}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} /> Add employee
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

            {clients.map((client: Employee) => (
              <IonRow key={client.id}>
                <IonCol>
                  {client.firstname} {client.lastname}
                </IonCol>
                <IonCol>{client.email}</IonCol>
                <IonCol>{client.phone}</IonCol>
                <IonCol>{client.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editEmployee(String(client.id))}
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

export default EmployeeList;
