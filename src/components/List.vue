<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
            <th>Module Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mod in Modules" :key="mod._id">
            <td>{{ mod.code }}</td>
            <td>{{ mod.name }}</td>
            <td>{{ mod.grade }}</td>
            <td>
              <router-link
                :to="{name: 'edit', params: { id: mod._id }}"
                class="btn btn-success"
              >Edit</router-link>
              <button @click.prevent="deleteModule(mod._id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Modules: [],
    };
  },
  created() {
    let apiURL = "http://localhost:4000/api";
    axios
      .get(apiURL)
      .then((res) => {
        this.Modules = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteModule(id) {
      let apiURL = `http://localhost:4000/api/delete-mod/${id}`;
      let indexOfArrayItem = this.Modules.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Modules.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>