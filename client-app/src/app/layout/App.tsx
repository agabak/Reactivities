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
  
  useEffect(() => {
     activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial)  return <LoaderComponent content = {'Loading activities...'} />
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};
export default  observer(App);
