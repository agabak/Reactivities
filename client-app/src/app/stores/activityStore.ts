import {observable, action, computed, configure, runInAction} from 'mobx'
import {createContext, SyntheticEvent } from 'react';
import { IActivity } from '../Models/activity.model';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegister = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
     return Array.from(this.activityRegister.values())
                 .sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
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
        this.editMode = false;
    } 

    @action createActivity = async (activity: IActivity) =>  {
      this.submitting  = true;

      try {
       await  agent.Activities.create(activity);
       runInAction('create activity',() => {
        this.activityRegister.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
       })
      } catch (error) {
        runInAction('creating activity error',() => {
          this.submitting = false;
        })
         console.log(error);
      }
     
    }

    @action  openCreateForm = () => {
      this.editMode = true;
      this.activity = null;
    }

    @action  editActivity = async (activity:IActivity) => {
       this.submitting = true;
       try {
           await agent.Activities.update(activity);
           runInAction('editing activity',()=> {
            this.activityRegister.set(activity.id, activity);
            this.activity = activity;
            this.editMode = false;
            this.submitting = false;
           })
       } catch (error) {
         runInAction('edit activity error',() => {
          this.submitting = false;
         })
         console.log(error);
       }
    }

    @action openEditForm = (id: string) => {
      this.activity = this.activityRegister.get(id);
      this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
      this.activity  = null
    }

    @action cancelFormOpen = () => {
      this.editMode = false;
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