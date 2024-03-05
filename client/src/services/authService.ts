import axios from 'axios';
import { useAuthStore } from '@/stores/authStore.js';

const HTTP = axios.create({
	baseURL: 'https://blog-marganets.vercel.app/',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export default {

	async register(user: object) {
		try {

			const authStore = useAuthStore();
			const response = await HTTP.post("/api/v2/register", user);

			localStorage.setItem('role', response.data.user.role);
			localStorage.setItem('auth', true.toString());

			authStore.register(response.data.user.role, response.data.user.avatar, response.data.user.name);
			return response.data;

		} catch (err) {
			throw err;
		};
	},

	async login(user: object) {
		try {

			const authStore = useAuthStore();
			const response = await HTTP.post("/api/v2/login", user);

			const avatarUrl = response.data.user.avatar ? response.data.user.avatar.url : null;

			localStorage.setItem('auth', true.toString());
			authStore.login(response.data.user.role, avatarUrl, response.data.user.name);
			
			return response.data;

		} catch (err) {
			throw err;
		};
	},

	async googleSignUp(user: object) {
		try {

			const response = await HTTP.post("/api/v2/google", user);
			const result = response.data;

			localStorage.setItem("name", result.user.name);
			localStorage.setItem("role", result.user.role);
			localStorage.setItem("auth", true.toString());

			return result;
			
		} catch (error) {
			console.error("Error during Google login:", error);
		};
	},

	async signOut() {
		try {

			const response = HTTP.get("/api/v2/logout");
			localStorage.clear();

			return (await response).data

		} catch (err) {
			throw err;
		};
	},
};