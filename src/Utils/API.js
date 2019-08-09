import axios from 'axios';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',

}

//const burl = "http://localhost:8000"
const burl = "https://movies-displayer.herokuapp.com"
//const burl = "http://yolan-pibrac.com"
//const burl = "http://yolan-pibrac.com/movies-displayer"
//const burl = ""

export default {
    login : function(email,password) {
        return axios.post(burl + '/user/login',{
            'email' : email,
            'password' : password,
        },{
            headers: headers
        })
    },
    signup : function(send){
        return axios.post(burl + '/user/signup',send,{headers: headers})
    },

    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    },
    getUserData :function(email){
      return axios.post(burl + '/user/getUserData',{
        'email' : email,
      },{
        headers: headers
      })
    },
    setUserInfo:function(props, email){
      //console.log(email)
      return axios.post(burl + '/user/setUserInfo',{
        'updatedFields' : props,
        'email' : email,
      },{
          headers: headers
      })
    },
    newEmail:function(props, email){
      return axios.post(burl + '/user/newEmail',{
        'updatedFields' : props,
        'email' : email,
      },{
          headers: headers
      })
    },
    setMoovieList:function(props, email){
      return axios.post(burl + '/user/setMoovieList',{
        'updatedFields' : props,
        'email' : email,
      },{
          headers: headers
      })
    }
}
