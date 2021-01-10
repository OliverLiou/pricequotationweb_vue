
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <b-container>
        <b-form-group label="Bom表(Excel):" label-cols-sm="2" label-size="sm">
          <b-form-file
            accept=".xslx"
            v-model="file"
            ref="file-input"
            class="mb-2"
          ></b-form-file>
          <b-button class="mr-2" @click="UploadBom">上傳</b-button>
        </b-form-group>
      </b-container>
    </div>

    <div>
      <b-table :items="Boms" :fields="Column" striped hover></b-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import HelloWorld from './components/HelloWorld.vue'
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      file: null,
      Boms: [],
      Column: [
        {
          key: "assemblyPartNumber",
          sortable: true,
          label: "總成件號",
        },
        {
          key: "assemblyName",
          sortable: true,
          label: "總成件名",
        },
        {
          key: "assemblyNameEng",
          sortable: true,
          label: "總成件名(英)",
        },
        {
          key: "customer",
          sortable: true,
          label: "顧客",
        },
        {
          key: "model",
          sortable: true,
          label: "車型",
        },
        {
          key: "allFinishTime",
          sortable: true,
          label: "報價完成時間(預計)",
          formatter: "yyyy/MM/dd"
        },
        {
          key: "assemblyRemark",
          sortable: true,
          label: "總成備註",
        },
        {
          key: "createDate",
          sortable: true,
          label: "創立時間",
        },
        {
          key: "modifyDate",
          sortable: true,
          label: "最後編輯時間",
        },
        {
          key: "status",
          sortable: true,
          label: "狀態",
        },
      ],
    };
  },
  async mounted() {
    const self = this;
    await axios
      .get("http://localhost:5001/api/Bom/GetBoms")
      .then(function (params) {
        // console.log(params.data[0]);
        self.Boms = params.data;
      })
      .catch(function (error) {
        alert(error.response.data.Error.join("\n"));
      });
  },
  components: {
    // HelloWorld
  },
  methods: {
    UploadBom() {
      if (this.file == null) {
        alert("請選擇檔案後再上傳！");
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("http://localhost:5001/api/Bom/CreateBom", formData, {
          Headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function () {
          this.file = this.$refs.file.files[0];
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
