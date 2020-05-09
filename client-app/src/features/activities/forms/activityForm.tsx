import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity.model";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import  {Form as FinalForm, Field} from 'react-final-form'
import TextInput from "../../../app/api/common/form/TextInput";
import TextAreaInput from "../../../app/api/common/form/TextAreaInput";
import SelectInput from "../../../app/api/common/form/SelectInput";
import { category } from "../../../app/api/common/options/categoryOptions";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    activity: initialFormState,
    cleanActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      cleanActivity();
    };
  }, [
    loadActivity,
    cleanActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);

  /*
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }; */

  const handleFinalFormSubmit = (value: any) =>{
      console.log(value);
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm  
             onSubmit= {handleFinalFormSubmit}
             render = {({handleSubmit}) =>(
              <Form onSubmit={handleSubmit}>
              <Field
                name="title"
                placeholder="Title"
                value={activity.title}
                component={TextInput}
              />
              <Field
                name="description"
                placeholder="Description"
                rows = '3'
                value={activity.description}
                component={TextAreaInput}
              />
              <Field
                name="category"
                placeholder="Category"
                value={activity.category}
                component={SelectInput}
                options = {category}
              />
              <Field
                name="date"
                placeholder="Date"
                value={activity.date}
                component={TextInput}
              />
              <Field
                name="city"
                placeholder="City"
                value={activity.city}
                component={TextInput}
              />
              <Field
                name="venue"
                placeholder="Venue"
                value={activity.venue}
                component={TextInput}
              />
              <Button
                loading={submitting}
                floated="right"
                positive
                content="submit"
                type="submit"
              />
              <Button
                onClick={() => history.push(`/activities`)}
                floated="right"
                content="cancel"
                type="button"
              />
            </Form>
             )}
            />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
