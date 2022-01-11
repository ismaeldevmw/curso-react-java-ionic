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
import Employee from './Employee';
import { saveEmployee, searchEmployeeById } from './EmployeeApi';

const EmployeeEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string, id: string }>();
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== 'new') {
      let result = searchEmployeeById(id);
      setEmployee(result);
    }
    // const result = searchEmployees();
    // setClients(result);
  };

  const save = () => {
    saveEmployee(employee);
    history.push('/page/employees');
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
          <IonTitle size="large">{ id === 'new' ? 'Add employee' : 'Edit employee'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput onIonChange={e => employee.firstName = String(e.detail.value)} value={employee.firstName}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Last name</IonLabel>
                <IonInput onIonChange={e => employee.lastName = String(e.detail.value)} value={employee.lastName}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Phone number</IonLabel>
                <IonInput onIonChange={e => employee.phone = String(e.detail.value)} value={employee.phone}> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput onIonChange={e => employee.email = String(e.detail.value)}value={employee.email}> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput onIonChange={e => employee.address = String(e.detail.value)} value={employee.address}> </IonInput>
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

export default EmployeeEdit;
