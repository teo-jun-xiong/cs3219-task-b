<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Create Module</h3>
      <br/>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>Module Code (required)</label>
          <input type="text" class="form-control" v-model="mod.code" required />
        </div>

        <div class="form-group">
          <label>Module Name</label>
          <input type="text" class="form-control" v-model="mod.name" />
        </div>

        <div class="form-group">
          <label>Module Grade</label>
          <input type="text" class="form-control" v-model="mod.grade" />
        </div>

        <div class="form-group">
          <button class="btn btn-danger btn-block">Create</button>
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
      mod: {
        code: "",
        name: "",
        grade: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/create-mod";

      axios
        .post(apiURL, this.mod)
        .then(() => {
          this.$router.push("/view");
          this.mod = {
            code: "",
            name: "",
            grade: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>