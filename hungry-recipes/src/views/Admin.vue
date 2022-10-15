<template>

    <div class="admin">
        <h1>This is the admin page</h1>

        <div>
            <h1>CRUD user for admin</h1>
            <div>
                <h2>Get all users</h2>
                <button v-on:click="getAllUsers()">Get all users</button>
                <div v-for="user in users" :key="user._id">
                    <p> Username : {{user.username}}</p>
                    <p>email : {{user.email}}</p>
                    <p>id : {{user._id}}</p>
                </div>
            </div>
            <div>
                <h2>Update user</h2>
                <input type="text" v-model="id" placeholder="id">
                <input type="text" v-model="username" placeholder="username">
                <input type="text" v-model="email" placeholder="email">
                <input type="text" v-model="password" placeholder="password">
                <button v-on:click="updateUser()">Update user</button>
            </div>
            <div>
                <h2>Delete user</h2>
                <input type="text" v-model="id" placeholder="id">
                <button v-on:click="deleteUser()">Delete user</button>
            </div>
            <div>
                <h2>Create user</h2>
                <input type="text" v-model="username" placeholder="username">
                <input type="text" v-model="email" placeholder="email">
                <input type="text" v-model="password" placeholder="password">
                <button v-on:click="createUser()">Create user</button>
            </div>
        </div>
        <div>
            <h1>recipe crud</h1>
            <div>
                <h2>Get all recipes</h2>
                <button v-on:click="getAllRecipes()">Get all recipes</button>
                <div v-for="recipe in recipes" :key="recipe._id">
                    <p>title : {{recipe.title}}</p>
                    <p>id : {{recipe._id}}</p>
                </div>
            </div>
            <div>
                <h2>Delete recipe</h2>
                <input type="text" v-model="id" placeholder="id">
                <button v-on:click="deleteRecipe()">Delete recipe</button>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: "Admin",
    data() {
        return {
            users: [],
            user: {},
            id: "",
            username: "",
            email: "",
            password: "",
            recipes: [],
            _id: "",

        };
    },
    methods: {

        async getAllUsers() {
            let result = await axios.get("http://localhost:3000/api/users", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            this.users = result.data
        },
        async updateUser() {
            let result = await axios.put("http://localhost:3000/api/user/" + this.id, {
                username: this.username,
                email: this.email,
                password: this.password
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (result.status == 200) {
                alert("user updated");
            }
            this.user = result.data
        },
        async deleteUser() {
            let result = await axios.delete("http://localhost:3000/api/user/" + this.id, {

                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (result.status == 200) {
                alert("user deleted")
            }
            this.user = result.data
        },
        async createUser() {
            let result = await axios.post("http://localhost:3000/api/user/signup", {
                username: this.username,
                email: this.email,
                password: this.password
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            this.user = result.data
        },
        async getAllRecipes() {
            let result = await axios.get("http://localhost:3000/api/recipes", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            this.recipes = result.data
        },
        async deleteRecipe() {
            let result = await axios.delete("http://localhost:3000/api/recipe/" + this.id, {

                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (result.status == 200) {
                alert("recipe deleted")
            }
            this.recipe = result.data
        }
    }

}

</script>

<style>

</style>