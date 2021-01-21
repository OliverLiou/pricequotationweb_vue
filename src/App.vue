<!-- eslint-disable vue/no-unused-vars -->

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
      <b-table :items="Boms" :fields="Column" >
        <template #cell(index)="data">
        {{ data.index + 1 }}
        </template>

        <template #cell(action)="row">
            <b-button variant="outline-primary" size="sm" class="mr-1">詳細資料</b-button>
        </template>

      </b-table>
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
import moment from "moment";

export default {
  name: "App",
  data() {
    return {
      file: null,
      Boms: [],
      Column: [
        'index',
        {
          key: "assemblyPartNumber",
          sortable: true,
          label: "總成件號"
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
          formatter: 'DateTimeFormat'
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
          formatter: 'DateTimeFormat'
        },
        {
          key: "modifyDate",
          sortable: true,
          label: "最後編輯時間",
          formatter: 'DateTimeFormat'
        },
        {
          key: "status",
          sortable: true,
          label: "狀態",
        },
        // {
        //   label: "操作",
        //   // value: <b-button>測試</b-button>
        // }
        'action'
      ],
    };
  },
  async mounted() {
    this.GetBoms();
  },
  components: {
    // HelloWorld
  },
  methods: {
    async GetBoms() {
      const self = this;
    await axios
      .get("http://localhost:5001/api/Bom/GetBoms")
      .then(function (params) {
        // console.log(params.data);
        self.Boms = params.data;
      })
      .catch(function (error) {
        alert(error.response.data.Error.join("\n"));
      });
    },
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
          alert('上傳成功！')
          
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
        });
    },
    DateTimeFormat(date) {
      if(date !=null)
        return moment(date).format('YYYY-MM-DD')
    }
  }
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
