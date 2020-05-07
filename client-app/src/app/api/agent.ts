import  axios, { AxiosResponse } from 'axios';
import { IActivity } from '../Models/activity.model';
import { history } from '../../index'
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://localhost:44316/api';

axios.interceptors.response.use(undefined, error=> {
    if(error.message ==='Network Error' && !error.response){
       toast.error('Network Error');
    }
    const {status, data, config} = error.response;
    if(status === 404) {
        history.push('/notfound');
    }
    if(status === 400 && config.method ==='get' 
                      && data.errors.hasOwnProperty('id')){
        history.push('/notfound');
    }
    if(status === 500){
        toast.error('server error-check with your admin');
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const  requests = {
    get:(url: string) => axios.get(url).then(responseBody),
    post:(url:string, body:{}) =>  axios.post(url,body).then(responseBody),
    put:(url:string, body:{}) => axios.put(url, body).then(responseBody),
    dele:(url:string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string): Promise<IActivity> => requests.get(`/activities/${id}`),
    create:(activity: IActivity) => requests.post('/activities', activity),
    update:(activity: IActivity) => requests.put(`/activities/${activity.id}`,activity),
    delete:(id:string) => requests.dele(`/activities/${id}`)
}

export default {
    Activities
}