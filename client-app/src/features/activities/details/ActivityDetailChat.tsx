import React, { Fragment } from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const ActivityDetailChat: React.FC = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Metadata>
            </Comment.Content>
          </Comment>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Metadata>
                <Comment.Text>Dude, this is awesome, Thanks so much</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Metadata>
            </Comment.Content>
          </Comment>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Mike Hilty</Comment.Author>
              <Comment.Metadata>
                <div>8 days ago</div>
              </Comment.Metadata>
              <Comment.Metadata>
                <Comment.Text>Dude, this is awesome, Thanks so much</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Metadata>
            </Comment.Content>
          </Comment>
          <Form reply>
           <Form.TextArea/>
           <Button   content ='Add Reply'
                      labelPosition='left'
                      icon='edit' primary>
           </Button>
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailChat);
