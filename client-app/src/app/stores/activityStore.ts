import {observable, action, computed} from 'mobx'
import {createContext, SyntheticEvent } from 'react';
import { IActivity } from '../Models/activity.model';
import agent from '../api/agent';



class ActivityStore {
    @observable activityRegister = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
     // return    this.activities.sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
     return Array.from(this.activityRegister.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        
        try{
         const  activities  = await  agent.Activities.list()  
           activities.forEach((activity) => {
             activity.date = activity.date.split('.')[0]
             ///this.activities.push(activity);
             this.activityRegister.set(activity.id, activity);
           })
        }
        catch(error){
          console.log(error);
          this.loadingInitial = false;
        }
        this.loadingInitial = false;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity =  this.activityRegister.get(id)  // this.activities.find(a => a.id === id);
        this.editMode = false;
    } 

    @action createActivity = async (activity: IActivity) =>  {
      this.submitting  = true;

      try {
        
       await  agent.Activities.create(activity);
       //this.activities.push(activity);
       this.activityRegister.set(activity.id, activity);
       this.editMode = false;
       this.submitting = false;
      } catch (error) {
         console.log(error);
         this.submitting = false;
      }
     
    }

    @action  openCreateForm = () => {
      this.editMode = true;
      this.selectedActivity = undefined;
    }

    @action  editActivity = async (activity:IActivity) => {
       this.submitting = true;
       try {
           await agent.Activities.update(activity);
           this.activityRegister.set(activity.id, activity);
           this.selectedActivity = activity;
           this.editMode = false;
           this.submitting = false;
         
       } catch (error) {
         console.log(error);
         this.submitting = false;
       }

    }

    @action openEditForm = (id: string) => {
      this.selectedActivity = this.activityRegister.get(id);
      this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
      this.selectedActivity  = undefined;
    }

    @action cancelFormOpen = () => {
      this.editMode = false;
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
      this.submitting  = true;
      this.target = event.currentTarget.name;
      try {

        await  agent.Activities.delete(id);
        this.activityRegister.delete(id);
        this.submitting = false;
        this.target = '';

      } catch (error) {
        console.log(error);
        this.submitting = false;
        this.target = ''

      }
     
    }
}

export default createContext(new ActivityStore());