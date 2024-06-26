import React from 'react';
import {useHistory} from "react-router-dom";

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFabButton,
    IonIcon,
    IonFab,
    IonButton
} from '@ionic/react';
import {logOut, arrowBackCircleOutline, person} from "ionicons/icons";
import ToolBar_Footer from "../components/ToolBar_Footer";

const UserAccount: React.FC = () => {

const history = useHistory();

    const handleReturnButtonClick = () =>
    {
        history.push('/HomePage');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle color="danger">
                        My Account
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <h2>Welcome to the User Account page!</h2>
                {/* Add more content here */}
            </IonContent>
            <ToolBar_Footer/>
        </IonPage>
    );
};

export default UserAccount;
