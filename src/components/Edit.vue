<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Module</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Module Code</label>
                    <input type="text" class="form-control" v-model="mod.code" required>
                </div>

                <div class="form-group">
                    <label>Module Name</label>
                    <input type="text" class="form-control" v-model="mod.name">
                </div>

                <div class="form-group">
                    <label>Module Grade</label>
                    <input type="text" class="form-control" v-model="mod.grade">
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            mod: { }
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit-mod/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.mod = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update-mod/${this.$route.params.id}`;

            axios.post(apiURL, this.mod).then((res) => {
                console.log(res)
                this.$router.push('/view')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>