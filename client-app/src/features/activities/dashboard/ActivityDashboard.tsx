import React, { SyntheticEvent,useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity.model";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/actvityDetails";
import ActivityForm from "../forms/activityForm";
import ActivityStore  from '../../../app/stores/activityStore'
import { observer } from "mobx-react-lite";

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (e:SyntheticEvent<HTMLButtonElement> ,id:string) => void;
    submitting: boolean;
    target: string
}

const ActivityDashboard: React.FC<IProps> =
 ({activities, 
   selectActivity, 
   setEditMode, 
   setSelectedActivity,
   createActivity, 
   editActivity, 
   deleteActivity, 
   submitting, 
   target }) => {
                                             
 const activityStore = useContext(ActivityStore);
 const  {editMode, selectedActivity} = activityStore
  return (
    <Grid>
      <Grid.Column width={10}>
       <ActivityList
                     deleteActivity = {deleteActivity}   
                     submitting = {submitting} target={target}/>
      </Grid.Column>
      <Grid.Column width={6}>
       { selectedActivity && !editMode && <ActivityDetails 
         setEditMode = {setEditMode}  
         setSelectedActivity = {setSelectedActivity}
                                                           /> }
       { editMode &&  <ActivityForm  key={selectedActivity?.id || 0}
        setEditMode ={setEditMode} 
        activity = {selectedActivity} 
       createActivity = {createActivity}
       editActivity = {editActivity}
       submitting = {submitting} /> }
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
