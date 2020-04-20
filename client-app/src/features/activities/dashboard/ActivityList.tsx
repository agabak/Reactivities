import React, { useContext } from "react";
import {Item, Segment } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from "mobx-react-lite";
import ActivitiesListItem from "./ActivitiesListItem";

const ActivityList: React.FC = () => {
const activityStore = useContext(ActivityStore)
const {activitiesByDate } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
         <ActivitiesListItem activity={activity}  key={activity.id} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
