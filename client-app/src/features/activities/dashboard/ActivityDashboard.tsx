import React, {useContext, useEffect} from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from '../../../app/stores/activityStore'
import LoaderComponent from "../../../app/layout/LoaderComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore)

  useEffect(() => {
     activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial)  return <LoaderComponent content='Loading activities...'/>
  return (
    <Grid>
      <Grid.Column width={10}>  
       <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h1>Activity filter</h1>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
