import {observable, action, computed, configure, runInAction} from 'mobx'
import {createContext, SyntheticEvent } from 'react';
import { IActivity } from '../Models/activity.model';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegister = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
     return this.groupActivitiesByDate(Array.from(this.activityRegister.values()))
    }

    groupActivitiesByDate(activities: IActivity[]) {
      const  sortedActivities = activities.sort(
        (a,b) => Date.parse(a.date) - Date.parse(b.date)
      )
      return Object.entries(sortedActivities.reduce((activities,activity) => {
          const date = activity.date.split('T')[0];
          activities[date] = activities[date] ? [...activities[date], activity] : [activity];
          return activities;
      },{} as {[Key: string]: IActivity[]}));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        
        try{
         const  activities  = await  agent.Activities.list()  
         runInAction('loading activities', () => {
          activities.forEach((activity) => {
            activity.date = activity.date.split('.')[0];
            this.activityRegister.set(activity.id, activity);
          }) 
          this.loadingInitial = false;  
         })
        }
        catch(error){
          runInAction('loading activities error',() => {
            this.loadingInitial = false;
          })
          console.log(error);
        }
    }

    @action loadActivity = async(id: string) => {
       let activity = this.getActivity(id);
       if(activity) {
         this.activity = activity;
       }else {
         this.loadingInitial = true;
          try {
              activity = await agent.Activities.details(id);
              runInAction('getting activity',() =>{
                this.activity = activity;
                this.loadingInitial = false;
              })
          } catch (error) {
            runInAction('getting activity error', () => {
              this.loadingInitial = false;
            })
            console.log(error);
          }
       }
    }

    @action cleanActivity = () => {
      this.activity = null;
    }

    getActivity = (id: string) => {
      return this.activityRegister.get(id);
    }

    @action selectActivity = (id: string) => {
        this.activity =  this.activityRegister.get(id);
    } 

    @action createActivity = async (activity: IActivity) =>  {
      this.submitting  = true;

      try {
       await  agent.Activities.create(activity);
       runInAction('create activity',() => {
        this.activityRegister.set(activity.id, activity);
        this.submitting = false;
       })
      } catch (error) {
        runInAction('creating activity error',() => {
          this.submitting = false;
        })
         console.log(error);
      }
     
    }

    @action  editActivity = async (activity:IActivity) => {
       this.submitting = true;
       try {
           await agent.Activities.update(activity);
           runInAction('editing activity',()=> {
            this.activityRegister.set(activity.id, activity);
            this.activity = activity;
            this.submitting = false;
           })
       } catch (error) {
         runInAction('edit activity error',() => {
          this.submitting = false;
         })
         console.log(error);
       }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
      this.submitting  = true;
      this.target = event.currentTarget.name;
      try {

        await  agent.Activities.delete(id);
        runInAction('deleting activity',()=> {
        this.activityRegister.delete(id);
        this.submitting = false;
        this.target = '';
        })
      } catch (error) {
        console.log(error);
        runInAction('delete activity error',()=> {
          this.submitting = false;
          this.target = ''
        })
      } 
    }
}

export default createContext(new ActivityStore());