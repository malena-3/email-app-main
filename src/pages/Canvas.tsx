
import React, { useState, useRef } from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    IonItem,
    IonSelect,
    IonSelectOption,
    useIonViewWillEnter,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import { Canvas, getAssigments } from "../data/canvas";
import AssignmentList from "../components/AssignmentList";
import './Canvas.css';

import ToolBar_Footer from "../components/ToolBar_Footer";
import { useHistory } from "react-router-dom";
import customIcon from "./daveSelfie.jpeg";

// Define types
type CourseKey = 'MATH' | 'CS' | 'ARCH';
type CourseColor = 'blue' | 'green' | 'purple' | 'black';

const CanvasPage: React.FC = () => {
    const [assignments, setAssignments] = useState<Canvas[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('All Courses');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | string[]>([]);
    const datetime = useRef<null | HTMLIonDatetimeElement>(null);
    const history = useHistory();

    useIonViewWillEnter(() => {
        const assignments_fetch = getAssigments();
        setAssignments(assignments_fetch);
    });

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    const handleDateChange = (value: string | string[]) => {
        setSelectedDate(value);
    };

    const handleCalenderClick = () => {
        history.push('/CanvasCalendar');
    }

    const handleIconClick = () => {
        history.push('/UserAccount');
    }

    function getColorForCourse(courseName: string): CourseColor {
        const courseColors: Record<CourseKey, CourseColor> = {
            MATH: 'blue',
            CS: 'green',
            ARCH: 'purple'
        };

        const keys = Object.keys(courseColors) as CourseKey[];
        for (const key of keys) {
            if (courseName.includes(key)) {
                return courseColors[key];
            }
        }
        return 'black';
    }

    const filteredAssignments = selectedCourse === 'All Courses' ? assignments : assignments.filter(a => a.course.includes(selectedCourse));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='danger'>
                    <IonTitle slot="start">Canvas</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleCalenderClick} fill="clear" color="light">
                            <IonIcon icon={calendarOutline} style={{ marginLeft: '100px', fontSize: '25px' }} />
                        </IonButton>
                        <IonButton onClick={handleIconClick} fill='clear'>
                            <img src={customIcon} alt="Custom Icon" style={{ marginLeft: '10px', width: '45px', height: '45px', borderRadius: '50%' }} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonHeader>
                <IonToolbar>
                    <IonSelect
                        value={selectedCourse}
                        placeholder="All Courses"
                        interface="popover"
                        style={{ width: '100%', textAlign: 'left' }}
                        onIonChange={e => setSelectedCourse(e.detail.value)}
                    >
                        <IonSelectOption value="All Courses">All Courses</IonSelectOption>
                        <IonSelectOption value="ARCH 024B">ARCH 024B</IonSelectOption>
                        <IonSelectOption value="CS 008">CS 008</IonSelectOption>
                        <IonSelectOption value="MATH 05C">MATH 05C</IonSelectOption>
                    </IonSelect>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {showCalendar ? (
                    <div className="center-calendar">
                        <IonDatetime
                            presentation="date"
                            value={selectedDate}
                            onIonChange={e => handleDateChange(e.detail.value!)}
                        />
                    </div>
                ) : (
                    <IonList lines='full' className='ion-no-padding'>
                        {filteredAssignments.map(assignment => (
                            <AssignmentList
                                key={assignment.id}
                                assignment={assignment}
                                getColorForCourse={getColorForCourse} // Pass getColorForCourse as a prop
                            />
                        ))}
                    </IonList>
                )}
            </IonContent>
            <ToolBar_Footer />
        </IonPage>
    );
};

export default CanvasPage;
