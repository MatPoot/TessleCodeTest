<template>
  <div id="app">
    <Tabs>
      <Tab name="Type" selected="true">
        <form @submit="formSubmit">
          <input type="text" class="form-control" v-model="name" />
          <input type="submit" />
        </form>
        <button type="button" onclick="window.location.reload();">Clear</button>
      </Tab>
      <Tab name="Upload">
        <label>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
        </label>
        <button v-on:click="submitFile()">Submit</button>
        <button type="button" onclick="window.location.reload();">Clear</button>
      </Tab>
      <Tab name="Draw">
        <draw></draw>
        <div></div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";
import draw from "@/components/draw";

export default {
  name: "App",
  components: {
    Tab,
    Tabs,
    draw,
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      this.axios
        .post("http://localhost:8000/yourPostApi", {
          // leaving axios AJAX request like this becuase the backend does not exist
          name: this.name,
        })
        .then(function (response) {
          currentObj.output = response.data;
        })
        .catch(function (error) {
          currentObj.output = error;
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("/single-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap");

body {
  color: black;
}

#app {
  // font-family: "Patrick Hand", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 2rem;
  display: flex;
  justify-content: center;
}
ul,
h2,
h4 {
  display: flex;
  justify-content: center;
  color: black;
}
h4 {
  color: grey;
}
h2 {
  color: #0099dc;
}
hr {
  color: #0099dc;
  background-color: #0099dc;
  height: 3px;
  border: none;
}
#app > article > section > div:nth-child(1) > form > input {
  width: 100%;
  height: 50px;
  font-family: "Patrick Hand", cursive;
  font-size: 100%;
}

#app > article > header > ul,
#app > article > header > ul > li {
  margin: 0 auto;
}
</style>
  