import React, { useContext, Fragment } from "react";
import { Item,Label } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import ActivitiesListItem from "./ActivitiesListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;

  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivitiesListItem activity={activity} key={activity.id} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
