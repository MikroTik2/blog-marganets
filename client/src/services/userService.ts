import axios from 'axios';

const HTTP = axios.create({
	baseURL: 'https://blog-marganets.vercel.app/api/v2',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {
     async getDetailUser(userId: string) {
          try {

                const response = await HTTP.get(`/admin/single/${userId}`);
                return response.data;
                 
          } catch (err) {
               throw err;
          };
     }, 

     async getAllUser() {
          try {

               const response = await HTTP.get("/users");
               return response.data;

          } catch (err) {
               throw err;
          };
     },

     async updateUser(name: string, avatar: string) {
          try {

               const token = document.cookie;

               const response = await HTTP.put("/me/update", { name, avatar }, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               localStorage.setItem("name", name);
               
               return response.data;

          } catch (err) {
               throw err;
          };
     },

     async updatePassword(user: object) {
          try {

               const token = document.cookie;
               const response = await HTTP.put("/password/update", user, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               return response.data;

          } catch (err) {
               throw err;
          };
     },

     async getMeAccount() {
          const token = document.cookie;
          console.log(token);

          const response = await HTTP.get("/me", {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });

          return response.data;
     },
};