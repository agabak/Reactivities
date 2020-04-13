import React, { useState, useEffect, Fragment, SyntheticEvent,useContext } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../Models/activity.model";
import NavBar from "../../features/nav/navBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoaderComponent from "./LoaderComponent";
import ActivityStore from '../stores/activityStore'
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore)
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null >(null);

  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');



  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false)
    }).then(() => setSubmitting(false))
   
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))
  }
 
  useEffect(() => {
     activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial)  return <LoaderComponent content = {'Loading activities...'} />
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard  
                            
                            setEditMode = {setEditMode}  
                            setSelectedActivity = {setSelectedActivity}
                            editActivity = {handleEditActivity} 
                            deleteActivity = {handleDeleteActivity} 
                            submitting ={submitting}
                            target ={target}/>
      </Container>
    </Fragment>
  );
};
export default  observer(App);
